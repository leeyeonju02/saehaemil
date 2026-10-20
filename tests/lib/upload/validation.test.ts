import { describe, expect, it } from "vitest";
import { getImageError, getOriginalImageError } from "@/lib/upload/image/validate";
import { MAX_IMAGE_BYTES, MAX_ORIGINAL_IMAGE_BYTES } from "@/lib/upload/image/config";
import { getFileError, getFileExtension, validateFileSelection } from "@/lib/upload/file/validate";
import { MAX_FILE_BYTES } from "@/lib/upload/file/config";
import { buildSelectionResult, splitValidFiles } from "@/lib/upload/selection";
import { getSafeFileExtension } from "@/lib/upload/server/file-object-path";

const MB = 1024 * 1024;

describe("이미지 검증", () => {
  it.each(["image/jpeg", "image/png", "image/gif", "image/webp"])("%s 는 통과", (type) => {
    expect(getImageError({ type, size: MB })).toBeNull();
  });

  it.each(["image/bmp", "image/svg+xml", "application/pdf", ""])("%s 는 허용되지 않는 형식", (type) => {
    expect(getImageError({ type, size: MB })).toContain("허용되지 않는 이미지 형식");
  });

  it("빈 파일은 거부", () => {
    expect(getImageError({ type: "image/png", size: 0 })).toBe("빈 파일입니다.");
  });

  it("업로드 한도(5MB)는 경계값까지 통과", () => {
    expect(getImageError({ type: "image/png", size: MAX_IMAGE_BYTES })).toBeNull();
    expect(getImageError({ type: "image/png", size: MAX_IMAGE_BYTES + 1 })).toBe(
      "이미지는 파일당 5MB 이하여야 합니다."
    );
  });

  it("원본 선택 한도(50MB)는 업로드 한도보다 크다", () => {
    expect(getOriginalImageError({ type: "image/jpeg", size: 20 * MB })).toBeNull();
    expect(getOriginalImageError({ type: "image/jpeg", size: MAX_ORIGINAL_IMAGE_BYTES + 1 })).toBe(
      "이미지는 파일당 50MB 이하여야 합니다."
    );
  });
});

describe("첨부 문서 검증", () => {
  it("확장자는 소문자로, 마지막 점 뒤를 쓴다", () => {
    expect(getFileExtension("보고서.최종.HWP")).toBe("hwp");
    expect(getFileExtension("  a.PDF  ")).toBe("pdf");
  });

  it.each(["a.pdf", "a.hwp", "a.hwpx", "a.xlsx", "a.docx", "a.pptx"])("%s 는 통과", (name) => {
    expect(getFileError({ name, size: MB })).toBeNull();
  });

  it.each(["a.exe", "a.zip", "a.js", "확장자없음"])("%s 는 허용되지 않는 형식", (name) => {
    expect(getFileError({ name, size: MB })).toContain("허용되지 않는 첨부 형식");
  });

  it("빈 파일·25MB 초과는 거부", () => {
    expect(getFileError({ name: "a.pdf", size: 0 })).toBe("빈 파일입니다.");
    expect(getFileError({ name: "a.pdf", size: MAX_FILE_BYTES })).toBeNull();
    expect(getFileError({ name: "a.pdf", size: MAX_FILE_BYTES + 1 })).toBe(
      "첨부 파일은 파일당 25MB 이하여야 합니다."
    );
  });

  it("validateFileSelection 은 통과한 파일만 돌려준다", () => {
    const ok = new File(["x"], "ok.pdf");
    const bad = new File(["x"], "bad.exe");
    const result = validateFileSelection([ok, bad]);
    expect(result.files).toEqual([ok]);
    expect(result.error).toContain("(bad.exe)");
  });
});

describe("선택 결과 만들기", () => {
  it("실패가 없으면 error 는 null", () => {
    expect(buildSelectionResult([], [])).toEqual({ files: [], error: null });
  });

  it("실패가 하나면 그 메시지, 여러 개면 첫 메시지 + 제외 개수", () => {
    expect(buildSelectionResult([], ["A"]).error).toBe("A");
    expect(buildSelectionResult([], ["A", "B", "C"]).error).toBe("A 외 2개 파일이 제외되었습니다.");
  });

  it("splitValidFiles 는 메시지에 파일명을 붙이고 순서를 유지한다", () => {
    const files = ["1.ok", "2.bad", "3.ok", "4.bad"].map((n) => new File(["x"], n));
    const result = splitValidFiles(files, (f) => (f.name.endsWith(".bad") ? "형식 오류" : null));
    expect(result.files.map((f) => f.name)).toEqual(["1.ok", "3.ok"]);
    expect(result.error).toBe("형식 오류 (2.bad) 외 1개 파일이 제외되었습니다.");
  });
});

describe("저장용 확장자 결정", () => {
  it("허용된 확장자면 파일명 확장자를 쓴다", () => {
    expect(getSafeFileExtension("자료.HWPX", "application/octet-stream")).toBe("hwpx");
  });

  it("파일명 확장자가 허용되지 않으면 MIME 으로 판단한다", () => {
    expect(getSafeFileExtension("자료", "application/pdf; charset=binary")).toBe("pdf");
    expect(getSafeFileExtension("자료.dat", "application/haansofthwp")).toBe("hwp");
  });

  it("어느 쪽으로도 알 수 없으면 bin", () => {
    expect(getSafeFileExtension("a.exe", "application/x-msdownload")).toBe("bin");
  });
});
