import { handleSignUpload } from "@/lib/upload/server/sign-upload";
import { FILE_STORAGE_BUCKET } from "@/lib/upload/server/buckets";
import { FILE_UPLOAD_FOLDERS } from "@/lib/upload/purposes";
import { getFileError } from "@/lib/upload/file/validate";
import { buildUuidFileObjectPath } from "@/lib/upload/server/file-object-path";

export const runtime = "nodejs";

/** 첨부 문서 업로드용 Signed Upload URL 발급 (`lib/upload/file/upload-files.ts` 에서 호출) */
export async function POST(request: Request) {
  return handleSignUpload(request, {
    bucket: FILE_STORAGE_BUCKET,
    folders: FILE_UPLOAD_FOLDERS,
    validate: getFileError,
    buildObjectPath: buildUuidFileObjectPath,
    logTag: "api/uploads/sign-file POST",
  });
}
