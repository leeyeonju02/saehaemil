/**
 * 공지 이미지·첨부파일 → Supabase Storage (Signed URL), 갤러리 업로드와 동일 흐름.
 *
 * 1) POST /api/notices/sign-upload
 * 2) `uploadToSignedUrl`
 * 3) `getPublicUrl` 로 DB 저장용 공개 URL
 */

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { validateImageBlob } from "@/lib/storage/validate-image-blob";
import { MAX_NOTICE_FILE_BYTES } from "@/lib/storage/notice-file-upload-config";

export const NOTICE_SIGN_UPLOAD_API = "/api/notices/sign-upload";

export type NoticeUploadedMedia = {
  url: string;
  filename: string;
};

export type NoticeUploadKind = "image" | "file";

export async function uploadNoticeMediaToSupabase(
  files: File[],
  adminPassword: string,
  kind: NoticeUploadKind
): Promise<NoticeUploadedMedia[]> {
  const supabase = getSupabaseBrowserClient();
  const items: NoticeUploadedMedia[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let mime: string;
    if (kind === "image") {
      const validated = validateImageBlob(file);
      if (!validated.ok) {
        throw new Error(validated.error);
      }
      mime = validated.mime;
    } else {
      if (file.size > MAX_NOTICE_FILE_BYTES) {
        throw new Error(
          `첨부 파일은 ${MAX_NOTICE_FILE_BYTES / 1024 / 1024}MB 이하여야 합니다. (${file.name})`
        );
      }
      mime = file.type || "application/octet-stream";
    }

    const signRes = await fetch(NOTICE_SIGN_UPLOAD_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: mime,
        fileSize: file.size,
        adminPassword,
        kind,
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

    const { error: uploadError } = await supabase.storage
      .from(payload.bucket)
      .uploadToSignedUrl(payload.path, payload.token, file, {
        contentType: mime,
        cacheControl: "3600",
      });

    if (uploadError) {
      throw new Error(uploadError.message || "Storage 업로드에 실패했습니다.");
    }

    const { data: pub } = supabase.storage.from(payload.bucket).getPublicUrl(payload.path);
    if (!pub?.publicUrl) {
      throw new Error("공개 URL을 생성하지 못했습니다. 버킷 Public 설정을 확인하세요.");
    }

    items.push({ url: pub.publicUrl, filename: file.name });
  }

  return items;
}
