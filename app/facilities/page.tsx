import Hero from "@/components/homepage/Hero";
import FacilitiesSection from "@/components/sections/facilities/FacilitiesSection";
import { PageHeader, PageSection } from "@/components/ui";

export const metadata = {
  title: "시설/설비현황 | 새해밀",
  description: "사단법인 새해밀의 시설 및 설비 현황을 안내합니다.",
};

export default function FacilitiesPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="시설/설비현황"
        description="새해밀의 시설·설비 현황을 안내합니다."
      />
      <PageSection>
        <FacilitiesSection />
      </PageSection>
    </>
  );
}
