import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { LinkPreviewError } from "./types";

/** 언론사가 느려도 8초면 포기 */
const TIMEOUT_MS = 8000;
/** og 태그는 <head> 에 있으므로 앞부분 2MB 만 읽는다 */
const MAX_BYTES = 2 * 1024 * 1024;
/** 단축 URL·모바일 주소 이동 허용 횟수 */
const MAX_REDIRECTS = 5;

const REQUEST_HEADERS = {
  // Node 기본 요청을 봇으로 보고 403 을 주는 언론사가 있어 일반 브라우저처럼 요청
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "ko-KR,ko;q=0.9",
};

/** 내부망·예약 IPv4 대역인지 */
function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) || // CGNAT
    (a === 169 && b === 254) || // 클라우드 메타데이터 주소
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224 // 멀티캐스트·예약
  );
}

/** 내부망·예약 IPv6 대역인지 */
function isPrivateIPv6(ip: string): boolean {
  const h = ip.toLowerCase();
  if (h === "::" || h === "::1") return true;
  // IPv4-mapped (::ffff:127.0.0.1)
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(h);
  if (mapped) return isPrivateIPv4(mapped[1]);
  // URL 파서는 IPv4-mapped 를 16진수로 바꾼다 (::ffff:127.0.0.1 → ::ffff:7f00:1)
  const mappedHex = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(h);
  if (mappedHex) {
    const high = parseInt(mappedHex[1], 16);
    const low = parseInt(mappedHex[2], 16);
    return isPrivateIPv4(`${high >> 8}.${high & 255}.${low >> 8}.${low & 255}`);
  }
  return (
    /^f[cd]/.test(h) || // fc00::/7 사설
    /^fe[89ab]/.test(h) || // fe80::/10 링크 로컬
    /^ff/.test(h) // 멀티캐스트
  );
}

function isPrivateIp(ip: string): boolean {
  const version = isIP(ip);
  if (version === 4) return isPrivateIPv4(ip);
  if (version === 6) return isPrivateIPv6(ip);
  return true;
}

/**
 * URL 이 외부 공개 주소인지 확인 (SSRF 방지).
 * 도메인은 실제 IP 로 바꿔 보고, 하나라도 내부 주소면 거부한다.
 */
async function assertPublicUrl(url: URL): Promise<void> {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new LinkPreviewError("INVALID_URL");
  }
  if (url.username || url.password) {
    throw new LinkPreviewError("INVALID_URL");
  }

  // URL 의 IPv6 호스트는 [::1] 처럼 대괄호로 감싸져 있다
  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw new LinkPreviewError("BLOCKED_URL");
  }

  if (isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new LinkPreviewError("BLOCKED_URL");
    return;
  }

  let addresses: { address: string }[];
  try {
    addresses = await lookup(hostname, { all: true });
  } catch {
    throw new LinkPreviewError("FETCH_FAILED", "도메인을 찾을 수 없습니다.");
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) {
    throw new LinkPreviewError("BLOCKED_URL");
  }
}

/** 응답 본문을 최대 maxBytes 까지만 읽는다 (거대한 파일 링크 대비) */
async function readLimited(res: Response, maxBytes: number): Promise<Uint8Array> {
  if (!res.body) return new Uint8Array();

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (total < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.byteLength;
  }
  // 남은 본문은 받지 않는다
  await reader.cancel().catch(() => {});

  const bytes = new Uint8Array(Math.min(total, maxBytes));
  let offset = 0;
  for (const chunk of chunks) {
    const part = chunk.subarray(0, bytes.length - offset);
    bytes.set(part, offset);
    offset += part.byteLength;
    if (offset >= bytes.length) break;
  }
  return bytes;
}

/** 일부 국내 언론사의 EUC-KR 페이지 대응: 헤더 → <meta charset> 순으로 인코딩 판단 */
function decodeHtml(bytes: Uint8Array, contentType: string): string {
  let charset = /charset=["']?([\w-]+)/i.exec(contentType)?.[1];

  if (!charset) {
    // 앞부분만 1바이트 인코딩으로 읽어서 <meta charset> / http-equiv 찾기
    const head = new TextDecoder("latin1").decode(bytes.subarray(0, 4096));
    charset = /<meta[^>]+charset=["']?([\w-]+)/i.exec(head)?.[1];
  }

  try {
    return new TextDecoder(charset || "utf-8").decode(bytes);
  } catch {
    // 모르는 인코딩이면 UTF-8 로
    return new TextDecoder("utf-8").decode(bytes);
  }
}

/**
 * 기사 페이지 HTML 을 가져온다.
 * 리다이렉트는 직접 따라가며, 이동할 때마다 주소를 다시 검사한다.
 */
export async function fetchHtml(rawUrl: string): Promise<{ html: string; finalUrl: string }> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new LinkPreviewError("INVALID_URL");
  }

  const signal = AbortSignal.timeout(TIMEOUT_MS);

  try {
    for (let redirects = 0; ; redirects++) {
      await assertPublicUrl(url);

      const res = await fetch(url, {
        redirect: "manual",
        signal,
        headers: REQUEST_HEADERS,
        cache: "no-store",
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        await res.body?.cancel().catch(() => {});
        if (!location) throw new LinkPreviewError("HTTP_ERROR", `HTTP ${res.status}`);
        if (redirects >= MAX_REDIRECTS) throw new LinkPreviewError("TOO_MANY_REDIRECTS");
        url = new URL(location, url);
        continue;
      }

      if (!res.ok) {
        await res.body?.cancel().catch(() => {});
        throw new LinkPreviewError("HTTP_ERROR", `HTTP ${res.status}`);
      }

      const contentType = res.headers.get("content-type") ?? "";
      if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
        await res.body?.cancel().catch(() => {});
        throw new LinkPreviewError("NOT_HTML");
      }

      const bytes = await readLimited(res, MAX_BYTES);
      return { html: decodeHtml(bytes, contentType), finalUrl: url.toString() };
    }
  } catch (e) {
    if (e instanceof LinkPreviewError) throw e;
    if (e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError")) {
      throw new LinkPreviewError("TIMEOUT");
    }
    throw new LinkPreviewError("FETCH_FAILED", e instanceof Error ? e.message : undefined);
  }
}
