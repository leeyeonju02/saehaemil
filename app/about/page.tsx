import { PageHeader } from "@/components/ui";
import AboutSection from "@/components/sections/about/AboutSection";

export const metadata = {
  title: "회사 소개 | 새해밀",
  description: "새해밀 장애인 활동 지원 센터 소개",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="회사 소개" description="새해밀 장애인 활동 지원 센터를 소개합니다." />
      <AboutSection />
    </>
  );
}
