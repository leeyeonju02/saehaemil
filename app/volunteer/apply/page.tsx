import { PageHeader } from "@/components/ui";
import VolunteerApplySection from "@/components/sections/volunteer/VolunteerApplySection";

export const metadata = {
  title: "봉사 신청 | 새해밀",
  description: "자원봉사 신청",
};

export default function VolunteerApplyPage() {
  return (
    <>
      <PageHeader title="봉사 신청" description="봉사 신청 페이지입니다." />
      <VolunteerApplySection />
    </>
  );
}
