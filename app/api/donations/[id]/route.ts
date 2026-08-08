import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { verifyAdminWritePassword } from "@/lib/auth-verify-admin";
import {
  ANONYMOUS_DONOR_NAME,
  DONATION_STATUSES,
  DONATION_TYPES,
  DONATIONS_TABLE,
  type DonationStatusValue,
  type DonationTypeValue,
} from "@/lib/donations-constants";
import { mapDonationRow } from "@/lib/donations";
import type { DonationRecord } from "@/types/donation";

type Body = {
  donor_name?: string;
  is_anonymous?: boolean;
  donation_type?: string;
  donation_title?: string;
  donation_content?: string;
  donation_date?: string;
  beneficiary?: string;
  benefit_content?: string;
  status?: string;
  is_public?: boolean;
  adminPassword?: string;
};

function parseId(id: string): number | null {
  const trimmed = id.trim();
  const n = Number(trimmed);
  return Number.isFinite(n) && String(n) === trimmed ? n : null;
}

function isDonationType(v: string): v is DonationTypeValue {
  return (DONATION_TYPES as readonly string[]).includes(v);
}

function isDonationStatus(v: string): v is DonationStatusValue {
  return (DONATION_STATUSES as readonly string[]).includes(v);
}

/** 단건 조회 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params;
  const idNum = parseId(idParam);
  if (idNum == null) {
    return NextResponse.json({ error: "잘못된 후원 내역 ID입니다." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from(DONATIONS_TABLE)
    .select("*")
    .eq("id", idNum)
    .maybeSingle();

  if (error) {
    console.error("[api/donations GET id]", error);
    return NextResponse.json(
      { error: error.message || "조회에 실패했습니다." },
      { status: 500 }
    );
  }
  if (!data) {
    return NextResponse.json({ error: "후원 내역을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ item: mapDonationRow(data as DonationRecord) });
}

/** 수정 */
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params;
  const idNum = parseId(idParam);
  if (idNum == null) {
    return NextResponse.json({ error: "잘못된 후원 내역 ID입니다." }, { status: 400 });
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

  const isAnonymous = Boolean(body.is_anonymous);
  const donor_name = isAnonymous
    ? ANONYMOUS_DONOR_NAME
    : typeof body.donor_name === "string"
      ? body.donor_name.trim()
      : "";
  const donation_type =
    typeof body.donation_type === "string" ? body.donation_type.trim() : "";
  const donation_title =
    typeof body.donation_title === "string" ? body.donation_title.trim() : "";
  const donation_content =
    typeof body.donation_content === "string" ? body.donation_content.trim() : "";
  const donation_date =
    typeof body.donation_date === "string" ? body.donation_date.trim() : "";
  const beneficiary =
    typeof body.beneficiary === "string" ? body.beneficiary.trim() : "";
  const benefit_content =
    typeof body.benefit_content === "string" ? body.benefit_content.trim() : "";
  const statusRaw =
    typeof body.status === "string" ? body.status.trim() : "in_progress";
  const status = isDonationStatus(statusRaw) ? statusRaw : "in_progress";
  const is_public = body.is_public !== false;

  if (!donor_name) {
    return NextResponse.json({ error: "후원자명을 입력해 주세요." }, { status: 400 });
  }
  if (!isDonationType(donation_type)) {
    return NextResponse.json(
      { error: "후원 타입은 현금(cash) 또는 물품(goods)이어야 합니다." },
      { status: 400 }
    );
  }
  if (!donation_title) {
    return NextResponse.json({ error: "제목을 입력해 주세요." }, { status: 400 });
  }
  if (!donation_content) {
    return NextResponse.json({ error: "내용을 입력해 주세요." }, { status: 400 });
  }
  if (!donation_date) {
    return NextResponse.json({ error: "후원 날짜를 입력해 주세요." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const now = new Date().toISOString();
  const patch = {
    donor_name,
    donation_type,
    donation_title,
    donation_content,
    donation_date,
    beneficiary: beneficiary || null,
    benefit_content: benefit_content || null,
    status,
    is_public,
    updated_at: now,
  };

  const { error } = await supabase
    .from(DONATIONS_TABLE)
    .update(patch)
    .eq("id", idNum);

  if (error) {
    console.error("[api/donations PATCH]", error);
    return NextResponse.json(
      { error: error.message || "수정에 실패했습니다." },
      { status: 500 }
    );
  }

  const idStr = String(idNum);
  revalidatePath("/donation/records");
  revalidatePath(`/donation/records/${idStr}`);

  return NextResponse.json({ id: idStr });
}

/** 삭제 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params;
  const idNum = parseId(idParam);
  if (idNum == null) {
    return NextResponse.json({ error: "잘못된 후원 내역 ID입니다." }, { status: 400 });
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

  const { error } = await supabase.from(DONATIONS_TABLE).delete().eq("id", idNum);

  if (error) {
    console.error("[api/donations DELETE]", error);
    return NextResponse.json(
      { error: error.message || "삭제에 실패했습니다." },
      { status: 500 }
    );
  }

  const idStr = String(idNum);
  revalidatePath("/donation/records");
  revalidatePath(`/donation/records/${idStr}`);

  return NextResponse.json({ ok: true });
}
