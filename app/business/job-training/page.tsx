import { PageHeader } from "@/components/ui";
import BusinessSection from "@/components/sections/business/BusinessSection";

export const metadata = {
  title: "활동지원사 직무 교육 | 새해밀",
  description: "활동지원사 직무 교육 안내",
};

export default function BusinessJobTrainingPage() {
  return (
    <>
      <PageHeader title="활동지원사 직무 교육" description="직무 교육 과정 안내입니다." />
      <BusinessSection title="활동지원사 직무 교육" />
    </>
  );
}
