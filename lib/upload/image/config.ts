/** 이미지 단일 파일 최대 크기 (바이트) */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

/** `<input type="file" accept>` 값 */
export const IMAGE_INPUT_ACCEPT = Array.from(ALLOWED_IMAGE_MIME_TYPES).join(",");

/** 선택할 수 있는 원본 최대 크기 (바이트) — 선택 후 브라우저에서 줄여 MAX_IMAGE_BYTES 이하로 만든다 */
export const MAX_ORIGINAL_IMAGE_BYTES = 50 * 1024 * 1024;

/** 이 크기 이하는 줄이지 않고 그대로 올린다 */
export const COMPRESS_THRESHOLD_BYTES = 500 * 1024;

/** 줄일 때 목표값 — 긴 변 1920px, 약 1MB 이하 */
export const COMPRESS_MAX_WIDTH_OR_HEIGHT = 1920;
export const COMPRESS_MAX_SIZE_MB = 1;
export const COMPRESS_INITIAL_QUALITY = 0.8;
