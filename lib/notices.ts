import type { Notice, NoticeRecord } from "@/types/notice";
import noticeJson from "@/data/notice.json";
// --- Supabase 재연동 시 아래 import 주석 해제 ---
// import { getSupabasePublicConfig } from "@/lib/supabase/env";
// import {
//   fetchAllNoticeIdsFromSupabase,
//   fetchNoticeByIdFromSupabase,
//   fetchNoticesFromSupabase,
// } from "@/lib/notices-supabase";
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

/** 로컬 JSON 기준 목록 (폴백) */
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

// --- Supabase 재연동 시 아래 함수 주석 해제 ---
// function hasSupabaseEnv(): boolean {
//   const { url, key } = getSupabasePublicConfig();
//   return Boolean(url && key);
// }

/**
 * 테스트 기간: 로컬 JSON만 사용합니다.
 * DB 재연동: 상단 Supabase import·hasSupabaseEnv 주석 해제 후, 각 함수에서
 * `return getNoticesFromJson();` 등을 제거하고 아래 주석 처리된 본문을 되살리세요.
 */
export async function loadNotices(): Promise<Notice[]> {
  return getNoticesFromJson();
  // if (!hasSupabaseEnv()) return getNoticesFromJson();
  // try {
  //   return await fetchNoticesFromSupabase();
  // } catch {
  //   return getNoticesFromJson();
  // }
}

export async function loadNoticeById(id: string): Promise<Notice | undefined> {
  return getNoticeByIdFromJson(id);
  // if (!hasSupabaseEnv()) return getNoticeByIdFromJson(id);
  // try {
  //   const n = await fetchNoticeByIdFromSupabase(id);
  //   if (n) return n;
  // } catch {
  //   /* fall through */
  // }
  // return getNoticeByIdFromJson(id);
}

export async function loadAllNoticeIds(): Promise<string[]> {
  return getAllNoticeIdsFromJson();
  // if (!hasSupabaseEnv()) return getAllNoticeIdsFromJson();
  // try {
  //   return await fetchAllNoticeIdsFromSupabase();
  // } catch {
  //   return getAllNoticeIdsFromJson();
  // }
}

/** @deprecated 클라이언트에서는 `initialNotices` prop 사용. 폴백·테스트용 */
export function getNotices(): Notice[] {
  return getNoticesFromJson();
}

/** @deprecated 서버에서는 loadNoticeById 사용 */
export function getNoticeById(id: string): Notice | undefined {
  return getNoticeByIdFromJson(id);
}

/** @deprecated 서버에서는 loadAllNoticeIds 사용 */
export function getAllNoticeIds(): string[] {
  return getAllNoticeIdsFromJson();
}
