/**
 * 갤러리 이미지 → Supabase Storage (서버 API 경유)
 *
 * 1) POST /api/gallery/upload-images 로 파일 전송
 * 2) 서버가 `uploadPublicImage` 로 버킷에 저장 후 공개 URL 반환
 * 3) 반환된 url 을 앨범 `images[].src` 등에 사용
 */

export const GALLERY_UPLOAD_IMAGES_API = "/api/gallery/upload-images";

export type GalleryUploadedImage = {
  url: string;
  filename: string;
};

export async function uploadGalleryImagesToSupabase(
  files: File[],
  adminPassword: string
): Promise<GalleryUploadedImage[]> {
  const fd = new FormData();
  fd.append("adminPassword", adminPassword);
  for (const f of files) {
    fd.append("files", f);
  }

  const res = await fetch(GALLERY_UPLOAD_IMAGES_API, {
    method: "POST",
    body: fd,
  });

  console.log("[gallery] fetch Response 객체", res);

  const rawBody = await res.text();
  console.log("[gallery] response body (원문 문자열)", rawBody);

  let data: {
    error?: string;
    items?: { url: string; path: string; filename: string }[];
  };
  try {
    data = JSON.parse(rawBody) as typeof data;
  } catch {
    throw new Error("서버 응답 본문을 JSON으로 읽을 수 없습니다.");
  }

  if (!res.ok || !data.items?.length) {
    throw new Error(data.error ?? "이미지 업로드에 실패했습니다.");
  }

  return data.items.map((i) => ({ url: i.url, filename: i.filename }));
}
