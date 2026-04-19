import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyImageUploadAuth } from "@/lib/storage/verify-upload-auth";
import { buildUuidStorageObjectPath } from "@/lib/storage/storage-object-path";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  DEFAULT_STORAGE_BUCKET,
  MAX_IMAGE_BYTES,
} from "@/lib/storage/image-upload-config";

export const runtime = "nodejs";

/** Supabase Storage 버킷 내 폴더 (gallery/…) */
const GALLERY_STORAGE_FOLDER = "gallery";

type Body = {
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  adminPassword?: string;
  secret?: string;
};

/**
 * 갤러리 이미지 업로드용 Signed Upload URL 발급.
 * 클라이언트는 반환된 path, token, bucket 으로 `uploadToSignedUrl` 후 공개 URL을 구성합니다.
 *
 * POST application/json
 * - `fileName`, `fileType` (image MIME)
 * - `fileSize` (선택, 초과 시 거절)
 * - `adminPassword` | `secret` — 기존 업로드 API와 동일 인증
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const fileName = typeof body.fileName === "string" ? body.fileName.trim() : "";
  const fileType = typeof body.fileType === "string" ? body.fileType.trim() : "";

  if (!fileName || !fileType) {
    return NextResponse.json(
      { error: "fileName과 fileType이 필요합니다." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(fileType)) {
    return NextResponse.json(
      { error: "허용되지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WEBP)" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (typeof body.fileSize === "number" && body.fileSize > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      {
        error: `파일 크기는 ${MAX_IMAGE_BYTES / 1024 / 1024}MB 이하여야 합니다.`,
      },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (
    !verifyImageUploadAuth({
      adminPassword: typeof body.adminPassword === "string" ? body.adminPassword : undefined,
      secret: typeof body.secret === "string" ? body.secret : undefined,
    })
  ) {
    return NextResponse.json(
      {
        error:
          "업로드 권한이 없습니다. adminPassword(관리자) 또는 secret(IMAGE_UPLOAD_SECRET)을 확인하세요.",
      },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const bucket = DEFAULT_STORAGE_BUCKET;
  const objectPath = buildUuidStorageObjectPath(GALLERY_STORAGE_FOLDER, fileName, {
    contentType: fileType,
  });

  console.log("[gallery-flow] 2 서버 — Presigned URL 생성", { bucket, objectPath, fileName });

  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(objectPath);

  if (error) {
    console.error("[api/gallery/sign-upload POST]", error);
    return NextResponse.json(
      { error: error.message || "Signed URL 생성에 실패했습니다." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!data?.signedUrl || !data?.token || !data?.path) {
    return NextResponse.json(
      { error: "Signed URL 응답이 올바르지 않습니다." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("[gallery-flow] 2 서버 — Presigned 발급 완료(클라이언트가 3번 업로드)", {
    path: data.path,
    bucket,
  });

  return NextResponse.json(
    {
      path: data.path,
      signedUrl: data.signedUrl,
      token: data.token,
      bucket,
    },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
