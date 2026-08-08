/**
 * Supabase는 프로젝트당 하나의 URL/키 쌍입니다.
 * Vercel과 동일한 3개 환경 변수를 사용합니다.
 *
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
 * - SUPABASE_SERVICE_ROLE_KEY (서버 전용, service.ts)
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
