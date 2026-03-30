import { PageHeader } from "@/components/ui";
import VolunteerApplySection from "@/components/sections/volunteer/VolunteerApplySection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "봉사 신청 | 새해밀",
  description: "자원봉사 신청",
};

export default function VolunteerApplyPage() {
  return (
    <>
     <Hero />
      <PageHeader title="봉사 신청" />
      <VolunteerApplySection />
    </>
  );
}
