export type FileSelectionResult = {
  /** 검증을 통과한 파일 */
  files: File[];
  /** 통과하지 못한 파일이 있으면 사용자에게 보여 줄 메시지 */
  error: string | null;
};

/** 통과/실패 목록으로 결과를 만든다. 실패 메시지는 첫 번째 파일 기준. */
export function buildSelectionResult(files: File[], errors: string[]): FileSelectionResult {
  const error =
    errors.length === 0
      ? null
      : errors.length === 1
        ? errors[0]
        : `${errors[0]} 외 ${errors.length - 1}개 파일이 제외되었습니다.`;
  return { files, error };
}

/** 선택한 파일을 검증 통과/실패로 나눈다. */
export function splitValidFiles(
  files: File[],
  getError: (file: File) => string | null
): FileSelectionResult {
  const valid: File[] = [];
  const errors: string[] = [];
  for (const file of files) {
    const error = getError(file);
    if (error) {
      errors.push(`${error} (${file.name})`);
    } else {
      valid.push(file);
    }
  }
  return buildSelectionResult(valid, errors);
}
