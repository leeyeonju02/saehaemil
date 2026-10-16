/**
 * 갤러리 이미지 → Supabase Storage (Signed URL)
 *
 * 1) POST /api/gallery/sign-upload 로 path·token·bucket 발급
 * 2) 브라우저에서 `uploadToSignedUrl` 로 직접 업로드
 * 3) `getPublicUrl` 로 DB 저장용 공개 URL 확보
 */

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { validateImageBlob } from "@/lib/storage/validate-image-blob";

export const GALLERY_SIGN_UPLOAD_API = "/api/gallery/sign-upload";

const FLOW = "[gallery-flow]";

export type GalleryUploadedImage = {
  url: string;
  filename: string;
};

export async function uploadGalleryImagesToSupabase(
  files: File[],
  adminPassword: string
): Promise<GalleryUploadedImage[]> {
  const supabase = getSupabaseBrowserClient();
  const items: GalleryUploadedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const validated = validateImageBlob(file);
    if (!validated.ok) {
      throw new Error(validated.error);
    }

    console.log(`${FLOW} 1→2 요청 [${i + 1}/${files.length}]`, {
      fileName: file.name,
      fileType: validated.mime,
      fileSize: file.size,
    });

    const signRes = await fetch(GALLERY_SIGN_UPLOAD_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: validated.mime,
        fileSize: file.size,
        adminPassword,
      }),
    });

    const rawBody = await signRes.text();
    let payload: {
      error?: string;
      path?: string;
      token?: string;
      bucket?: string;
    };
    try {
      payload = JSON.parse(rawBody) as typeof payload;
    } catch {
      throw new Error("서버 응답 본문을 JSON으로 읽을 수 없습니다.");
    }

    if (!signRes.ok || !payload.path || !payload.token || !payload.bucket) {
      throw new Error(payload.error ?? "업로드 URL 발급에 실패했습니다.");
    }

    console.log(`${FLOW} 2 응답 [${i + 1}/${files.length}] Presigned 발급`, {
      bucket: payload.bucket,
      path: payload.path,
    });

    console.log(`${FLOW} 3 업로드 시작 [${i + 1}/${files.length}] → Supabase Storage (직접)`);

    const { error: uploadError } = await supabase.storage
      .from(payload.bucket)
      .uploadToSignedUrl(payload.path, payload.token, file, {
        contentType: validated.mime,
        cacheControl: "3600",
      });

    if (uploadError) {
      throw new Error(uploadError.message || "Storage 업로드에 실패했습니다.");
    }

    const { data: pub } = supabase.storage.from(payload.bucket).getPublicUrl(payload.path);
    if (!pub?.publicUrl) {
      throw new Error("공개 URL을 생성하지 못했습니다. 버킷 Public 설정을 확인하세요.");
    }

    console.log(`${FLOW} 3 완료 [${i + 1}/${files.length}] 공개 URL`, pub.publicUrl);

    items.push({ url: pub.publicUrl, filename: file.name });
  }

  return items;
}
