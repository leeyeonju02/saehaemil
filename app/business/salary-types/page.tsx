import Hero from "@/components/homepage/Hero";
import { PageHeader } from "@/components/ui";
import SalaryTypesSection from "@/components/sections/business/SalaryTypesSection";

export const metadata = {
  title: "급여 종류 및 내용 안내 | 새해밀",
  description: "장애인활동지원 급여 종류, 구간별 월 한도액 및 급여 내용 안내",
};

export default function BusinessSalaryTypesPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="급여 종류 및 내용 안내"
        description="장애인활동지원 급여의 종류와 내용을 안내합니다."
      />
      <SalaryTypesSection />
    </>
  );
}
