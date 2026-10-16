import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_BYTES,
  MAX_ORIGINAL_IMAGE_BYTES,
} from "@/lib/upload/image/config";

function getImageErrorWithLimit(
  file: { type: string; size: number },
  maxBytes: number
): string | null {
  if (file.size <= 0) {
    return "빈 파일입니다.";
  }
  if (file.size > maxBytes) {
    return `이미지는 파일당 ${maxBytes / 1024 / 1024}MB 이하여야 합니다.`;
  }
  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    return "허용되지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WEBP)";
  }
  return null;
}

/** 업로드할 이미지 검증 (클라이언트·서버 공용). 통과하면 null */
export function getImageError(file: { type: string; size: number }): string | null {
  return getImageErrorWithLimit(file, MAX_IMAGE_BYTES);
}

/** 선택한 원본 이미지 검증 — 줄이기 전이라 더 큰 한도를 쓴다. 통과하면 null */
export function getOriginalImageError(file: { type: string; size: number }): string | null {
  return getImageErrorWithLimit(file, MAX_ORIGINAL_IMAGE_BYTES);
}
