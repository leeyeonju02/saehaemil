/** 기사 링크에서 수집한 정보 — `news` 테이블 컬럼 이름과 동일 */
export interface LinkPreview {
  /** 최종 URL (리다이렉트 반영) */
  url: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  source_name: string | null;
  /** ISO 문자열 */
  published_at: string | null;
}

export type LinkPreviewErrorCode =
  | "INVALID_URL"
  | "BLOCKED_URL"
  | "TOO_MANY_REDIRECTS"
  | "TIMEOUT"
  | "HTTP_ERROR"
  | "NOT_HTML"
  | "FETCH_FAILED";

export class LinkPreviewError extends Error {
  constructor(
    public readonly code: LinkPreviewErrorCode,
    message?: string
  ) {
    super(message ?? code);
    this.name = "LinkPreviewError";
  }
}
