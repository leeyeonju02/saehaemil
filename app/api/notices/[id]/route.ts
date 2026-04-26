import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";
import { NOTICES_TABLE } from "@/lib/notices-constants";

type FileUrlItem = { label?: string; url?: string };

type Body = {
  title?: string;
  content?: string;
  is_pinned?: boolean;
  image_urls?: string[];
  file_urls?: FileUrlItem[];
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
    return NextResponse.json({ error: "잘못된 공지 ID입니다." }, { status: 400 });
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
  if (!title || !content) {
    return NextResponse.json(
      { error: "제목과 내용을 입력해 주세요." },
      { status: 400 }
    );
  }

  const is_pinned = Boolean(body.is_pinned);
  const image_urls = Array.isArray(body.image_urls)
    ? body.image_urls.filter((u): u is string => typeof u === "string" && u.length > 0)
    : undefined;
  const file_urls = Array.isArray(body.file_urls)
    ? body.file_urls
        .map((item) => {
          const label = typeof item?.label === "string" ? item.label.trim() : "";
          const url = typeof item?.url === "string" ? item.url.trim() : "";
          if (!label || !url) return null;
          return { label, url };
        })
        .filter((x): x is { label: string; url: string } => x !== null)
    : undefined;

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const now = new Date().toISOString();
  const patch: Record<string, unknown> = {
    title,
    content,
    is_pinned,
    updated_at: now,
  };
  if (image_urls !== undefined) {
    patch.image_urls = image_urls;
  }
  if (file_urls !== undefined) {
    patch.file_urls = file_urls;
  }

  const { error } = await supabase.from(NOTICES_TABLE).update(patch).eq("id", idNum);

  if (error) {
    console.error("[api/notices PATCH]", error);
    return NextResponse.json(
      { error: error.message || "수정에 실패했습니다." },
      { status: 500 }
    );
  }

  const idStr = String(idNum);
  revalidatePath("/");
  revalidatePath("/notice");
  revalidatePath(`/notice/${idStr}`);

  return NextResponse.json({ id: idStr });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params;
  const idNum = parseId(idParam);
  if (idNum == null) {
    return NextResponse.json({ error: "잘못된 공지 ID입니다." }, { status: 400 });
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

  const now = new Date().toISOString();
  const { error } = await supabase
    .from(NOTICES_TABLE)
    .update({ is_visible: false, updated_at: now })
    .eq("id", idNum);

  if (error) {
    console.error("[api/notices DELETE]", error);
    return NextResponse.json(
      { error: error.message || "삭제에 실패했습니다." },
      { status: 500 }
    );
  }

  const idStr = String(idNum);
  revalidatePath("/");
  revalidatePath("/notice");
  revalidatePath(`/notice/${idStr}`);

  return NextResponse.json({ ok: true });
}
