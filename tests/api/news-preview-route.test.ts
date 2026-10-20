import { beforeEach, describe, expect, it, vi } from "vitest";
import { LinkPreviewError, type LinkPreview } from "@/lib/link-preview";

const mocks = vi.hoisted(() => ({
  getLinkPreview: vi.fn<(url: string) => Promise<LinkPreview>>(),
  verify: vi.fn((pw: string | undefined) => pw === "admin-pw"),
}));

vi.mock("@/lib/auth-verify-admin", () => ({ verifyAdminWritePassword: mocks.verify }));
vi.mock("@/lib/link-preview", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/link-preview")>()),
  getLinkPreview: mocks.getLinkPreview,
}));

import { POST } from "@/app/api/news/preview/route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/news/preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = { url: "https://news.example.com/a", adminPassword: "admin-pw" };

const preview: LinkPreview = {
  url: "https://news.example.com/a",
  title: "기사 제목",
  description: "요약",
  image_url: "https://img.example.com/a.jpg",
  source_name: "연합뉴스",
  published_at: "2026-10-17T00:00:00.000Z",
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getLinkPreview.mockResolvedValue(preview);
});

describe("POST /api/news/preview", () => {
  it("JSON 이 아니면 400", async () => {
    expect((await POST(request("{잘못된"))).status).toBe(400);
  });

  it("관리자 비밀번호가 틀리면 401 이고 기사를 가져오지 않는다", async () => {
    const res = await POST(request({ ...validBody, adminPassword: "wrong" }));
    expect(res.status).toBe(401);
    expect(mocks.getLinkPreview).not.toHaveBeenCalled();
  });

  it("링크가 비어 있으면 400", async () => {
    const res = await POST(request({ ...validBody, url: "  " }));
    expect(res.status).toBe(400);
    expect(mocks.getLinkPreview).not.toHaveBeenCalled();
  });

  it("앞뒤 공백을 지운 링크로 스크랩한 결과를 돌려준다", async () => {
    const res = await POST(request({ ...validBody, url: "  https://news.example.com/a " }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ preview });
    expect(mocks.getLinkPreview).toHaveBeenCalledWith("https://news.example.com/a");
  });

  it.each([
    ["INVALID_URL", 400],
    ["BLOCKED_URL", 400],
    ["TIMEOUT", 422],
    ["HTTP_ERROR", 422],
    ["NOT_HTML", 422],
    ["TOO_MANY_REDIRECTS", 422],
    ["FETCH_FAILED", 422],
  ] as const)("%s 실패는 %i 와 안내 문구를 돌려준다", async (code, status) => {
    mocks.getLinkPreview.mockRejectedValue(new LinkPreviewError(code));
    const res = await POST(request(validBody));
    expect(res.status).toBe(status);
    const { error } = (await res.json()) as { error: string };
    expect(error).toBeTruthy();
    expect(error).not.toBe(code);
  });

  it("예상하지 못한 오류는 500", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.getLinkPreview.mockRejectedValue(new Error("boom"));
    const res = await POST(request(validBody));
    expect(res.status).toBe(500);
  });
});
