import HistorySection from "@/components/sections/history/HistorySection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "연혁 | 새해밀",
  description: "새해밀의 발자취를 소개합니다.",
};

export default function HistoryPage() {
  return (
    (<>
      <Hero/>
      <HistorySection />
    </>)
  )
}
