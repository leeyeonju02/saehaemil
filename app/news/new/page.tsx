import type { Metadata } from "next";
import { PageHeader, PageSection } from "@/components/ui";
import NewsNewGuard from "@/components/sections/news/NewsNewGuard";

export const metadata: Metadata = {
  title: "뉴스 등록 | 새해밀",
  description: "뉴스 기사 등록",
  robots: { index: false, follow: false },
};

export default function NewsNewPage() {
  return (
    <>
      <PageHeader title="뉴스 등록" description="기사 링크를 붙여 넣어 뉴스를 등록합니다." />
      <PageSection>
        <NewsNewGuard />
      </PageSection>
    </>
  );
}
