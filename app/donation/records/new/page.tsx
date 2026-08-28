import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";
import DonationNewGuard from "@/components/sections/donation/DonationNewGuard";

export const metadata: Metadata = {
  title: "후원 내역 작성 | 새해밀",
  description: "후원/기부금 실적 작성",
  robots: { index: false, follow: false },
};

export default function DonationRecordsNewPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="후원 내역 작성"
        description="새 후원/기부금 실적을 등록합니다."
      />
      <PageSection>
        <DonationNewGuard />
      </PageSection>
    </>
  );
}
