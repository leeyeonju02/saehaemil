/**
 * Supabase 공개 URL / anon(발행용) 키
 * .env 예:
 * NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 * NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJ...
 *
 * (선택) NEXT_PUBLIC_SUPABASE_ANON_KEY 도 동일 키로 인식
 */
export function getSupabasePublicConfig(): {
  url: string | undefined;
  key: string | undefined;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return { url, key };
}
