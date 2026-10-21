import { Box } from "@mui/material";
import Hero from "@/components/homepage/Hero";
import HomeWhatWeDo from "@/components/homepage/HomeWhatWeDo";
import HomeFoundationNews from "@/components/homepage/HomeFoundationNews";
import HomeNews from "@/components/homepage/HomeNews";
import Gallery from "@/components/homepage/Gallery";
import PartnerSlider from "@/components/homepage/PartnerSlider";
import { loadNotices } from "@/lib/notices";
import { fetchGalleryAlbumsFromSupabase } from "@/lib/gallery-db";
import { loadLatestNews } from "@/lib/news-supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const notices = await loadNotices();
  const galleryAlbums = await fetchGalleryAlbumsFromSupabase();
  const latestNews = await loadLatestNews(5);

  return (
    // 한글이 글자 단위로 끊기지 않도록 어절 단위 줄바꿈 (긴 URL 등은 넘치지 않게 강제 줄바꿈)
    <Box sx={{ wordBreak: "keep-all", overflowWrap: "break-word" }}>
      <Hero />
      <HomeWhatWeDo />
      <HomeFoundationNews notices={notices} />
      <HomeNews news={latestNews} />
      <Gallery albums={galleryAlbums} />
      <PartnerSlider />
    </Box>
  );
}
