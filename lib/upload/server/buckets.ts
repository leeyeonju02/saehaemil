/** Supabase 대시보드 → Storage 에 동일 이름 버킷 생성 후 Public 으로 두면 URL 로 바로 접근 가능 */
export const IMAGE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET?.trim() || "saehaemilImage";

/** 첨부 문서 버킷 — 따로 지정하지 않으면 이미지 버킷을 함께 쓴다 */
export const FILE_STORAGE_BUCKET =
  process.env.SUPABASE_FILE_STORAGE_BUCKET?.trim() || IMAGE_STORAGE_BUCKET;
