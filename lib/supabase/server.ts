import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/** 서버(라우트·Server Component)에서 매 요청마다 새 클라이언트 */
export function createSupabaseServerClient(): SupabaseClient {
  const { url, key } = getSupabasePublicConfig();
  if (!url || !key) {
    throw new Error(
      "Supabase 환경 변수가 없습니다. NEXT_PUBLIC_SUPABASE_URL 과 발행용 키를 확인하세요."
    );
  }
  return createClient(url, key);
}
