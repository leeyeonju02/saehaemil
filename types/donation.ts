import type {
  DonationStatusValue,
  DonationTypeValue,
} from "@/lib/donations-constants";

export type DonationFileUrl = {
  label: string;
  url: string;
};

/** DB `donations` 행 */
export type DonationRecord = {
  id: number;
  donor_name: string;
  donation_type: DonationTypeValue | string;
  donation_title: string;
  donation_content: string;
  donation_date: string;
  beneficiary: string | null;
  benefit_content: string | null;
  status: DonationStatusValue | string;
  image_urls: string[] | null;
  file_urls: DonationFileUrl[] | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

/** 앱에서 쓰는 후원 내역 */
export type Donation = {
  id: string;
  donor_name: string;
  donation_type: DonationTypeValue | string;
  donation_title: string;
  donation_content: string;
  donation_date: string;
  beneficiary: string;
  benefit_content: string;
  status: DonationStatusValue | string;
  image_urls: string[];
  file_urls: DonationFileUrl[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
};
