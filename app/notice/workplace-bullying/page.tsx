import { PageHeader } from "@/components/ui";
import NoticeSection from "@/components/sections/notice/NoticeSection";

export const metadata = {
  title: "직장내 괴롭힘 예방 | 새해밀",
  description: "직장내 괴롭힘 예방 교육 및 안내",
};

export default function NoticeWorkplaceBullyingPage() {
  return (
    <>
      <PageHeader title="직장내 괴롭힘 예방" description="직장내 괴롭힘 예방 관련 안내입니다." />
      <NoticeSection variant="workplace-bullying" />
    </>
  );
}
