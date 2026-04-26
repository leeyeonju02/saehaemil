/** 공지 첨부 문서(hwp, xlsx 등) 단일 파일 최대 크기 */
export const MAX_NOTICE_FILE_BYTES = 25 * 1024 * 1024;

/** 저장 경로·검증에 사용하는 확장자(소문자) */
export const ALLOWED_NOTICE_FILE_EXTENSIONS = new Set([
  "pdf",
  "xlsx",
  "xls",
  "hwp",
  "hwpx",
  "doc",
  "docx",
  "ppt",
  "pptx",
]);
