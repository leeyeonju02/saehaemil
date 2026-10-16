import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_BYTES,
} from "@/lib/storage/image-upload-config";

export type ValidatedImageBlob =
  | { ok: true; mime: string }
  | { ok: false; error: string };

/** 공통 이미지 업로드 API용 Blob 검증 */
export function validateImageBlob(blob: Blob): ValidatedImageBlob {
  if (blob.size <= 0) {
    return { ok: false, error: "빈 파일입니다." };
  }
  if (blob.size > MAX_IMAGE_BYTES) {
    return {
      ok: false,
      error: `파일 크기는 ${MAX_IMAGE_BYTES / 1024 / 1024}MB 이하여야 합니다.`,
    };
  }
  const mime = blob.type || "application/octet-stream";
  if (!ALLOWED_IMAGE_MIME_TYPES.has(mime)) {
    return {
      ok: false,
      error: "허용되지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WEBP)",
    };
  }
  return { ok: true, mime };
}
