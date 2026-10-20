import { describe, expect, it } from "vitest";
import { paginate, parsePageParam } from "@/lib/pagination";

describe("parsePageParam", () => {
  it("1 이상의 정수 문자열을 숫자로 변환한다", () => {
    expect(parsePageParam("3")).toBe(3);
  });

  it("배열이면 첫 번째 값을 쓴다", () => {
    expect(parsePageParam(["2", "5"])).toBe(2);
  });

  it.each([undefined, "", "0", "-1", "1.5", "abc"])("잘못된 값(%s)이면 1", (value) => {
    expect(parsePageParam(value)).toBe(1);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  it("페이지 크기만큼 잘라서 반환한다", () => {
    expect(paginate(items, 1, 9)).toEqual({ items: [1, 2, 3, 4, 5, 6, 7, 8, 9], page: 1, totalPages: 3 });
    expect(paginate(items, 3, 9)).toEqual({ items: [19, 20], page: 3, totalPages: 3 });
  });

  it("범위를 벗어난 페이지는 마지막/첫 페이지로 보정한다", () => {
    expect(paginate(items, 99, 9).page).toBe(3);
    expect(paginate(items, 0, 9).page).toBe(1);
  });

  it("항목이 없어도 totalPages 는 1", () => {
    expect(paginate([], 1, 9)).toEqual({ items: [], page: 1, totalPages: 1 });
  });
});
