import { Buffer } from "node:buffer";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { DEFAULT_STORAGE_BUCKET } from "@/lib/storage/image-upload-config";

export type UploadPublicImageResult = {
  path: string;
  publicUrl: string;
};

/**
 * Service Role 로 Storage 에 업로드 후 공개 URL 반환.
 * 버킷은 Public 읽기 권한이 있어야 `publicUrl` 이 브라우저에서 열립니다.
 */
export async function uploadPublicImage(params: {
  objectPath: string;
  bytes: Uint8Array;
  contentType: string;
  bucket?: string;
}): Promise<UploadPublicImageResult> {
  const bucket = params.bucket ?? DEFAULT_STORAGE_BUCKET;
  const supabase = createSupabaseServiceClient();

  const body = Buffer.from(params.bytes);
  const { data, error } = await supabase.storage.from(bucket).upload(params.objectPath, body, {
    contentType: params.contentType,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message || "Storage 업로드에 실패했습니다.");
  }

  const path = data?.path ?? params.objectPath;
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);

  if (!pub?.publicUrl) {
    throw new Error("공개 URL 을 생성하지 못했습니다. 버킷 Public 설정을 확인하세요.");
  }

  return { path, publicUrl: pub.publicUrl };
}
