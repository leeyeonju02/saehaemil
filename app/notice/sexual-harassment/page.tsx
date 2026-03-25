import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";
export const metadata = {
  title: "성희롱 예방 | 새해밀",
  description: "성희롱 예방 교육 및 안내",
};

export default function NoticeSexualHarassmentPage() {
  return (
    <>
     <Hero/>
      <PageHeader title="성희롱 예방" description="성희롱 예방 관련 안내입니다." />
      <NoticeSection variant="sexual-harassment" />
    </>
  );
}
