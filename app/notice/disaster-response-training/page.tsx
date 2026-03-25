import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "재난대응 교육 | 새해밀",
  description: "재난대응 교육 안내",
};

export default function NoticeDisasterResponseTrainingPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="재난대응 교육"
        description="재난대응 교육 관련 안내입니다."
      />
      <NoticeSection variant="disaster-response-training" />
    </>
  );
}
