import { DONATIONS_TABLE } from "@/lib/donations-constants";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { Donation, DonationFileUrl, DonationRecord } from "@/types/donation";

function normalizeFileUrls(raw: unknown): DonationFileUrl[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const label =
        typeof (item as { label?: unknown }).label === "string"
          ? (item as { label: string }).label.trim()
          : "";
      const url =
        typeof (item as { url?: unknown }).url === "string"
          ? (item as { url: string }).url.trim()
          : "";
      if (!label || !url) return null;
      return { label, url };
    })
    .filter((x): x is DonationFileUrl => x !== null);
}

export function mapDonationRow(row: DonationRecord): Donation {
  return {
    id: String(row.id),
    donor_name: row.donor_name ?? "",
    donation_type: row.donation_type ?? "cash",
    donation_title: row.donation_title ?? "",
    donation_content: row.donation_content ?? "",
    donation_date: row.donation_date ?? "",
    beneficiary: row.beneficiary?.trim() || "",
    benefit_content: row.benefit_content?.trim() || "",
    status: row.status ?? "in_progress",
    image_urls: Array.isArray(row.image_urls) ? row.image_urls.filter(Boolean) : [],
    file_urls: normalizeFileUrls(row.file_urls),
    is_public: Boolean(row.is_public),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function fetchPublicDonationsFromSupabase(): Promise<Donation[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from(DONATIONS_TABLE)
    .select("*")
    .eq("is_public", true)
    .order("donation_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[donations] fetchPublicDonationsFromSupabase", error);
    return [];
  }

  return ((data as DonationRecord[] | null) ?? []).map(mapDonationRow);
}

export async function fetchDonationByIdFromSupabase(
  id: string
): Promise<Donation | null> {
  const trimmed = id.trim();
  if (!/^\d+$/.test(trimmed)) return null;

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from(DONATIONS_TABLE)
    .select("*")
    .eq("id", Number(trimmed))
    .maybeSingle();

  if (error) {
    console.error("[donations] fetchDonationByIdFromSupabase", error);
    return null;
  }

  if (!data) return null;
  const row = data as DonationRecord;
  if (row.is_public !== true) return null;

  return mapDonationRow(row);
}

export async function fetchDonationNeighbors(
  id: string
): Promise<{
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}> {
  const list = await fetchPublicDonationsFromSupabase();
  const index = list.findIndex((item) => item.id === id.trim());
  if (index < 0) {
    return { prev: null, next: null };
  }

  const prevItem = list[index + 1] ?? null;
  const nextItem = list[index - 1] ?? null;

  return {
    prev: prevItem
      ? { id: prevItem.id, title: prevItem.donation_title }
      : null,
    next: nextItem
      ? { id: nextItem.id, title: nextItem.donation_title }
      : null,
  };
}
