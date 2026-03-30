import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import { PageHeader } from "@/components/ui";
import VolunteerApplyDetailSection from "@/components/sections/volunteer/VolunteerApplyDetailSection";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "봉사 신청 상세 | 새해밀",
  description: "봉사 신청 상세 (관리자 전용)",
};

export default async function VolunteerApplyDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Hero />
      <PageHeader title="봉사 신청 상세" description="신청 내용 확인" />
      <VolunteerApplyDetailSection id={id} />
    </>
  );
}
