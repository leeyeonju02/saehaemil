import { handleSignUpload } from "@/lib/upload/server/sign-upload";
import { IMAGE_STORAGE_BUCKET } from "@/lib/upload/server/buckets";
import { IMAGE_UPLOAD_FOLDERS } from "@/lib/upload/purposes";
import { getImageError } from "@/lib/upload/image/validate";
import { buildUuidStorageObjectPath } from "@/lib/storage/storage-object-path";

export const runtime = "nodejs";

/** 이미지 업로드용 Signed Upload URL 발급 (`lib/upload/image/upload-images.ts` 에서 호출) */
export async function POST(request: Request) {
  return handleSignUpload(request, {
    bucket: IMAGE_STORAGE_BUCKET,
    folders: IMAGE_UPLOAD_FOLDERS,
    validate: getImageError,
    buildObjectPath: (folder, fileName, fileType) =>
      buildUuidStorageObjectPath(folder, fileName, { contentType: fileType }),
    logTag: "api/uploads/sign-image POST",
  });
}
