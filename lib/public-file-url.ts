/**
 * `public` 기준 경로(또는 절대 http URL)를 브라우저 링크용으로 변환합니다.
 * 한글·공백이 포함된 파일명은 경로 세그먼트별 `encodeURIComponent` 처리합니다.
 */
export function encodePublicPath(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const trimmed = path.replace(/^\/+/, "");
  if (!trimmed) return "/";
  return "/" + trimmed.split("/").map(encodeURIComponent).join("/");
}
