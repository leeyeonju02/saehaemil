/** 뉴스 UI 공통 스타일 — 요즘 매거진형 레이아웃 + 신문 지면 포인트(이중 괘선·제호) */
export const NEWS_ACCENT = "#1B5E20";
/** 지면 잉크색 · 괘선 */
export const NEWS_INK = "#1a1a1a";
export const NEWS_RULE = "rgba(0, 0, 0, 0.12)";

/** 오늘 날짜 (한국 시간) — "2026년 10월 20일 화요일" */
export function formatTodayKst(): string {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());
}

/** n줄 말줄임 */
export const clampLines = (lines: number) =>
  ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }) as const;

/** 링크에 마우스를 올리면 사진이 살짝 커지고 제목 색이 바뀐다 */
export const newsHoverSx = {
  "& img": { transition: "transform 0.4s ease" },
  "&:hover img, &:focus-visible img": { transform: "scale(1.04)" },
  "& .news-title": { transition: "color 0.2s" },
  "&:hover .news-title, &:focus-visible .news-title": { color: NEWS_ACCENT },
} as const;

/** 기사 원문 새 탭 링크 공통 속성 */
export function articleLinkProps(url: string, title: string) {
  return {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": `${title} (새 탭에서 기사 열기)`,
  };
}
