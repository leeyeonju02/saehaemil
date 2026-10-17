import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";

type Body = {
  url?: string;
  title?: string;
  description?: string;
  image_url?: string;
  source_name?: string;
  /** YYYY-MM-DD */
  published_at?: string;
  sort_order?: number;
  is_pinned?: boolean;
  /** false 면 비공개 (관리자만 조회) */
  is_visible?: boolean;
  adminPassword?: string;
};

/** http(s) 주소만 허용 — 정규화된 문자열 반환, 아니면 null */
function normalizeHttpUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** 문자열이면 trim, 비어 있으면 null */
function optionalText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const rawUrl = typeof body.url === "string" ? body.url.trim() : "";
  const url = rawUrl ? normalizeHttpUrl(rawUrl) : null;
  if (!url) {
    return NextResponse.json(
      { error: "올바른 기사 링크(http/https)를 입력해 주세요." },
      { status: 400 }
    );
  }

  const rawImageUrl = optionalText(body.image_url);
  const image_url = rawImageUrl ? normalizeHttpUrl(rawImageUrl) : null;
  if (rawImageUrl && !image_url) {
    return NextResponse.json(
      { error: "썸네일 이미지 주소는 http/https 주소여야 합니다." },
      { status: 400 }
    );
  }

  const rawPublishedAt = optionalText(body.published_at);
  if (rawPublishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(rawPublishedAt)) {
    return NextResponse.json({ error: "기사 발행일 형식이 올바르지 않습니다." }, { status: 400 });
  }
  /** 날짜만 입력받으므로 한국 시간 자정으로 저장 */
  const published_at = rawPublishedAt ? `${rawPublishedAt}T00:00:00+09:00` : null;

  const sort_order =
    typeof body.sort_order === "number" && Number.isInteger(body.sort_order)
      ? body.sort_order
      : 0;

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

  const { data, error } = await supabase
    .from("news")
    .insert({
      url,
      title: optionalText(body.title),
      description: optionalText(body.description),
      image_url,
      source_name: optionalText(body.source_name),
      published_at,
      sort_order,
      is_pinned: Boolean(body.is_pinned),
      is_visible: body.is_visible !== false,
    })
    .select("id")
    .single();

  if (error) {
    // 23505: unique 위반 — 같은 기사 링크가 이미 등록됨
    if (error.code === "23505") {
      return NextResponse.json({ error: "이미 등록된 기사 링크입니다." }, { status: 409 });
    }
    console.error("[api/news POST]", error);
    return NextResponse.json(
      { error: error.message || "저장에 실패했습니다." },
      { status: 500 }
    );
  }

  revalidatePath("/news");

  return NextResponse.json({ id: String((data as { id: unknown }).id) });
}
