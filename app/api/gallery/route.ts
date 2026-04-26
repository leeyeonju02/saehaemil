import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";
import { GALLERY_TABLE } from "@/lib/gallery-constants";

type Body = {
  title?: string;
  content?: string;
  activity_date?: string;
  images?: string[];
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
  const activity_date =
    typeof body.activity_date === "string" ? body.activity_date.trim() : "";
  const images = Array.isArray(body.images)
    ? body.images.filter((u): u is string => typeof u === "string" && u.length > 0)
    : [];

  if (!title || !content) {
    return NextResponse.json(
      { error: "제목과 내용을 입력해 주세요." },
      { status: 400 }
    );
  }
  if (!activity_date) {
    return NextResponse.json(
      { error: "활동 날짜를 입력해 주세요." },
      { status: 400 }
    );
  }
  if (images.length === 0) {
    return NextResponse.json(
      { error: "이미지 URL이 필요합니다." },
      { status: 400 }
    );
  }

  if (!verifyAdminWritePassword(body.adminPassword)) {
    return NextResponse.json(
      { error: "관리자 인증에 실패했습니다. 다시 로그인한 뒤 시도해 주세요." },
      { status: 401 }
    );
  }

  console.log("[gallery-flow] 4 서버 — DB 저장 시작", {
    title,
    activity_date,
    imageCount: images.length,
  });

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const now = new Date().toISOString();
  const row = {
    title,
    content,
    activity_date,
    images,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from(GALLERY_TABLE)
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[api/gallery POST]", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "저장에 실패했습니다. gallery 테이블 스키마·RLS·service_role 키를 확인하세요.",
      },
      { status: 500 }
    );
  }

  const rawId = data && typeof data === "object" && "id" in data ? (data as { id: unknown }).id : null;
  const id = rawId != null ? String(rawId) : "";
  if (!id) {
    return NextResponse.json(
      { error: "저장 후 ID를 받지 못했습니다." },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${id}`);

  console.log("[gallery-flow] 4 서버 — DB 저장 완료", { id });

  return NextResponse.json({ id });
}
