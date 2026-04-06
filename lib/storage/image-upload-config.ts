/** Supabase 대시보드 → Storage 에 동일 이름 버킷 생성 후 Public 으로 두면 URL 로 바로 접근 가능 */
export const DEFAULT_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET?.trim() || "uploads";

/** 단일 파일 최대 크기 (바이트) */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);
