import { PageHeader } from "@/components/ui";
import BoardSection from "@/components/sections/board/BoardSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "소통 게시판 | 새해밀",
  description: "소통 게시판",
};

export default function BoardPage() {
  return (
    <>
     <Hero/>
      <PageHeader title="소통 게시판" description="소통 게시판입니다." />
      <BoardSection />
    </>
  );
}
