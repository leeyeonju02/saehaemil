import { NextResponse } from "next/server";
import { uploadPublicImage } from "@/lib/storage/upload-public-image";
import { verifyImageUploadAuth } from "@/lib/storage/verify-upload-auth";
import { buildUuidStorageObjectPath } from "@/lib/storage/storage-object-path";
import { validateImageBlob } from "@/lib/storage/validate-image-blob";

export const runtime = "nodejs";

/** Supabase Storage 버킷 내 폴더 (gallery/…) */
const GALLERY_STORAGE_FOLDER = "gallery";

/**
 * 갤러리 앨범용 — 이미지를 Supabase Storage 공개 버킷에 올리고 공개 URL 목록을 반환합니다.
 *
 * POST multipart/form-data
 * - `files`: 이미지 파일 (동일 필드명으로 여러 개)
 * - `adminPassword` | `secret` — `/api/uploads/image` 와 동일 인증
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
          "업로드 권한이 없습니다. adminPassword(관리자) 또는 secret(IMAGE_UPLOAD_SECRET)을 확인하세요.",
      },
      { status: 401 }
    );
  }

  const rawEntries = formData.getAll("files");
  const fileEntries = rawEntries.filter(
    (x): x is File => typeof x !== "string" && x != null && x.size !== undefined
  );

  if (fileEntries.length === 0) {
    return NextResponse.json(
      { error: "files 필드에 이미지 파일을 한 개 이상 넣어 주세요." },
      { status: 400 }
    );
  }

  const items: { url: string; path: string; filename: string }[] = [];

  for (const fileEntry of fileEntries) {
    const blob = fileEntry as Blob;
    const validated = validateImageBlob(blob);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const originalName =
      typeof File !== "undefined" && fileEntry instanceof File ? fileEntry.name : "upload.jpg";
    const objectPath = buildUuidStorageObjectPath(GALLERY_STORAGE_FOLDER, originalName, {
      contentType: validated.mime,
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
        contentType: validated.mime,
      });
      items.push({ url: publicUrl, path, filename: originalName });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Storage 업로드에 실패했습니다.";
      console.error("[api/gallery/upload-images POST]", e);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ items });
}
