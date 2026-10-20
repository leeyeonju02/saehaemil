import { describe, expect, it } from "vitest";
import {
  formatNewsDate,
  formatNewsRelativeDate,
  getNewsDisplayTitle,
  getNewsDomain,
  mapNewsRow,
  sortNewsForList,
} from "@/lib/news";
import type { News } from "@/types/news";

function news(overrides: Partial<News>): News {
  return {
    id: "1",
    url: "https://www.example.com/a",
    title: null,
    description: null,
    image_url: null,
    source_name: null,
    published_at: null,
    is_visible: true,
    is_pinned: false,
    sort_order: 0,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("mapNewsRow", () => {
  it("DB 행을 정규화한다 (id 는 문자열, 빈 문자열은 null)", () => {
    expect(
      mapNewsRow({
        id: 3,
        url: "https://a.com",
        title: "  ",
        description: "요약",
        image_url: null,
        source_name: "연합뉴스",
        published_at: "2026-10-17T00:00:00+00:00",
        is_visible: true,
        is_pinned: true,
        sort_order: 2,
        created_at: "2026-10-18T00:00:00+00:00",
        updated_at: "2026-10-18T00:00:00+00:00",
      })
    ).toEqual({
      id: "3",
      url: "https://a.com",
      title: null,
      description: "요약",
      image_url: null,
      source_name: "연합뉴스",
      published_at: "2026-10-17T00:00:00+00:00",
      is_visible: true,
      is_pinned: true,
      sort_order: 2,
      created_at: "2026-10-18T00:00:00+00:00",
      updated_at: "2026-10-18T00:00:00+00:00",
    });
  });
});

describe("sortNewsForList", () => {
  const ids = (list: News[]) => [...list].sort(sortNewsForList).map((n) => n.id);

  it("상단 고정 → 정렬 순서 → 최신 발행일 순", () => {
    expect(
      ids([
        news({ id: "old", published_at: "2026-01-01T00:00:00Z" }),
        news({ id: "new", published_at: "2026-10-01T00:00:00Z" }),
        news({ id: "order", sort_order: 5, published_at: "2025-01-01T00:00:00Z" }),
        news({ id: "pinned", is_pinned: true, published_at: "2024-01-01T00:00:00Z" }),
      ])
    ).toEqual(["pinned", "order", "new", "old"]);
  });

  it("발행일이 없는 기사는 뒤로, 그 안에서는 최근 등록순", () => {
    expect(
      ids([
        news({ id: "no-date-old", created_at: "2026-01-01T00:00:00Z" }),
        news({ id: "dated", published_at: "2020-01-01T00:00:00Z" }),
        news({ id: "no-date-new", created_at: "2026-05-01T00:00:00Z" }),
      ])
    ).toEqual(["dated", "no-date-new", "no-date-old"]);
  });
});

describe("표시용 값", () => {
  it("제목이 없으면 www 를 뺀 도메인을 제목으로 쓴다", () => {
    expect(getNewsDisplayTitle({ title: null, url: "https://www.yna.co.kr/view/1" })).toBe("yna.co.kr");
    expect(getNewsDisplayTitle({ title: "기사", url: "https://www.yna.co.kr/view/1" })).toBe("기사");
  });

  it("잘못된 주소면 주소 문자열 그대로", () => {
    expect(getNewsDomain("주소아님")).toBe("주소아님");
  });

  it("발행일은 한국 시간 기준 YYYY.MM.DD", () => {
    expect(formatNewsDate("2026-10-17T16:00:00Z")).toBe("2026.10.18");
    expect(formatNewsDate("2026-10-17T00:00:00+09:00")).toBe("2026.10.17");
    expect(formatNewsDate(null)).toBe("");
    expect(formatNewsDate("잘못된 날짜")).toBe("");
  });
});

describe("formatNewsRelativeDate", () => {
  const now = new Date("2026-10-20T12:00:00Z");

  it("7일 이내는 상대 시간", () => {
    expect(formatNewsRelativeDate("2026-10-20T11:59:40Z", now)).toBe("방금 전");
    expect(formatNewsRelativeDate("2026-10-20T11:15:00Z", now)).toBe("45분 전");
    expect(formatNewsRelativeDate("2026-10-20T09:00:00Z", now)).toBe("3시간 전");
    expect(formatNewsRelativeDate("2026-10-18T12:00:00Z", now)).toBe("2일 전");
  });

  it("7일이 지났거나 미래 날짜면 YYYY.MM.DD", () => {
    expect(formatNewsRelativeDate("2026-10-13T12:00:00Z", now)).toBe("2026.10.13");
    expect(formatNewsRelativeDate("2026-10-25T00:00:00Z", now)).toBe("2026.10.25");
  });

  it("빈 값·잘못된 값은 빈 문자열", () => {
    expect(formatNewsRelativeDate(null, now)).toBe("");
    expect(formatNewsRelativeDate("x", now)).toBe("");
  });
});
