import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyImageUploadAuth } from "@/lib/storage/verify-upload-auth";
import { buildUuidStorageObjectPath } from "@/lib/storage/storage-object-path";
import { buildUuidNoticeDocumentObjectPath } from "@/lib/storage/notice-upload-path";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  DEFAULT_STORAGE_BUCKET,
  MAX_IMAGE_BYTES,
} from "@/lib/storage/image-upload-config";
import {
  ALLOWED_NOTICE_FILE_EXTENSIONS,
  MAX_NOTICE_FILE_BYTES,
} from "@/lib/storage/notice-file-upload-config";

export const runtime = "nodejs";

const NOTICE_IMAGE_FOLDER = "notice/images";

type UploadKind = "image" | "file";

type Body = {
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  adminPassword?: string;
  secret?: string;
  /** 기본 `image`. `file` 일 때 문서(hwp·xlsx·pdf 등) 업로드용 경로·용량 검증 */
  kind?: UploadKind;
};

function extensionOf(fileName: string): string {
  const part = fileName.trim().split(".").pop()?.toLowerCase() ?? "";
  return part;
}

function isAllowedNoticeFile(fileName: string): boolean {
  const ext = extensionOf(fileName);
  return ALLOWED_NOTICE_FILE_EXTENSIONS.has(ext);
}

/**
 * 공지 이미지·첨부파일 업로드용 Signed Upload URL (갤러리 sign-upload와 동일 흐름).
 *
 * POST application/json
 * - `kind`: `image` | `file` (기본 `image`)
 * - `fileName`, `fileType`, `fileSize`(선택)
 * - `adminPassword` | `secret` — 갤러리·이미지 업로드 API와 동일 인증
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
  const kind: UploadKind = body.kind === "file" ? "file" : "image";

  if (!fileName || !fileType) {
    return NextResponse.json(
      { error: "fileName과 fileType이 필요합니다." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (kind === "image") {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(fileType)) {
      return NextResponse.json(
        { error: "허용되지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WEBP)" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (typeof body.fileSize === "number" && body.fileSize > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        {
          error: `이미지 크기는 ${MAX_IMAGE_BYTES / 1024 / 1024}MB 이하여야 합니다.`,
        },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } else {
    if (!isAllowedNoticeFile(fileName)) {
      return NextResponse.json(
        {
          error:
            "허용되지 않는 첨부 형식입니다. (pdf, xlsx, xls, hwp, hwpx, doc, docx, ppt, pptx)",
        },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (typeof body.fileSize === "number" && body.fileSize > MAX_NOTICE_FILE_BYTES) {
      return NextResponse.json(
        {
          error: `첨부 파일 크기는 ${MAX_NOTICE_FILE_BYTES / 1024 / 1024}MB 이하여야 합니다.`,
        },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
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
  const objectPath =
    kind === "image"
      ? buildUuidStorageObjectPath(NOTICE_IMAGE_FOLDER, fileName, { contentType: fileType })
      : buildUuidNoticeDocumentObjectPath(fileName, fileType);

  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(objectPath);

  if (error) {
    console.error("[api/notices/sign-upload POST]", error);
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
