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

function isDonationType(v: string): v is DonationTypeValue {
  return (DONATION_TYPES as readonly string[]).includes(v);
}

function isDonationStatus(v: string): v is DonationStatusValue {
  return (DONATION_STATUSES as readonly string[]).includes(v);
}

function parseDonationBody(body: Body) {
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

  return {
    donor_name,
    donation_type,
    donation_title,
    donation_content,
    donation_date,
    beneficiary,
    benefit_content,
    status,
    is_public,
  };
}

function validateRequired(fields: ReturnType<typeof parseDonationBody>): string | null {
  if (!fields.donor_name) return "후원자명을 입력해 주세요.";
  if (!isDonationType(fields.donation_type)) {
    return "후원 타입은 현금(cash) 또는 물품(goods)이어야 합니다.";
  }
  if (!fields.donation_title) return "제목을 입력해 주세요.";
  if (!fields.donation_content) return "내용을 입력해 주세요.";
  if (!fields.donation_date) return "후원 날짜를 입력해 주세요.";
  return null;
}

/** 목록 조회 — 공개 항목만 (최신 후원일 순) */
export async function GET() {
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
    .eq("is_public", true)
    .order("donation_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/donations GET]", error);
    return NextResponse.json(
      { error: error.message || "목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }

  const items = (data as DonationRecord[] | null)?.map(mapDonationRow) ?? [];
  return NextResponse.json({ items });
}

/** 신규 등록 */
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

  const fields = parseDonationBody(body);
  const validationError = validateRequired(fields);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Supabase 설정 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const now = new Date().toISOString();
  const row = {
    donor_name: fields.donor_name,
    donation_type: fields.donation_type,
    donation_title: fields.donation_title,
    donation_content: fields.donation_content,
    donation_date: fields.donation_date,
    beneficiary: fields.beneficiary || null,
    benefit_content: fields.benefit_content || null,
    status: fields.status,
    image_urls: [] as string[],
    file_urls: [] as { label: string; url: string }[],
    is_public: fields.is_public,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from(DONATIONS_TABLE)
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[api/donations POST]", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "저장에 실패했습니다. donations 테이블 스키마·RLS·service_role 키를 확인하세요.",
      },
      { status: 500 }
    );
  }

  const rawId =
    data && typeof data === "object" && "id" in data
      ? (data as { id: unknown }).id
      : null;
  const id = rawId != null ? String(rawId) : "";
  if (!id) {
    return NextResponse.json(
      { error: "저장 후 ID를 받지 못했습니다." },
      { status: 500 }
    );
  }

  revalidatePath("/donation/records");
  revalidatePath(`/donation/records/${id}`);

  return NextResponse.json({ id });
}
