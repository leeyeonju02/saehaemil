import { PageHeader } from "@/components/ui";
import DonationSection from "@/components/sections/donation/DonationSection";
import DonationAddRecordButton from "@/components/sections/donation/DonationAddRecordButton";
import Hero from "@/components/homepage/Hero";
import { fetchPublicDonationsFromSupabase } from "@/lib/donations";

export const metadata = {
  title: "후원/기부금 실적 | 새해밀",
  description: "후원 및 기부금 실적",
};

export const dynamic = "force-dynamic";

export default async function DonationRecordsPage() {
  const donations = await fetchPublicDonationsFromSupabase();

  return (
    <>
      <Hero />
      <PageHeader
        title="후원/기부금 실적"
        description="후원 및 기부금 사용 실적입니다."
        action={<DonationAddRecordButton />}
      />
      <DonationSection variant="records" donations={donations} />
    </>
  );
}
