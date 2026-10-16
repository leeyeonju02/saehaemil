/**
 * 관리자 화면에서 비공개 공지까지 불러오기 (클라이언트 전용)
 * — 로그인 시 sessionStorage 에 저장한 관리자 비밀번호로 `/api/notices/admin` 호출
 */

import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";
import type { Notice } from "@/types/notice";

const ADMIN_NOTICES_API = "/api/notices/admin";

function getAdminPassword(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_PW_SESSION_KEY);
  } catch {
    return null;
  }
}

async function postAdmin<T>(body: Record<string, unknown>): Promise<T | null> {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return null;
  const res = await fetch(ADMIN_NOTICES_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, adminPassword }),
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

/** 비공개 포함 전체 목록. 실패하면 null */
export async function fetchNoticesAsAdmin(): Promise<Notice[] | null> {
  const data = await postAdmin<{ notices?: Notice[] }>({});
  return data?.notices ?? null;
}

/** 비공개 포함 단건. 없거나 실패하면 null */
export async function fetchNoticeAsAdmin(id: string): Promise<Notice | null> {
  const data = await postAdmin<{ notice?: Notice }>({ id });
  return data?.notice ?? null;
}
