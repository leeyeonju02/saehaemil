/** 첨부 문서(hwp, xlsx 등) 단일 파일 최대 크기 (바이트) */
export const MAX_FILE_BYTES = 25 * 1024 * 1024;

/** 저장 경로·검증에 사용하는 확장자(소문자) */
export const ALLOWED_FILE_EXTENSIONS = new Set([
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

/** `<input type="file" accept>` 값 */
export const FILE_INPUT_ACCEPT = [
  ...Array.from(ALLOWED_FILE_EXTENSIONS, (ext) => `.${ext}`),
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
].join(",");
