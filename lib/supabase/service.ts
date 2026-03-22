import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * 서버 전용 — RLS 우회하여 INSERT 등에 사용.
 *
 * 필수 환경 변수:
 * - `SUPABASE_SERVICE_ROLE_KEY` — Supabase 대시보드 → Settings → API → **service_role** (secret)
 * - URL — `NEXT_PUBLIC_SUPABASE_URL` 또는 서버 전용 `SUPABASE_URL` (동일한 프로젝트 URL)
 */
export function createSupabaseServiceClient(): SupabaseClient {
  const { url: publicUrl } = getSupabasePublicConfig();
  const url =
    publicUrl?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  const missing: string[] = [];
  if (!url) {
    missing.push(
      "NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_URL (프로젝트 URL, https://xxx.supabase.co)"
    );
  }
  if (!key) {
    missing.push(
      "SUPABASE_SERVICE_ROLE_KEY (대시보드 → Settings → API → service_role 키 — anon 키와 다릅니다)"
    );
  }
  if (missing.length > 0 || !url || !key) {
    throw new Error(
      `공지 등록용 Supabase 설정이 없습니다. .env.local 에 다음을 추가하세요:\n${missing.map((m) => `• ${m}`).join("\n")}`
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
