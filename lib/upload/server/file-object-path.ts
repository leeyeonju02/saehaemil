import { randomUUID } from "crypto";
import { sanitizeFolderSegment } from "@/lib/storage/sanitize-upload-path";
import { ALLOWED_FILE_EXTENSIONS } from "@/lib/upload/file/config";
import { getFileExtension } from "@/lib/upload/file/validate";

/**
 * 첨부 문서용 확장자 — 파일명 우선, 없으면 MIME 보조.
 */
export function getSafeFileExtension(originalFilename: string, contentType: string): string {
  const part = getFileExtension(originalFilename);
  if (ALLOWED_FILE_EXTENSIONS.has(part)) {
    return part;
  }

  const mime = contentType.toLowerCase().split(";")[0]?.trim() ?? "";
  switch (mime) {
    case "application/pdf":
      return "pdf";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "xlsx";
    case "application/vnd.ms-excel":
      return "xls";
    case "application/msword":
      return "doc";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx";
    case "application/vnd.ms-powerpoint":
      return "ppt";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "pptx";
    case "application/x-hwp":
    case "application/haansofthwp":
    case "application/vnd.hancom.hwp":
      return "hwp";
    case "application/vnd.hancom.hwpx":
      return "hwpx";
    default:
      return "bin";
  }
}

/**
 * 첨부 문서 Storage 객체 경로 `{folder}/{uuid}.{ext}` (원본 파일명은 경로에 포함하지 않음)
 */
export function buildUuidFileObjectPath(
  baseSegment: string,
  originalFilename: string,
  contentType: string
): string {
  const folder = sanitizeFolderSegment(baseSegment);
  const ext = getSafeFileExtension(originalFilename, contentType);
  const id = randomUUID();
  return `${folder}/${id}.${ext}`;
}
