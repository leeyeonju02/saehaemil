/**
 * Supabase Storage Signed URL 업로드 (클라이언트 공용)
 *
 * 1) 서버 API 로 path·token·bucket 발급
 * 2) 브라우저에서 `uploadToSignedUrl` 로 직접 업로드
 * 3) `getPublicUrl` 로 DB 저장용 공개 URL 확보
 */

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type UploadedFile = {
  url: string;
  filename: string;
};

export async function uploadWithSignedUrl(params: {
  signApi: string;
  file: File;
  contentType: string;
  /** 발급 요청에 함께 보낼 값 (purpose, adminPassword 등) */
  body: Record<string, unknown>;
}): Promise<UploadedFile> {
  const { signApi, file, contentType, body } = params;

  const signRes = await fetch(signApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      fileName: file.name,
      fileType: contentType,
      fileSize: file.size,
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

  const supabase = getSupabaseBrowserClient();
  const { error: uploadError } = await supabase.storage
    .from(payload.bucket)
    .uploadToSignedUrl(payload.path, payload.token, file, {
      contentType,
      cacheControl: "3600",
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Storage 업로드에 실패했습니다.");
  }

  const { data: pub } = supabase.storage.from(payload.bucket).getPublicUrl(payload.path);
  if (!pub?.publicUrl) {
    throw new Error("공개 URL을 생성하지 못했습니다. 버킷 Public 설정을 확인하세요.");
  }

  return { url: pub.publicUrl, filename: file.name };
}
