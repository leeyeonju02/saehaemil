import { describe, expect, it } from "vitest";
import { parseMetadata } from "@/lib/link-preview/parse-metadata";

const BASE_URL = "https://www.example.co.kr/news/articleView.html?idxno=1";

/** <head> 안에 태그를 넣은 HTML 문서 */
function html(head: string, body = ""): string {
  return `<!doctype html><html><head>${head}</head><body>${body}</body></html>`;
}

describe("parseMetadata", () => {
  it("og 태그에서 모든 값을 꺼낸다", () => {
    const result = parseMetadata(
      html(`
        <meta property="og:title" content="새해밀재단, 나눔 행사 개최" />
        <meta property="og:description" content="사회복지재단 새해밀이 17일..." />
        <meta property="og:image" content="https://img.example.co.kr/a.jpg" />
        <meta property="og:site_name" content="연합뉴스" />
        <meta property="article:published_time" content="2026-10-17T09:00:00+09:00" />
      `),
      BASE_URL
    );

    expect(result).toEqual({
      url: BASE_URL,
      title: "새해밀재단, 나눔 행사 개최",
      description: "사회복지재단 새해밀이 17일...",
      image_url: "https://img.example.co.kr/a.jpg",
      source_name: "연합뉴스",
      published_at: "2026-10-17T00:00:00.000Z",
    });
  });

  it("og 태그가 없으면 twitter 태그 → <title> / description 순으로 대체한다", () => {
    const withTwitter = parseMetadata(
      html(`
        <meta name="twitter:title" content="트위터 제목" />
        <meta name="twitter:description" content="트위터 요약" />
        <meta name="twitter:image" content="https://img.example.co.kr/t.jpg" />
        <title>문서 제목</title>
      `),
      BASE_URL
    );
    expect(withTwitter.title).toBe("트위터 제목");
    expect(withTwitter.description).toBe("트위터 요약");
    expect(withTwitter.image_url).toBe("https://img.example.co.kr/t.jpg");

    const plain = parseMetadata(
      html(`<title>문서 제목</title><meta name="description" content="일반 요약" />`),
      BASE_URL
    );
    expect(plain.title).toBe("문서 제목");
    expect(plain.description).toBe("일반 요약");
  });

  it("og 태그를 name 속성으로 적은 사이트도 읽는다", () => {
    const result = parseMetadata(html(`<meta name="og:title" content="name 으로 적은 제목" />`), BASE_URL);
    expect(result.title).toBe("name 으로 적은 제목");
  });

  it("앞 후보가 빈 값이면 다음 후보를 쓴다", () => {
    const result = parseMetadata(
      html(`<meta property="og:title" content="   " /><title>대체 제목</title>`),
      BASE_URL
    );
    expect(result.title).toBe("대체 제목");
  });

  it("아무 정보가 없으면 null, 언론사명은 www 를 뺀 도메인으로 대체한다", () => {
    const result = parseMetadata(html(""), BASE_URL);
    expect(result).toEqual({
      url: BASE_URL,
      title: null,
      description: null,
      image_url: null,
      source_name: "example.co.kr",
      published_at: null,
    });
  });

  it("상대경로 썸네일을 기사 주소 기준 절대경로로 바꾼다", () => {
    const result = parseMetadata(html(`<meta property="og:image" content="/data/photo.jpg" />`), BASE_URL);
    expect(result.image_url).toBe("https://www.example.co.kr/data/photo.jpg");
  });

  it("http(s) 가 아닌 썸네일 주소는 버린다", () => {
    const result = parseMetadata(
      html(`<meta property="og:image" content="javascript:alert(1)" />`),
      BASE_URL
    );
    expect(result.image_url).toBeNull();
  });

  it("HTML 특수문자를 원래 글자로 되돌리고 공백을 정리한다", () => {
    const result = parseMetadata(
      html(`<meta property="og:title" content="  A &amp; B   &quot;특집&quot;\n 기사 " />`),
      BASE_URL
    );
    expect(result.title).toBe('A & B "특집" 기사');
  });

  it("제목 200자, 요약 300자, 언론사명 50자로 자른다", () => {
    const result = parseMetadata(
      html(`
        <meta property="og:title" content="${"가".repeat(250)}" />
        <meta property="og:description" content="${"나".repeat(400)}" />
        <meta property="og:site_name" content="${"다".repeat(80)}" />
      `),
      BASE_URL
    );
    expect(result.title).toHaveLength(200);
    expect(result.description).toHaveLength(300);
    expect(result.source_name).toHaveLength(50);
  });

  describe("발행일", () => {
    it("시간대 없는 국내식 날짜는 한국 시간으로 본다", () => {
      const result = parseMetadata(
        html(`<meta property="article:published_time" content="2026-10-17 09:00:00" />`),
        BASE_URL
      );
      expect(result.published_at).toBe("2026-10-17T00:00:00.000Z");
    });

    it("JSON-LD 의 datePublished 를 읽는다", () => {
      const result = parseMetadata(
        html(
          `<script type="application/ld+json">${JSON.stringify({
            "@type": "NewsArticle",
            datePublished: "2026-10-01T10:00:00+09:00",
          })}</script>`
        ),
        BASE_URL
      );
      expect(result.published_at).toBe("2026-10-01T01:00:00.000Z");
    });

    it("JSON-LD 의 @graph 안에 있는 datePublished 도 읽는다", () => {
      const result = parseMetadata(
        html(
          `<script type="application/ld+json">${JSON.stringify({
            "@graph": [{ "@type": "WebPage" }, { "@type": "NewsArticle", datePublished: "2026-10-02T00:00:00Z" }],
          })}</script>`
        ),
        BASE_URL
      );
      expect(result.published_at).toBe("2026-10-02T00:00:00.000Z");
    });

    it("잘못된 JSON-LD 는 무시하고 다음 것을 읽는다", () => {
      const result = parseMetadata(
        html(`
          <script type="application/ld+json">{ 잘못된 JSON</script>
          <script type="application/ld+json">{"datePublished":"2026-10-03T00:00:00Z"}</script>
        `),
        BASE_URL
      );
      expect(result.published_at).toBe("2026-10-03T00:00:00.000Z");
    });

    it("네이버 뉴스의 기사입력 시각(data-date-time)을 읽는다", () => {
      const result = parseMetadata(
        html(
          "",
          `<span class="media_end_head_info_datestamp_time _ARTICLE_DATE_TIME" data-date-time="2024-10-22 19:15:02">2024.10.22. 오후 7:15</span>`
        ),
        BASE_URL
      );
      expect(result.published_at).toBe("2024-10-22T10:15:02.000Z");
    });

    it("meta 태그가 JSON-LD 보다 우선한다", () => {
      const result = parseMetadata(
        html(`
          <meta property="article:published_time" content="2026-10-05T00:00:00Z" />
          <script type="application/ld+json">{"datePublished":"2026-01-01T00:00:00Z"}</script>
        `),
        BASE_URL
      );
      expect(result.published_at).toBe("2026-10-05T00:00:00.000Z");
    });

    it("날짜로 읽을 수 없는 값은 null", () => {
      const result = parseMetadata(
        html(`<meta property="article:published_time" content="어제" />`),
        BASE_URL
      );
      expect(result.published_at).toBeNull();
    });
  });
});
