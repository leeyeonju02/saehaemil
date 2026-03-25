import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";

/** `public/images/pdfs/직장내괴롭힘교육자료.pdf` */
const WORKPLACE_BULLYING_PDF = "/images/pdfs/직장내괴롭힘교육자료.pdf";

export const metadata = {
  title: "직장내 괴롭힘 예방 | 새해밀",
  description: "직장내 괴롭힘 예방 교육 및 안내",
};

export default function NoticeWorkplaceBullyingPage() {
  return (
    <>
      <Hero />
      <PageHeader title="직장내 괴롭힘 예방" description="직장내 괴롭힘 예방 관련 안내입니다." />
      <NoticeSection
        variant="workplace-bullying"
        pdfSrc={WORKPLACE_BULLYING_PDF}
        pdfTitle="직장내 괴롭힘 교육 자료"
      />
    </>
  );
}
