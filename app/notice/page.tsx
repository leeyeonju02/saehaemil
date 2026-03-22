import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";
import Hero from "@/components/homepage/Hero";
import NoticeSupabaseConsoleTest from "@/components/sections/notice/NoticeSupabaseConsoleTest";
import { loadNotices } from "@/lib/notices";

export const metadata = {
  title: "공지사항 | 새해밀",
  description: "공지사항 목록",
};

/** Supabase `notices` 조회 반영을 위해 매 요청 최신 데이터 사용 */
export const dynamic = "force-dynamic";

export default async function NoticeListPage() {
  const initialNotices = await loadNotices();

  return (
    <>
      {process.env.NODE_ENV === "development" && <NoticeSupabaseConsoleTest />}
      <Hero />
      <PageHeader title="공지사항" description="새해밀 공지사항입니다." />
      <NoticeSection variant="list" initialNotices={initialNotices} />
    </>
  );
}
