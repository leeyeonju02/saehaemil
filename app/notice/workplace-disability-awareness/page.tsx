import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "직장 내 장애인 인식개선 | 새해밀",
  description: "직장 내 장애인 인식개선 교육 안내",
};

export default function NoticeWorkplaceDisabilityAwarenessPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="직장 내 장애인 인식개선"
        description="직장 내 장애인 인식개선 교육 관련 안내입니다."
      />
      <NoticeSection variant="workplace-disability-awareness" />
    </>
  );
}
