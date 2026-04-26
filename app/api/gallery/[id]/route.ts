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

function parseId(id: string): number | null {
  const trimmed = id.trim();
  const n = Number(trimmed);
  return Number.isFinite(n) && String(n) === trimmed ? n : null;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params;
  const idNum = parseId(idParam);
  if (idNum == null) {
    return NextResponse.json({ error: "잘못된 앨범 ID입니다." }, { status: 400 });
  }

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

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const activity_date =
    typeof body.activity_date === "string" ? body.activity_date.trim() : "";
  const images = Array.isArray(body.images)
    ? body.images.filter((u): u is string => typeof u === "string" && u.length > 0)
    : [];

  if (!title || !content || !activity_date) {
    return NextResponse.json(
      { error: "제목·내용·활동 날짜를 입력해 주세요." },
      { status: 400 }
    );
  }
  if (images.length === 0) {
    return NextResponse.json(
      { error: "이미지 URL이 한 장 이상 필요합니다." },
      { status: 400 }
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
  const { error } = await supabase
    .from(GALLERY_TABLE)
    .update({
      title,
      content,
      activity_date,
      images,
      updated_at: now,
    })
    .eq("id", idNum);

  if (error) {
    console.error("[api/gallery PATCH]", error);
    return NextResponse.json(
      { error: error.message || "수정에 실패했습니다." },
      { status: 500 }
    );
  }

  const idStr = String(idNum);
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${idStr}`);

  return NextResponse.json({ id: idStr });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params;
  const idNum = parseId(idParam);
  if (idNum == null) {
    return NextResponse.json({ error: "잘못된 앨범 ID입니다." }, { status: 400 });
  }

  let body: { adminPassword?: string };
  try {
    body = (await request.json()) as { adminPassword?: string };
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
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

  const { error } = await supabase.from(GALLERY_TABLE).delete().eq("id", idNum);

  if (error) {
    console.error("[api/gallery DELETE]", error);
    return NextResponse.json(
      { error: error.message || "삭제에 실패했습니다." },
      { status: 500 }
    );
  }

  const idStr = String(idNum);
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${idStr}`);

  return NextResponse.json({ ok: true });
}
