import { describe, expect, it } from "vitest";
import { toKstDateString } from "@/lib/link-preview/date";

describe("toKstDateString", () => {
  it("한국 시간 기준 날짜로 바꾼다", () => {
    expect(toKstDateString("2026-10-17T03:00:00.000Z")).toBe("2026-10-17");
  });

  it("UTC 로는 전날이어도 한국 시간 새벽이면 다음 날짜가 된다", () => {
    // 한국 시간 2026-10-18 01:00
    expect(toKstDateString("2026-10-17T16:00:00.000Z")).toBe("2026-10-18");
  });

  it("빈 값이나 잘못된 값은 빈 문자열", () => {
    expect(toKstDateString(null)).toBe("");
    expect(toKstDateString("")).toBe("");
    expect(toKstDateString("not-a-date")).toBe("");
  });
});
