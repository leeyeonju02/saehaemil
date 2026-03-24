import { PageHeader } from "@/components/ui";
import BusinessSection from "@/components/sections/business/BusinessSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "활동지원사 의무 교육 | 새해밀",
  description: "활동지원사 의무 교육 안내",
};

export default function BusinessMandatoryTrainingPage() {
  return (
    <>
    <Hero/>
      <PageHeader title="활동지원사 의무 교육" description="의무 교육 과정 안내입니다." />
      <BusinessSection title="활동지원사 의무 교육" />
    </>
  );
}
