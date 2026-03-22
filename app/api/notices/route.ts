import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";
import { NOTICES_TABLE } from "@/lib/notices-constants";

type Body = {
  title?: string;
  content?: string;
  is_pinned?: boolean;
  image_urls?: string[];
  adminPassword?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const is_pinned = Boolean(body.is_pinned);
  const image_urls = Array.isArray(body.image_urls)
    ? body.image_urls.filter((u): u is string => typeof u === "string" && u.length > 0)
    : [];

  if (!title || !content) {
    return NextResponse.json(
      { error: "제목과 내용을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (!verifyAdminWritePassword(body.adminPassword)) {
    return NextResponse.json(
      { error: "관리자 인증에 실패했습니다. 다시 로그인한 뒤 시도해 주세요." },
      { status: 401 }
    );
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const now = new Date().toISOString();
  /** `author` 컬럼이 없는 스키마 호환 — 작성자 표시는 `DEFAULT_NOTICE_AUTHOR`(새해밀)로 mapRow 처리 */
  const row = {
    title,
    content,
    image_urls,
    is_visible: true,
    is_pinned,
    sort_order: 0,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from(NOTICES_TABLE)
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[api/notices POST]", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "저장에 실패했습니다. 테이블 스키마·RLS·서비스 롤 키를 확인하세요.",
      },
      { status: 500 }
    );
  }

  const id = data && typeof data === "object" && "id" in data ? String((data as { id: unknown }).id) : "";
  if (!id) {
    return NextResponse.json(
      { error: "저장 후 ID 를 받지 못했습니다." },
      { status: 500 }
    );
  }

  revalidatePath("/notice");
  revalidatePath(`/notice/${id}`);

  return NextResponse.json({ id });
}
