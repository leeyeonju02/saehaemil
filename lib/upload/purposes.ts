/**
 * 업로드 용도(purpose) → Storage 폴더.
 * 새 화면에서 업로드를 쓰려면 여기에 한 줄 추가한다. 목록에 없는 용도는 서버에서 거절된다.
 */
export const IMAGE_UPLOAD_FOLDERS = {
  gallery: "gallery",
  notice: "notice/images",
} as const;

export const FILE_UPLOAD_FOLDERS = {
  notice: "notice/files",
} as const;

export type ImageUploadPurpose = keyof typeof IMAGE_UPLOAD_FOLDERS;
export type FileUploadPurpose = keyof typeof FILE_UPLOAD_FOLDERS;
