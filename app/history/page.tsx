import { PageHeader } from "@/components/ui";
import HistorySection from "@/components/sections/history/HistorySection";

export const metadata = {
  title: "연혁 | 새해밀",
  description: "새해밀 장애인 활동 지원 센터 연혁",
};

export default function HistoryPage() {
  return (
    <>
      <PageHeader title="연혁" />
      <HistorySection />
    </>
  );
}
