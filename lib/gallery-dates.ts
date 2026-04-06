/** 활동일(날짜만) 표시 */
export function formatActivityDateLabel(isoOrYmd: string): string {
  const d = new Date(isoOrYmd.length === 10 ? `${isoOrYmd}T12:00:00` : isoOrYmd);
  if (Number.isNaN(d.getTime())) return isoOrYmd;
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

/** 등록(작성) 일시 표시 */
export function formatCreatedAtLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
