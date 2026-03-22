import { DUMMY_ADMIN_PASSWORD } from "@/lib/auth-dummy";

/**
 * 공지 작성 등 서버 API 에서 관리자 비밀번호 검증.
 * 운영 시 `ADMIN_WRITE_PASSWORD` 환경 변수로 덮어쓸 수 있습니다.
 */
export function verifyAdminWritePassword(input: string | undefined): boolean {
  if (!input) return false;
  const expected =
    process.env.ADMIN_WRITE_PASSWORD?.trim() || DUMMY_ADMIN_PASSWORD;
  return input === expected;
}
