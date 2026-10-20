import { PageHeader } from "@/components/ui";
import NewsSection from "@/components/sections/news/NewsSection";
import Hero from "@/components/homepage/Hero";
import { loadVisibleNews } from "@/lib/news-supabase";

export const metadata = {
  title: "뉴스 | 새해밀",
  description: "새해밀 관련 뉴스",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await loadVisibleNews();

  return (
    <>
      <Hero />
      <PageHeader title="뉴스" description="새해밀 관련 뉴스입니다." />
      <NewsSection news={news} />
    </>
  );
}
