import { NextResponse } from "next/server";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";
import { fetchAllNoticesForAdmin, fetchNoticeByIdForAdmin } from "@/lib/notices-supabase";

type Body = {
  adminPassword?: string;
  /** 있으면 단건, 없으면 전체 목록 */
  id?: string;
};

/**
 * 관리자 전용 공지 조회 — 비공개(is_visible=false) 공지 포함.
 * 비밀번호가 URL·로그에 남지 않도록 POST 본문으로 받는다.
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

  try {
    const id = typeof body.id === "string" ? body.id.trim() : "";
    if (id) {
      const notice = await fetchNoticeByIdForAdmin(id);
      if (!notice) {
        return NextResponse.json({ error: "공지를 찾을 수 없습니다." }, { status: 404 });
      }
      return NextResponse.json({ notice });
    }
    const notices = await fetchAllNoticesForAdmin();
    return NextResponse.json({ notices });
  } catch (e) {
    console.error("[api/notices/admin POST]", e);
    const message = e instanceof Error ? e.message : "공지 조회에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
