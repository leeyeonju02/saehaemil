import { PageHeader } from "@/components/ui";
import DonationSection from "@/components/sections/donation/DonationSection";
import Hero from "@/components/homepage/Hero";
export const metadata = {
  title: "후원/기부금 실적 | 새해밀",
  description: "후원 및 기부금 실적",
};

export default function DonationRecordsPage() {
  return (
    <> <Hero />
      <PageHeader title="후원/기부금 실적" description="후원 및 기부금 사용 실적입니다." />
      <DonationSection variant="records" />
    </>
  );
}
