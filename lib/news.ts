import type { News } from "@/types/news";

export const NEWS_TABLE = "news";

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toIsoString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return new Date(0).toISOString();
}

export function mapNewsRow(row: Record<string, unknown>): News {
  return {
    id: String(row.id ?? ""),
    url: String(row.url ?? ""),
    title: optionalString(row.title),
    description: optionalString(row.description),
    image_url: optionalString(row.image_url),
    source_name: optionalString(row.source_name),
    published_at: optionalString(row.published_at),
    is_visible: Boolean(row.is_visible ?? true),
    is_pinned: Boolean(row.is_pinned),
    sort_order: Number(row.sort_order ?? 0),
    created_at: toIsoString(row.created_at),
    updated_at: toIsoString(row.updated_at),
  };
}

/** 최신순 비교 — 날짜가 없거나 잘못된 쪽을 뒤로 */
function compareNewestFirst(a: string | null, b: string | null): number {
  const ta = a ? new Date(a).getTime() : NaN;
  const tb = b ? new Date(b).getTime() : NaN;
  const hasA = !Number.isNaN(ta);
  const hasB = !Number.isNaN(tb);
  if (hasA && hasB) return tb - ta;
  if (hasA !== hasB) return hasA ? -1 : 1;
  return 0;
}

/** 목록 정렬: 상단 고정 → 정렬 순서 큰 것 → 최신 발행일(없으면 맨 뒤) → 최근 등록 */
export function sortNewsForList(a: News, b: News): number {
  if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
  if (b.sort_order !== a.sort_order) return b.sort_order - a.sort_order;
  return (
    compareNewestFirst(a.published_at, b.published_at) ||
    compareNewestFirst(a.created_at, b.created_at)
  );
}

/** 기사 주소의 도메인 (www 제외) — 제목·언론사명이 없을 때 대신 표시 */
export function getNewsDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** 화면에 보여 줄 제목 — 비어 있으면 도메인 */
export function getNewsDisplayTitle(news: Pick<News, "title" | "url">): string {
  return news.title ?? getNewsDomain(news.url);
}

/** 한국 시간 기준 "2026.10.17" (발행일이 없으면 빈 문자열) */
export function formatNewsDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}.${get("month")}.${get("day")}`;
}

/** 최근 기사는 "3시간 전"·"2일 전", 7일이 지나면 "2026.10.17" (발행일이 없으면 빈 문자열) */
export function formatNewsRelativeDate(iso: string | null, now: Date = new Date()): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return formatNewsDate(iso);
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return formatNewsDate(iso);
}
