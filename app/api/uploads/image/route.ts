import { NextResponse } from "next/server";
import { uploadPublicImage } from "@/lib/storage/upload-public-image";
import { verifyImageUploadAuth } from "@/lib/storage/verify-upload-auth";
import { buildUuidStorageObjectPath } from "@/lib/storage/storage-object-path";
import { validateImageBlob } from "@/lib/storage/validate-image-blob";

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
  const validated = validateImageBlob(blob);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }
  const mime = validated.mime;

  const purposeRaw = formData.get("purpose");
  const folder = typeof purposeRaw === "string" ? purposeRaw : "general";
  const originalName =
    typeof File !== "undefined" && fileEntry instanceof File ? fileEntry.name : "upload.jpg";
  const objectPath = buildUuidStorageObjectPath(folder, originalName, {
    contentType: mime,
  });

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
