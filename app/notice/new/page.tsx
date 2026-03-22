import { PageHeader, PageSection } from "@/components/ui";
import NoticeNewGuard from "@/components/sections/notice/NoticeNewGuard";

export const metadata = {
  title: "공지 작성 | 새해밀",
  description: "공지사항 작성",
};

export default function NoticeNewPage() {
  return (
    <>
      <PageHeader title="공지 작성" description="새 공지사항을 등록합니다." />
      <PageSection>
        <NoticeNewGuard />
      </PageSection>
    </>
  );
}
