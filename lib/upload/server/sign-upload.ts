import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyImageUploadAuth } from "@/lib/storage/verify-upload-auth";

type Body = {
  purpose?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  adminPassword?: string;
  secret?: string;
};

export type SignUploadOptions = {
  bucket: string;
  /** 허용 용도 → Storage 폴더 */
  folders: Readonly<Record<string, string>>;
  /** 검증 실패 메시지, 통과하면 null */
  validate: (file: { name: string; type: string; size: number }) => string | null;
  buildObjectPath: (folder: string, fileName: string, fileType: string) => string;
  logTag: string;
};

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

/**
 * Signed Upload URL 발급 공통 처리 (이미지·첨부 문서 API 공용).
 *
 * POST application/json
 * - `purpose` — `lib/upload/purposes.ts` 에 등록된 용도
 * - `fileName`, `fileType`, `fileSize`
 * - `adminPassword` | `secret` — 기존 업로드 API와 동일 인증
 */
export async function handleSignUpload(
  request: Request,
  options: SignUploadOptions
): Promise<NextResponse> {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return jsonError("잘못된 요청 본문입니다.", 400);
  }

  const purpose = typeof body.purpose === "string" ? body.purpose : "";
  const folder = Object.prototype.hasOwnProperty.call(options.folders, purpose)
    ? options.folders[purpose]
    : undefined;
  if (!folder) {
    return jsonError("허용되지 않는 업로드 용도입니다.", 400);
  }

  const fileName = typeof body.fileName === "string" ? body.fileName.trim() : "";
  const fileType = typeof body.fileType === "string" ? body.fileType.trim() : "";
  const fileSize = typeof body.fileSize === "number" ? body.fileSize : NaN;
  if (!fileName || !fileType || !Number.isFinite(fileSize)) {
    return jsonError("fileName, fileType, fileSize가 필요합니다.", 400);
  }

  const invalid = options.validate({ name: fileName, type: fileType, size: fileSize });
  if (invalid) {
    return jsonError(invalid, 400);
  }

  if (
    !verifyImageUploadAuth({
      adminPassword: typeof body.adminPassword === "string" ? body.adminPassword : undefined,
      secret: typeof body.secret === "string" ? body.secret : undefined,
    })
  ) {
    return jsonError(
      "업로드 권한이 없습니다. adminPassword(관리자) 또는 secret(IMAGE_UPLOAD_SECRET)을 확인하세요.",
      401
    );
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : "Supabase 설정 오류", 500);
  }

  const objectPath = options.buildObjectPath(folder, fileName, fileType);
  const { data, error } = await supabase.storage
    .from(options.bucket)
    .createSignedUploadUrl(objectPath);

  if (error) {
    console.error(`[${options.logTag}]`, error);
    return jsonError(error.message || "Signed URL 생성에 실패했습니다.", 500);
  }

  if (!data?.signedUrl || !data?.token || !data?.path) {
    return jsonError("Signed URL 응답이 올바르지 않습니다.", 500);
  }

  return NextResponse.json({
    path: data.path,
    signedUrl: data.signedUrl,
    token: data.token,
    bucket: options.bucket,
  });
}
