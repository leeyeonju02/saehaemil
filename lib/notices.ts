import type { Notice, NoticeRecord } from "@/types/notice";
import noticeJson from "@/data/notice.json";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import {
  fetchAllNoticeIdsFromSupabase,
  fetchNoticeByIdFromSupabase,
  fetchNoticesFromSupabase,
} from "@/lib/notices-supabase";
import { DEFAULT_NOTICE_AUTHOR } from "@/lib/notices-constants";

function normalize(records: NoticeRecord[]): Notice[] {
  return records.map((r) => ({
    id: String(r.id),
    title: r.title,
    content: r.content,
    image_urls: r.image_urls ?? [],
    attachments: Array.isArray(r.attachments) ? r.attachments : [],
    author: r.author?.trim() || DEFAULT_NOTICE_AUTHOR,
    created_at: r.created_at,
    updated_at: r.updated_at,
    is_visible: r.is_visible,
    is_pinned: r.is_pinned,
    sort_order: r.sort_order,
  }));
}

const allNoticesJson = normalize(noticeJson as NoticeRecord[]);

function sortForList(a: Notice, b: Notice): number {
  if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
  if (b.sort_order !== a.sort_order) return b.sort_order - a.sort_order;
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function getNoticesFromJson(): Notice[] {
  return allNoticesJson.filter((n) => n.is_visible).sort(sortForList);
}

export function getNoticeByIdFromJson(id: string): Notice | undefined {
  const n = allNoticesJson.find((x) => x.id === id);
  if (!n || !n.is_visible) return undefined;
  return n;
}

export function getAllNoticeIdsFromJson(): string[] {
  return allNoticesJson.filter((n) => n.is_visible).map((n) => n.id);
}

function hasSupabaseEnv(): boolean {
  const { url, key } = getSupabasePublicConfig();
  return Boolean(url && key);
}

export async function loadNotices(): Promise<Notice[]> {
  if (!hasSupabaseEnv()) return getNoticesFromJson();
  try {
    return await fetchNoticesFromSupabase();
  } catch {
    return getNoticesFromJson();
  }
}

export async function loadNoticeById(id: string): Promise<Notice | undefined> {
  if (!hasSupabaseEnv()) return getNoticeByIdFromJson(id);
  try {
    const n = await fetchNoticeByIdFromSupabase(id);
    if (n) return n;
  } catch {}
  return getNoticeByIdFromJson(id);
}

export async function loadAllNoticeIds(): Promise<string[]> {
  if (!hasSupabaseEnv()) return getAllNoticeIdsFromJson();
  try {
    return await fetchAllNoticeIdsFromSupabase();
  } catch {
    return getAllNoticeIdsFromJson();
  }
}

export function getNotices(): Notice[] {
  return getNoticesFromJson();
}

export function getNoticeById(id: string): Notice | undefined {
  return getNoticeByIdFromJson(id);
}

export function getAllNoticeIds(): string[] {
  return getAllNoticeIdsFromJson();
}
