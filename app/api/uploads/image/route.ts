import { NextResponse } from "next/server";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_BYTES,
} from "@/lib/storage/image-upload-config";
import { uploadPublicImage } from "@/lib/storage/upload-public-image";
import { verifyImageUploadAuth } from "@/lib/storage/verify-upload-auth";
import { buildObjectPath } from "@/lib/storage/sanitize-upload-path";

export const runtime = "nodejs";

/**
 * POST multipart/form-data
 * - `file` (필수): 이미지 파일
 * - `purpose` (선택): 저장 폴더 구분 (영문·숫자·-_ 만, 예: board, notice)
 * - 인증(택1): `adminPassword` | `secret`(IMAGE_UPLOAD_SECRET 과 일치) | 서버에서 ALLOW_PUBLIC_IMAGE_UPLOAD=true
 *
 * 응답: `{ url: string, path: string }` — `url` 을 DB·폼에 저장해 사용
 */
export async function POST(request: Request) {
  const contentTypeHeader = request.headers.get("content-type") || "";
  if (!contentTypeHeader.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content-Type은 multipart/form-data 여야 합니다." },
      { status: 400 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "요청 본문을 읽을 수 없습니다." }, { status: 400 });
  }

  const adminPasswordRaw = formData.get("adminPassword");
  const secretRaw = formData.get("secret");
  const authOk = verifyImageUploadAuth({
    adminPassword: typeof adminPasswordRaw === "string" ? adminPasswordRaw : undefined,
    secret: typeof secretRaw === "string" ? secretRaw : undefined,
  });

  if (!authOk) {
    return NextResponse.json(
      {
        error:
          "업로드 권한이 없습니다. adminPassword(관리자), secret(서버에 설정한 IMAGE_UPLOAD_SECRET 과 동일), 또는 서버의 ALLOW_PUBLIC_IMAGE_UPLOAD 를 확인하세요.",
      },
      { status: 401 }
    );
  }

  const fileEntry = formData.get("file");
  if (!fileEntry || typeof fileEntry === "string") {
    return NextResponse.json(
      { error: "file 필드에 이미지 파일을 넣어 주세요." },
      { status: 400 }
    );
  }

  const blob = fileEntry as Blob;
  if (blob.size <= 0) {
    return NextResponse.json({ error: "빈 파일입니다." }, { status: 400 });
  }

  if (blob.size > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: `파일 크기는 ${MAX_IMAGE_BYTES / 1024 / 1024}MB 이하여야 합니다.` },
      { status: 400 }
    );
  }

  const mime = blob.type || "application/octet-stream";
  if (!ALLOWED_IMAGE_MIME_TYPES.has(mime)) {
    return NextResponse.json(
      { error: "허용되지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WEBP)" },
      { status: 400 }
    );
  }

  const purposeRaw = formData.get("purpose");
  const folder = typeof purposeRaw === "string" ? purposeRaw : "general";
  const originalName =
    typeof File !== "undefined" && fileEntry instanceof File ? fileEntry.name : "upload.jpg";
  const objectPath = buildObjectPath(folder, originalName);

  let bytes: Uint8Array;
  try {
    const buf = await blob.arrayBuffer();
    bytes = new Uint8Array(buf);
  } catch {
    return NextResponse.json({ error: "파일을 읽을 수 없습니다." }, { status: 400 });
  }

  try {
    const { path, publicUrl } = await uploadPublicImage({
      objectPath,
      bytes,
      contentType: mime,
    });
    return NextResponse.json({ url: publicUrl, path });
  } catch (e) {
    const message = e instanceof Error ? e.message : "업로드에 실패했습니다.";
    console.error("[api/uploads/image POST]", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
