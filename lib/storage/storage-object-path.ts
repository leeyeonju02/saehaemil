import { randomUUID } from "crypto";
import { sanitizeFolderSegment } from "@/lib/storage/sanitize-upload-path";

/** Storage 객체에 허용하는 이미지 확장자(소문자) */
const ALLOWED_IMAGE_EXT = new Set(["jpg", "jpeg", "png", "gif", "webp"]);

/**
 * 원본 파일명에서 안전한 확장자만 추출합니다.
 * 인식 불가·허용 목록 밖이면 `jpg`로 둡니다. (Supabase 객체 이름에 특수문자·공백 경로 방지)
 */
export function getSafeImageExtensionForStorage(originalFilename: string): string {
  const part = originalFilename.trim().split(".").pop()?.toLowerCase() ?? "";
  if (!part) return "jpg";
  const normalized = part === "jpeg" ? "jpg" : part;
  return ALLOWED_IMAGE_EXT.has(normalized) ? normalized : "jpg";
}

/**
 * MIME 타입으로 확장자를 고를 때 (파일명에 확장자가 없을 때 보조)
 */
export function getSafeImageExtensionFromMime(contentType: string): string {
  const m = contentType.toLowerCase().split(";")[0]?.trim() ?? "";
  switch (m) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

/**
 * Supabase Storage 업로드용 객체 경로를 생성합니다.
 * `{baseSegment}/{uuid}.{ext}` — 원본 파일명은 경로에 넣지 않아 버킷·URL 제약을 피합니다.
 *
 * @param baseSegment 버킷 내 상위 경로 한 단계 (예: `gallery`, `notice`, `board`)
 * @param originalFilename 원본 파일명 — 확장자 추출에만 사용
 * @param options.contentType 확장자가 없을 때 MIME으로 결정
 */
export function buildUuidStorageObjectPath(
  baseSegment: string,
  originalFilename: string,
  options?: { contentType?: string }
): string {
  const folder = sanitizeFolderSegment(baseSegment);
  const name = originalFilename.trim();
  const hasDotExt = /\.[a-zA-Z0-9]{1,8}$/.test(name);
  let ext = getSafeImageExtensionForStorage(name);
  if (!hasDotExt && options?.contentType) {
    ext = getSafeImageExtensionFromMime(options.contentType);
  }
  const id = randomUUID();
  return `${folder}/${id}.${ext}`;
}
