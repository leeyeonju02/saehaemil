import type { Notice, NoticeRecord } from "@/types/notice";
import noticeJson from "@/data/notice.json";

const DEFAULT_AUTHOR = "관리자";

function normalize(records: NoticeRecord[]): Notice[] {
  return records.map((r) => ({
    id: String(r.id),
    title: r.title,
    content: r.content,
    image_urls: r.image_urls ?? [],
    author: r.author?.trim() || DEFAULT_AUTHOR,
    created_at: r.created_at,
    updated_at: r.updated_at,
    is_visible: r.is_visible,
    is_pinned: r.is_pinned,
    sort_order: r.sort_order,
  }));
}

const allNotices = normalize(noticeJson as NoticeRecord[]);

function sortForList(a: Notice, b: Notice): number {
  if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
  if (b.sort_order !== a.sort_order) return b.sort_order - a.sort_order;
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

/** 공개 목록 (노출 공지만) */
export function getNotices(): Notice[] {
  return allNotices
    .filter((n) => n.is_visible)
    .sort(sortForList);
}

/** 상세 — 공개 공지만 조회 (비공개는 404) */
export function getNoticeById(id: string): Notice | undefined {
  const n = allNotices.find((x) => x.id === id);
  if (!n || !n.is_visible) return undefined;
  return n;
}

export function getAllNoticeIds(): string[] {
  return allNotices.filter((n) => n.is_visible).map((n) => n.id);
}
