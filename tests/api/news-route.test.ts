import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const single = vi.fn();
  const select = vi.fn(() => ({ single }));
  const insert = vi.fn<(row: Record<string, unknown>) => { select: typeof select }>(() => ({ select }));
  const from = vi.fn<(table: string) => { insert: typeof insert }>(() => ({ insert }));
  return {
    single,
    insert,
    from,
    createClient: vi.fn(() => ({ from })),
    verify: vi.fn((pw: string | undefined) => pw === "admin-pw"),
    revalidatePath: vi.fn(),
  };
});

vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("@/lib/supabase/service", () => ({ createSupabaseServiceClient: mocks.createClient }));
vi.mock("@/lib/auth-verify-admin", () => ({ verifyAdminWritePassword: mocks.verify }));

import { POST } from "@/app/api/news/route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = { url: "https://news.example.com/a", adminPassword: "admin-pw" };

beforeEach(() => {
  vi.clearAllMocks();
  mocks.single.mockResolvedValue({ data: { id: 7 }, error: null });
});

describe("POST /api/news", () => {
  it("JSON 이 아니면 400", async () => {
    const res = await POST(request("{잘못된"));
    expect(res.status).toBe(400);
  });

  it.each([undefined, "", "   ", "ftp://example.com", "기사"])("url 이 %s 이면 400", async (url) => {
    const res = await POST(request({ ...validBody, url }));
    expect(res.status).toBe(400);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("관리자 비밀번호가 틀리면 401 이고 저장하지 않는다", async () => {
    const res = await POST(request({ ...validBody, adminPassword: "wrong" }));
    expect(res.status).toBe(401);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("http(s) 가 아닌 썸네일 주소는 400", async () => {
    const res = await POST(request({ ...validBody, image_url: "javascript:alert(1)" }));
    expect(res.status).toBe(400);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it.each(["2026/10/17", "20261017", "어제"])("발행일 형식이 %s 이면 400", async (published_at) => {
    const res = await POST(request({ ...validBody, published_at }));
    expect(res.status).toBe(400);
  });

  it("링크만 보내면 나머지는 null·기본값으로 저장한다", async () => {
    const res = await POST(request(validBody));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: "7" });
    expect(mocks.from).toHaveBeenCalledWith("news");
    expect(mocks.insert).toHaveBeenCalledWith({
      url: "https://news.example.com/a",
      title: null,
      description: null,
      image_url: null,
      source_name: null,
      published_at: null,
      sort_order: 0,
      is_pinned: false,
      is_visible: true,
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/news");
  });

  it("모든 값을 정리해서 저장하고, 발행일은 한국 시간 자정으로 저장한다", async () => {
    await POST(
      request({
        ...validBody,
        url: "  https://news.example.com/a  ",
        title: "  기사 제목 ",
        description: "요약",
        image_url: "https://img.example.com/a.jpg",
        source_name: "연합뉴스",
        published_at: "2026-10-17",
        sort_order: 3,
        is_pinned: true,
        is_visible: false,
      })
    );

    expect(mocks.insert).toHaveBeenCalledWith({
      url: "https://news.example.com/a",
      title: "기사 제목",
      description: "요약",
      image_url: "https://img.example.com/a.jpg",
      source_name: "연합뉴스",
      published_at: "2026-10-17T00:00:00+09:00",
      sort_order: 3,
      is_pinned: true,
      is_visible: false,
    });
  });

  it("빈 문자열 칸은 null 로, 정수가 아닌 정렬 순서는 0 으로 저장한다", async () => {
    await POST(request({ ...validBody, title: "   ", source_name: "", sort_order: 1.5 }));
    const row = mocks.insert.mock.calls[0][0];
    expect(row.title).toBeNull();
    expect(row.source_name).toBeNull();
    expect(row.sort_order).toBe(0);
  });

  it("같은 링크가 이미 있으면 409", async () => {
    mocks.single.mockResolvedValue({ data: null, error: { code: "23505", message: "duplicate key" } });
    const res = await POST(request(validBody));
    expect(res.status).toBe(409);
    expect((await res.json()).error).toBe("이미 등록된 기사 링크입니다.");
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });

  it("그 밖의 DB 오류는 500", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.single.mockResolvedValue({ data: null, error: { code: "42P01", message: "relation does not exist" } });
    const res = await POST(request(validBody));
    expect(res.status).toBe(500);
  });

  it("Supabase 설정이 없으면 500", async () => {
    mocks.createClient.mockImplementationOnce(() => {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY 누락");
    });
    const res = await POST(request(validBody));
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe("SUPABASE_SERVICE_ROLE_KEY 누락");
  });
});
