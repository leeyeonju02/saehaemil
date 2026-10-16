/**
 * 첨부 문서 업로드 공용 모듈 — 화면에서는 용도(purpose)만 지정해 호출한다.
 */

import type { FileUploadPurpose } from "@/lib/upload/purposes";
import { getFileError } from "@/lib/upload/file/validate";
import { uploadWithSignedUrl, type UploadedFile } from "@/lib/upload/signed-upload";

export const SIGN_FILE_UPLOAD_API = "/api/uploads/sign-file";

export async function uploadFiles(
  files: File[],
  options: { purpose: FileUploadPurpose; adminPassword: string }
): Promise<UploadedFile[]> {
  const items: UploadedFile[] = [];
  for (const file of files) {
    const error = getFileError(file);
    if (error) {
      throw new Error(`${error} (${file.name})`);
    }
    items.push(
      await uploadWithSignedUrl({
        signApi: SIGN_FILE_UPLOAD_API,
        file,
        contentType: file.type || "application/octet-stream",
        body: { purpose: options.purpose, adminPassword: options.adminPassword },
      })
    );
  }
  return items;
}
