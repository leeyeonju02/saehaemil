/**
 * 이미지 업로드 공용 모듈 — 화면에서는 용도(purpose)만 지정해 호출한다.
 */

import type { ImageUploadPurpose } from "@/lib/upload/purposes";
import { getImageError } from "@/lib/upload/image/validate";
import { uploadWithSignedUrl, type UploadedFile } from "@/lib/upload/signed-upload";

export const SIGN_IMAGE_UPLOAD_API = "/api/uploads/sign-image";

export async function uploadImages(
  files: File[],
  options: { purpose: ImageUploadPurpose; adminPassword: string }
): Promise<UploadedFile[]> {
  const items: UploadedFile[] = [];
  for (const file of files) {
    const error = getImageError(file);
    if (error) {
      throw new Error(`${error} (${file.name})`);
    }
    items.push(
      await uploadWithSignedUrl({
        signApi: SIGN_IMAGE_UPLOAD_API,
        file,
        contentType: file.type,
        body: { purpose: options.purpose, adminPassword: options.adminPassword },
      })
    );
  }
  return items;
}
