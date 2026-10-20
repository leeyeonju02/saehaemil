import { fetchHtml } from "./fetch-html";
import { parseMetadata } from "./parse-metadata";
import type { LinkPreview } from "./types";

export type { LinkPreview, LinkPreviewErrorCode } from "./types";
export { LinkPreviewError } from "./types";

/** 기사 링크에서 제목·요약·썸네일·언론사·발행일을 수집한다 (서버 전용) */
export async function getLinkPreview(url: string): Promise<LinkPreview> {
  const { html, finalUrl } = await fetchHtml(url);
  return parseMetadata(html, finalUrl);
}
