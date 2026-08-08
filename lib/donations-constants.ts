/** Supabase `donations` 테이블명 */
export const DONATIONS_TABLE = "donations" as const;

export const DONATION_TYPES = ["cash", "goods"] as const;
export type DonationTypeValue = (typeof DONATION_TYPES)[number];

export const DONATION_STATUSES = ["in_progress", "completed"] as const;
export type DonationStatusValue = (typeof DONATION_STATUSES)[number];

export const ANONYMOUS_DONOR_NAME = "익명" as const;
