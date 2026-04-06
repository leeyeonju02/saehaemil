import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";

/**
 * 이미지 업로드 API 인증 (다음 중 하나 충족 시 허용)
 * 1) 관리자 작성 비밀번호 (공지 작성과 동일)
 * 2) 서버 전용 `IMAGE_UPLOAD_SECRET` 과 폼 필드 `secret` 일치 (게시판 등에서 사용)
 * 3) `ALLOW_PUBLIC_IMAGE_UPLOAD=true` — 인증 없이 허용 (개발/내부망 전용 권장, 운영 시 남용 주의)
 */
export function verifyImageUploadAuth(input: {
  adminPassword: string | undefined;
  secret: string | undefined;
}): boolean {
  if (verifyAdminWritePassword(input.adminPassword)) {
    return true;
  }

  const expected = process.env.IMAGE_UPLOAD_SECRET?.trim();
  if (expected && input.secret === expected) {
    return true;
  }

  if (process.env.ALLOW_PUBLIC_IMAGE_UPLOAD === "true") {
    return true;
  }

  return false;
}
