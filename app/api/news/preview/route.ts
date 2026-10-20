import { NextResponse } from "next/server";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";
import { getLinkPreview, LinkPreviewError, type LinkPreviewErrorCode } from "@/lib/link-preview";

type Body = {
  url?: string;
  adminPassword?: string;
};

const ERROR_MESSAGES: Record<LinkPreviewErrorCode, string> = {
  INVALID_URL: "올바른 기사 링크(http/https)를 입력해 주세요.",
  BLOCKED_URL: "허용되지 않는 주소입니다.",
  TOO_MANY_REDIRECTS: "기사 주소가 너무 여러 번 이동합니다.",
  TIMEOUT: "기사 사이트 응답이 너무 느립니다. 잠시 후 다시 시도해 주세요.",
  HTTP_ERROR: "기사 페이지를 열 수 없습니다. 링크를 확인해 주세요.",
  NOT_HTML: "기사 페이지가 아닌 링크입니다.",
  FETCH_FAILED: "기사 정보를 가져오지 못했습니다. 직접 입력해 주세요.",
};

/**
 * 기사 링크 스크랩 — 기사 정보만 돌려주고 DB 에는 저장하지 않는다.
 * 관리자만 호출 가능 (누구나 쓰면 우리 서버가 외부 사이트를 대신 긁어 주는 프록시가 됨)
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  if (!verifyAdminWritePassword(body.adminPassword)) {
    return NextResponse.json(
      { error: "관리자 인증에 실패했습니다. 다시 로그인한 뒤 시도해 주세요." },
      { status: 401 }
    );
  }

  const url = typeof body.url === "string" ? body.url.trim() : "";
  if (!url) {
    return NextResponse.json({ error: ERROR_MESSAGES.INVALID_URL }, { status: 400 });
  }

  try {
    const preview = await getLinkPreview(url);
    return NextResponse.json({ preview });
  } catch (e) {
    if (e instanceof LinkPreviewError) {
      const status = e.code === "INVALID_URL" || e.code === "BLOCKED_URL" ? 400 : 422;
      return NextResponse.json({ error: ERROR_MESSAGES[e.code] }, { status });
    }
    console.error("[api/news/preview POST]", e);
    return NextResponse.json({ error: ERROR_MESSAGES.FETCH_FAILED }, { status: 500 });
  }
}
