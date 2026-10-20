// 클라이언트(폼)에서도 쓰므로 서버 전용 코드를 import 하지 않는다
/** ISO 문자열을 한국 시간 기준 YYYY-MM-DD 로 (date input 용 — UTC 로 자르면 새벽 기사가 전날로 밀림) */
export function toKstDateString(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
