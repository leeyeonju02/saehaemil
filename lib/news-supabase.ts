import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapNewsRow, NEWS_TABLE, sortNewsForList } from "@/lib/news";
import type { News } from "@/types/news";

/** 공개 뉴스 목록 (RLS 로 is_visible = true 만 조회됨). 실패하면 빈 목록 */
export async function loadVisibleNews(): Promise<News[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from(NEWS_TABLE).select("*");
    if (error) throw error;
    const rows = (data ?? []) as Record<string, unknown>[];
    return rows.map(mapNewsRow).filter((n) => n.is_visible).sort(sortNewsForList);
  } catch (e) {
    console.error("[news] 목록을 불러오지 못했습니다.", e);
    return [];
  }
}

/** 홈 화면용 — 발행일 최신순(없으면 등록일순) 공개 뉴스 limit 개. 실패하면 빈 목록 */
export async function loadLatestNews(limit = 5): Promise<News[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(NEWS_TABLE)
      .select("*")
      .eq("is_visible", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return ((data ?? []) as Record<string, unknown>[]).map(mapNewsRow);
  } catch (e) {
    console.error("[news] 최신 뉴스를 불러오지 못했습니다.", e);
    return [];
  }
}
