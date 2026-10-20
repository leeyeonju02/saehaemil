import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { lookupMock } = vi.hoisted(() => ({ lookupMock: vi.fn() }));
vi.mock("node:dns/promises", () => ({ lookup: lookupMock }));

import { fetchHtml } from "@/lib/link-preview/fetch-html";
import { getLinkPreview, LinkPreviewError } from "@/lib/link-preview";

const fetchMock = vi.fn<typeof fetch>();

function htmlResponse(body: BodyInit, contentType = "text/html; charset=utf-8", status = 200) {
  return new Response(body, { status, headers: { "content-type": contentType } });
}

function redirectResponse(location: string, status = 301) {
  return new Response(null, { status, headers: { location } });
}

/** 실패 코드 확인용 */
async function errorCodeOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (e) {
    expect(e).toBeInstanceOf(LinkPreviewError);
    return (e as LinkPreviewError).code;
  }
  throw new Error("에러가 나지 않았습니다.");
}

beforeEach(() => {
  lookupMock.mockReset();
  lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchHtml — 주소 검사", () => {
  it.each(["ftp://example.com", "javascript:alert(1)", "기사 주소 아님", "https://user:pw@example.com"])(
    "%s 는 INVALID_URL",
    async (url) => {
      expect(await errorCodeOf(fetchHtml(url))).toBe("INVALID_URL");
      expect(fetchMock).not.toHaveBeenCalled();
    }
  );

  it.each([
    "http://localhost:3000",
    "http://app.localhost",
    "http://printer.local",
    "http://127.0.0.1",
    "http://10.0.0.1",
    "http://172.16.0.1",
    "http://192.168.0.1",
    "http://169.254.169.254/latest/meta-data",
    "http://100.64.0.1",
    "http://0.0.0.0",
    "http://[::1]/",
    "http://[fd00::1]/",
    "http://[fe80::1]/",
    "http://[::ffff:127.0.0.1]/",
    "http://[::ffff:a9fe:a9fe]/",
  ])("내부 주소 %s 는 BLOCKED_URL", async (url) => {
    expect(await errorCodeOf(fetchHtml(url))).toBe("BLOCKED_URL");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("도메인이 내부 IP 를 가리키면 BLOCKED_URL", async () => {
    lookupMock.mockResolvedValue([{ address: "10.1.2.3", family: 4 }]);
    expect(await errorCodeOf(fetchHtml("https://evil.example.com"))).toBe("BLOCKED_URL");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("도메인의 IP 중 하나라도 내부 주소면 BLOCKED_URL", async () => {
    lookupMock.mockResolvedValue([
      { address: "93.184.216.34", family: 4 },
      { address: "::1", family: 6 },
    ]);
    expect(await errorCodeOf(fetchHtml("https://mixed.example.com"))).toBe("BLOCKED_URL");
  });

  it("도메인을 찾을 수 없으면 FETCH_FAILED", async () => {
    lookupMock.mockRejectedValue(new Error("ENOTFOUND"));
    expect(await errorCodeOf(fetchHtml("https://no-such-domain.example"))).toBe("FETCH_FAILED");
  });

  it("공개 IP 를 직접 적은 주소는 DNS 조회 없이 허용", async () => {
    fetchMock.mockResolvedValue(htmlResponse("<html></html>"));
    await fetchHtml("http://93.184.216.34/");
    expect(lookupMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("fetchHtml — 응답 처리", () => {
  it("HTML 과 최종 주소를 돌려주고, 브라우저처럼 요청한다", async () => {
    fetchMock.mockResolvedValue(htmlResponse("<title>기사</title>"));
    const result = await fetchHtml("https://news.example.com/a");

    expect(result).toEqual({ html: "<title>기사</title>", finalUrl: "https://news.example.com/a" });
    const init = fetchMock.mock.calls[0][1]!;
    expect(init.redirect).toBe("manual");
    expect((init.headers as Record<string, string>)["User-Agent"]).toContain("Mozilla/5.0");
  });

  it("리다이렉트를 따라가고 이동할 때마다 주소를 다시 검사한다", async () => {
    fetchMock
      .mockResolvedValueOnce(redirectResponse("https://www.example.com/a"))
      .mockResolvedValueOnce(redirectResponse("/b", 302))
      .mockResolvedValueOnce(htmlResponse("<title>최종</title>"));

    const result = await fetchHtml("http://example.com/start");

    expect(result.finalUrl).toBe("https://www.example.com/b");
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(lookupMock).toHaveBeenCalledTimes(3);
  });

  it("외부 주소에서 내부 주소로 넘기는 리다이렉트는 BLOCKED_URL", async () => {
    fetchMock.mockResolvedValueOnce(redirectResponse("http://169.254.169.254/latest/meta-data"));
    expect(await errorCodeOf(fetchHtml("https://example.com"))).toBe("BLOCKED_URL");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("리다이렉트가 5번을 넘으면 TOO_MANY_REDIRECTS", async () => {
    fetchMock.mockImplementation(async () => redirectResponse("https://example.com/loop"));
    expect(await errorCodeOf(fetchHtml("https://example.com"))).toBe("TOO_MANY_REDIRECTS");
    expect(fetchMock).toHaveBeenCalledTimes(6);
  });

  it("location 없는 리다이렉트는 HTTP_ERROR", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 302 }));
    expect(await errorCodeOf(fetchHtml("https://example.com"))).toBe("HTTP_ERROR");
  });

  it.each([403, 404, 500])("HTTP %i 응답은 HTTP_ERROR", async (status) => {
    fetchMock.mockResolvedValue(htmlResponse("오류", "text/html", status));
    expect(await errorCodeOf(fetchHtml("https://example.com"))).toBe("HTTP_ERROR");
  });

  it.each(["application/pdf", "image/jpeg", "text/plain", ""])("content-type '%s' 는 NOT_HTML", async (type) => {
    fetchMock.mockResolvedValue(new Response("x", { headers: type ? { "content-type": type } : {} }));
    expect(await errorCodeOf(fetchHtml("https://example.com/file"))).toBe("NOT_HTML");
  });

  it("application/xhtml+xml 은 HTML 로 처리한다", async () => {
    fetchMock.mockResolvedValue(htmlResponse("<title>x</title>", "application/xhtml+xml"));
    await expect(fetchHtml("https://example.com")).resolves.toMatchObject({ html: "<title>x</title>" });
  });

  it("시간이 초과되면 TIMEOUT", async () => {
    fetchMock.mockRejectedValue(new DOMException("timed out", "TimeoutError"));
    expect(await errorCodeOf(fetchHtml("https://slow.example.com"))).toBe("TIMEOUT");
  });

  it("그 밖의 네트워크 오류는 FETCH_FAILED", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    expect(await errorCodeOf(fetchHtml("https://example.com"))).toBe("FETCH_FAILED");
  });

  it("본문은 2MB 까지만 읽는다", async () => {
    const MB = 1024 * 1024;
    let pulled = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        // 끝없이 1MB 씩 보내는 응답
        pulled += 1;
        controller.enqueue(new Uint8Array(MB).fill(0x61));
      },
    });
    fetchMock.mockResolvedValue(htmlResponse(stream));

    const { html } = await fetchHtml("https://huge.example.com");
    expect(html.length).toBe(2 * MB);
    expect(pulled).toBeLessThan(5);
  });
});

describe("fetchHtml — 인코딩", () => {
  // "한글" 의 EUC-KR 바이트
  const EUC_KR_HANGUL = [0xc7, 0xd1, 0xb1, 0xdb];

  function eucKrPage(head: string): Uint8Array<ArrayBuffer> {
    const before = new TextEncoder().encode(`<html><head>${head}<title>`);
    const after = new TextEncoder().encode("</title></head></html>");
    return new Uint8Array([...before, ...EUC_KR_HANGUL, ...after]);
  }

  it("응답 헤더의 charset 으로 EUC-KR 을 읽는다", async () => {
    fetchMock.mockResolvedValue(htmlResponse(eucKrPage(""), "text/html; charset=euc-kr"));
    const { html } = await fetchHtml("https://old.example.co.kr");
    expect(html).toContain("<title>한글</title>");
  });

  it("헤더에 charset 이 없으면 <meta charset> 을 본다", async () => {
    fetchMock.mockResolvedValue(htmlResponse(eucKrPage('<meta charset="euc-kr">'), "text/html"));
    const { html } = await fetchHtml("https://old.example.co.kr");
    expect(html).toContain("<title>한글</title>");
  });

  it("http-equiv 방식의 charset 도 읽는다", async () => {
    fetchMock.mockResolvedValue(
      htmlResponse(
        eucKrPage('<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">'),
        "text/html"
      )
    );
    const { html } = await fetchHtml("https://old.example.co.kr");
    expect(html).toContain("<title>한글</title>");
  });

  it("모르는 charset 이면 UTF-8 로 읽는다", async () => {
    fetchMock.mockResolvedValue(htmlResponse("<title>기사</title>", "text/html; charset=no-such-charset"));
    const { html } = await fetchHtml("https://example.com");
    expect(html).toBe("<title>기사</title>");
  });
});

describe("getLinkPreview", () => {
  it("가져오기와 파싱을 이어서 최종 주소 기준 결과를 돌려준다", async () => {
    fetchMock
      .mockResolvedValueOnce(redirectResponse("https://www.news.example.com/article/1"))
      .mockResolvedValueOnce(
        htmlResponse(`
          <meta property="og:title" content="기사 제목" />
          <meta property="og:image" content="/img/1.jpg" />
        `)
      );

    const preview = await getLinkPreview("https://news.example.com/1");

    expect(preview).toMatchObject({
      url: "https://www.news.example.com/article/1",
      title: "기사 제목",
      image_url: "https://www.news.example.com/img/1.jpg",
      source_name: "news.example.com",
    });
  });
});
