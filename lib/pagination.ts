/** 목록 페이지네이션 공통 유틸 — URL 의 ?page=N 기준 (1부터 시작) */

export type Paginated<T> = {
  items: T[];
  /** 범위를 벗어난 값은 1 ~ totalPages 로 보정된 현재 페이지 */
  page: number;
  /** 항목이 없어도 최소 1 */
  totalPages: number;
};

/** searchParams 의 page 값을 1 이상의 정수로 변환. 잘못된 값이면 1 */
export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (current - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: current, totalPages };
}
