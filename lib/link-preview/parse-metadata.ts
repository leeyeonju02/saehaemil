import * as cheerio from "cheerio";
import type { LinkPreview } from "./types";

/** 후보 meta 태그 중 처음으로 값이 있는 content 반환 (순서가 곧 우선순위) */
function firstMeta($: cheerio.CheerioAPI, selectors: string[]): string | null {
  for (const sel of selectors) {
    const value = $(sel).first().attr("content")?.trim();
    if (value) return value;
  }
  return null;
}

/** og 태그를 property 대신 name 으로 적는 사이트도 있어 둘 다 찾는다 */
function metaKey(key: string): string[] {
  return [`meta[property="${key}"]`, `meta[name="${key}"]`];
}

/** 공백 정리 + 길이 제한 */
function clean(value: string | null, max: number): string | null {
  if (!value) return null;
  const text = value.replace(/\s+/g, " ").trim();
  return text ? text.slice(0, max) : null;
}

/** 상대경로 이미지를 절대경로로 */
function toAbsoluteUrl(value: string | null, baseUrl: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value, baseUrl);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** JSON-LD 의 datePublished (og 에 날짜가 없는 언론사 대비) */
function jsonLdDate($: cheerio.CheerioAPI): string | null {
  for (const el of $('script[type="application/ld+json"]').toArray()) {
    try {
      const data: unknown = JSON.parse($(el).text());
      const root = Array.isArray(data) ? data : [data];
      // @graph 안에 기사 정보가 들어 있는 경우도 있다
      const items = root.flatMap((item) =>
        item && typeof item === "object" && Array.isArray((item as { "@graph"?: unknown })["@graph"])
          ? [item, ...((item as { "@graph": unknown[] })["@graph"])]
          : [item]
      );
      for (const item of items) {
        const value = (item as { datePublished?: unknown } | null)?.datePublished;
        if (typeof value === "string" && value.trim()) return value.trim();
      }
    } catch {
      /* 잘못된 JSON 은 무시 */
    }
  }
  return null;
}

function toIso(value: string | null): string | null {
  if (!value) return null;
  // "2026-10-17 09:00:00" 처럼 시간대 없는 국내 표기는 한국 시간으로 본다
  const normalized = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2})?$/.test(value)
    ? `${value.replace(" ", "T")}+09:00`
    : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** HTML 에서 기사 정보를 꺼낸다 */
export function parseMetadata(html: string, finalUrl: string): LinkPreview {
  const $ = cheerio.load(html);
  const hostname = new URL(finalUrl).hostname.replace(/^www\./, "");

  const title =
    firstMeta($, [...metaKey("og:title"), ...metaKey("twitter:title")]) ??
    ($("title").first().text() || null);

  const description = firstMeta($, [
    ...metaKey("og:description"),
    ...metaKey("twitter:description"),
    'meta[name="description"]',
  ]);

  const image = firstMeta($, [
    ...metaKey("og:image"),
    ...metaKey("og:image:url"),
    ...metaKey("twitter:image"),
  ]);

  const siteName = firstMeta($, metaKey("og:site_name"));

  const published =
    firstMeta($, [
      ...metaKey("article:published_time"),
      'meta[itemprop="datePublished"]',
      'meta[name="pubdate"]',
      'meta[property="og:regDate"]',
    ]) ??
    jsonLdDate($) ??
    // 네이버 뉴스: 기사입력 시각 (meta 태그 없음)
    ($("._ARTICLE_DATE_TIME").first().attr("data-date-time")?.trim() || null);

  return {
    url: finalUrl,
    title: clean(title, 200),
    description: clean(description, 300),
    image_url: toAbsoluteUrl(image, finalUrl),
    source_name: clean(siteName, 50) ?? hostname,
    published_at: toIso(published),
  };
}
