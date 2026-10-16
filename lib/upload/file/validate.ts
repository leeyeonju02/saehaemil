import { ALLOWED_FILE_EXTENSIONS, MAX_FILE_BYTES } from "@/lib/upload/file/config";
import { splitValidFiles, type FileSelectionResult } from "@/lib/upload/selection";

export function getFileExtension(fileName: string): string {
  return fileName.trim().split(".").pop()?.toLowerCase() ?? "";
}

/** 첨부 문서 검증 (클라이언트·서버 공용). 통과하면 null */
export function getFileError(file: { name: string; size: number }): string | null {
  if (file.size <= 0) {
    return "빈 파일입니다.";
  }
  if (!ALLOWED_FILE_EXTENSIONS.has(getFileExtension(file.name))) {
    return `허용되지 않는 첨부 형식입니다. (${Array.from(ALLOWED_FILE_EXTENSIONS).join(", ")})`;
  }
  if (file.size > MAX_FILE_BYTES) {
    return `첨부 파일은 파일당 ${MAX_FILE_BYTES / 1024 / 1024}MB 이하여야 합니다.`;
  }
  return null;
}

/** 파일 선택 시 검증 — 통과한 파일만 돌려준다 */
export function validateFileSelection(files: File[]): FileSelectionResult {
  return splitValidFiles(files, getFileError);
}
