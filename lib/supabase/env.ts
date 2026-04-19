/**
 * Supabase는 프로젝트당 하나의 URL/키 쌍입니다.
 * 로컬(.env.local)과 배포(Vercel 환경 변수)에 동일한 값을 넣으면 같은 DB를 바라봅니다.
 *
 * URL: NEXT_PUBLIC_SUPABASE_URL 우선, 없으면 SUPABASE_URL(서버 전용 보조 — 동일 프로젝트여야 함)
 * 키: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY 또는 NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export function getSupabaseProjectUrl(): string | undefined {
  const fromNext =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();
  return fromNext || undefined;
}

export function getSupabasePublicConfig(): {
  url: string | undefined;
  key: string | undefined;
} {
  const url = getSupabaseProjectUrl();
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return { url, key };
}
