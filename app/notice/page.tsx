import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "공지사항 | 새해밀",
  description: "공지사항 목록",
};

export default function NoticeListPage() {
  return (
    <>
      <Hero />
      <PageHeader title="공지사항" description="새해밀 공지사항입니다." />
      <NoticeSection variant="list" />
    </>
  );
}
