import imageCompression from "browser-image-compression";
import {
  COMPRESS_INITIAL_QUALITY,
  COMPRESS_MAX_SIZE_MB,
  COMPRESS_MAX_WIDTH_OR_HEIGHT,
  COMPRESS_THRESHOLD_BYTES,
} from "@/lib/upload/image/config";
import { getImageError, getOriginalImageError } from "@/lib/upload/image/validate";
import { buildSelectionResult, type FileSelectionResult } from "@/lib/upload/selection";

/** 확장자를 결과 형식에 맞춘다 (서버가 파일명 확장자로 저장 경로를 정함) */
function renameForType(fileName: string, type: string): string {
  const ext = type === "image/png" ? "png" : "jpg";
  const base = fileName.replace(/\.[^.]+$/, "");
  return `${base || "image"}.${ext}`;
}

/**
 * 업로드 전에 브라우저에서 이미지를 줄인다.
 * - PNG는 투명 배경을 지키려고 PNG로, 나머지(JPEG·WEBP·이름만 .jpg인 BMP 등)는 JPEG로 저장한다.
 *   (Safari는 WebP 인코딩을 지원하지 않아 결과가 PNG로 커질 수 있으므로 WebP로 저장하지 않는다)
 * - GIF(움직임 유지)와 이미 작은 파일은 그대로 돌려준다. 줄인 결과가 더 크면 원본을 쓴다.
 */
export async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif" || file.size <= COMPRESS_THRESHOLD_BYTES) {
    return file;
  }
  const fileType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const compressed = await imageCompression(file, {
    maxSizeMB: COMPRESS_MAX_SIZE_MB,
    maxWidthOrHeight: COMPRESS_MAX_WIDTH_OR_HEIGHT,
    initialQuality: COMPRESS_INITIAL_QUALITY,
    fileType,
    // 기본값(true)은 Web Worker 스크립트를 외부 CDN에서 받아오므로 사용하지 않는다
    useWebWorker: false,
  });
  if (compressed.size >= file.size) {
    return file;
  }
  const type = compressed.type || fileType;
  return new File([compressed], renameForType(file.name, type), {
    type,
    lastModified: file.lastModified,
  });
}

/**
 * 파일 선택 시 처리 — 원본 검증 → 줄이기 → 업로드 한도 검증.
 * 통과한 (줄인) 파일만 돌려준다.
 */
export async function prepareImageSelection(files: File[]): Promise<FileSelectionResult> {
  const prepared: File[] = [];
  const errors: string[] = [];
  for (const file of files) {
    const originalError = getOriginalImageError(file);
    if (originalError) {
      errors.push(`${originalError} (${file.name})`);
      continue;
    }
    let result: File;
    try {
      result = await compressImage(file);
    } catch {
      errors.push(`이미지를 처리하지 못했습니다. (${file.name})`);
      continue;
    }
    const error = getImageError(result);
    if (error) {
      errors.push(`${error} (${file.name})`);
      continue;
    }
    prepared.push(result);
  }
  return buildSelectionResult(prepared, errors);
}
