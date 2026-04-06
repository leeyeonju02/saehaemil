import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Notice } from "@/types/notice";
import { DEFAULT_NOTICE_AUTHOR, NOTICES_TABLE } from "@/lib/notices-constants";

function toIsoString(value: unknown): string {
  if (value == null) return new Date().toISOString();
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function mapRow(row: Record<string, unknown>): Notice {
  const imageRaw = row.image_urls;
  let image_urls: string[] = [];
  if (Array.isArray(imageRaw)) {
    image_urls = imageRaw.filter((x): x is string => typeof x === "string");
  } else if (typeof imageRaw === "string") {
    try {
      const parsed = JSON.parse(imageRaw) as unknown;
      if (Array.isArray(parsed)) {
        image_urls = parsed.filter((x): x is string => typeof x === "string");
      }
    } catch {
      /* ignore */
    }
  }

  const attRaw = row.attachments;
  let attachments: { label: string; url: string }[] = [];
  if (Array.isArray(attRaw)) {
    attachments = attRaw
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const o = item as Record<string, unknown>;
        const label = typeof o.label === "string" ? o.label : "";
        const url = typeof o.url === "string" ? o.url : "";
        if (!label || !url) return null;
        return { label, url };
      })
      .filter((x): x is { label: string; url: string } => x !== null);
  } else if (typeof attRaw === "string") {
    try {
      const parsed = JSON.parse(attRaw) as unknown;
      if (Array.isArray(parsed)) {
        attachments = parsed
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const o = item as Record<string, unknown>;
            const label = typeof o.label === "string" ? o.label : "";
            const url = typeof o.url === "string" ? o.url : "";
            if (!label || !url) return null;
            return { label, url };
          })
          .filter((x): x is { label: string; url: string } => x !== null);
      }
    } catch {
      /* ignore */
    }
  }

  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    content: String(row.content ?? ""),
    image_urls,
    attachments,
    author:
      typeof row.author === "string" && row.author.trim()
        ? row.author.trim()
        : DEFAULT_NOTICE_AUTHOR,
    created_at: toIsoString(row.created_at),
    updated_at: toIsoString(row.updated_at),
    is_visible: Boolean(row.is_visible ?? true),
    is_pinned: Boolean(row.is_pinned),
    sort_order: Number(row.sort_order ?? 0),
  };
}

function sortForList(a: Notice, b: Notice): number {
  if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
  if (b.sort_order !== a.sort_order) return b.sort_order - a.sort_order;
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export async function fetchNoticesFromSupabase(): Promise<Notice[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from(NOTICES_TABLE).select("*");
  if (error) throw error;
  const rows = (data ?? []) as Record<string, unknown>[];
  return rows.map(mapRow).filter((n) => n.is_visible).sort(sortForList);
}

export async function fetchNoticeByIdFromSupabase(
  id: string
): Promise<Notice | undefined> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(NOTICES_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  const notice = mapRow(data as Record<string, unknown>);
  if (!notice.is_visible) return undefined;
  return notice;
}

export async function fetchAllNoticeIdsFromSupabase(): Promise<string[]> {
  const list = await fetchNoticesFromSupabase();
  return list.map((n) => n.id);
}
