import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "안전보건관리 교육 | 새해밀",
  description: "안전보건관리 교육 안내",
};

export default function NoticeSafetyHealthTrainingPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="안전보건관리 교육"
        description="안전보건관리 교육 관련 안내입니다."
      />
      <NoticeSection variant="safety-health-training" />
    </>
  );
}
