import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseProjectUrl } from "@/lib/supabase/env";

/**
 * 서버 전용 — RLS 우회하여 INSERT 등에 사용.
 * 프로젝트 URL은 `getSupabaseProjectUrl()`과 동일(로컬·배포 공통).
 *
 * 필수: SUPABASE_SERVICE_ROLE_KEY — Dashboard → Settings → API → service_role (anon과 다름)
 */
export function createSupabaseServiceClient(): SupabaseClient {
  const url = getSupabaseProjectUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  const missing: string[] = [];
  if (!url) {
    missing.push(
      "NEXT_PUBLIC_SUPABASE_URL (또는 SUPABASE_URL, 동일 프로젝트 URL)"
    );
  }
  if (!key) {
    missing.push(
      "SUPABASE_SERVICE_ROLE_KEY (Dashboard → Settings → API → service_role)"
    );
  }
  if (missing.length > 0 || !url || !key) {
    throw new Error(
      `Supabase 서버 클라이언트 설정이 없습니다. .env.local 또는 배포 환경에 다음을 추가하세요:\n${missing.map((m) => `• ${m}`).join("\n")}`
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
