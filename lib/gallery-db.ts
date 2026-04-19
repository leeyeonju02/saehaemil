import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import { GALLERY_TABLE } from "@/lib/gallery-constants";
import type { GalleryAlbum } from "@/lib/gallery-albums";

type GalleryRow = {
  id: number;
  created_at: string;
  updated_at: string | null;
  title: string | null;
  content: string | null;
  activity_date: string | null;
  images: string[] | null;
};

function mapRowToAlbum(row: GalleryRow): GalleryAlbum {
  const urls = row.images ?? [];
  const title = row.title ?? "";
  return {
    id: String(row.id),
    title,
    content: row.content ?? "",
    createdAt: row.created_at,
    activityDate: row.activity_date ?? row.created_at.slice(0, 10),
    images: urls.map((src) => ({ src, alt: title || "사진" })),
  };
}

/** anon URL/키만 있어도 목록 조회 시도 — service role은 별도 env */
function hasSupabaseConfig(): boolean {
  const { url, key } = getSupabasePublicConfig();
  return Boolean(url && key);
}

function getGalleryReadClient() {
  try {
    return createSupabaseServiceClient();
  } catch {
    return null;
  }
}

/** 숫자 id(문자열)인 DB 갤러리 단건 — 서버 전용 service role (RLS 영향 최소화) */
export async function fetchGalleryAlbumByIdFromSupabase(
  id: string
): Promise<GalleryAlbum | undefined> {
  if (!/^\d+$/.test(id)) return undefined;
  const supabase = getGalleryReadClient();
  if (!supabase) return undefined;
  try {
    const { data, error } = await supabase
      .from(GALLERY_TABLE)
      .select("*")
      .eq("id", Number(id))
      .maybeSingle();
    if (error) {
      console.error("[gallery-db] fetchGalleryAlbumByIdFromSupabase", error);
      return undefined;
    }
    if (!data) return undefined;
    return mapRowToAlbum(data as GalleryRow);
  } catch (e) {
    console.error("[gallery-db] fetchGalleryAlbumByIdFromSupabase", e);
    return undefined;
  }
}

/** `gallery` 테이블 전체 목록 — 등록일 최신순 */
export async function fetchGalleryAlbumsFromSupabase(): Promise<GalleryAlbum[]> {
  if (!hasSupabaseConfig()) return [];
  const supabase = getGalleryReadClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from(GALLERY_TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[gallery-db] fetchGalleryAlbumsFromSupabase", error);
      return [];
    }
    if (!data?.length) return [];
    return (data as GalleryRow[]).map(mapRowToAlbum);
  } catch (e) {
    console.error("[gallery-db] fetchGalleryAlbumsFromSupabase", e);
    return [];
  }
}
