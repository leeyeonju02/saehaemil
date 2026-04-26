import { Box } from "@mui/material";
import Hero from "@/components/homepage/Hero";
import HomeWhatWeDo from "@/components/homepage/HomeWhatWeDo";
import HomeFoundationNews from "@/components/homepage/HomeFoundationNews";
import Gallery from "@/components/homepage/Gallery";
import PartnerSlider from "@/components/homepage/PartnerSlider";
import { loadNotices } from "@/lib/notices";
import { fetchGalleryAlbumsFromSupabase } from "@/lib/gallery-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const notices = await loadNotices();
  const galleryAlbums = await fetchGalleryAlbumsFromSupabase();

  return (
    <Box>
      <Hero />
      <HomeWhatWeDo />
      <HomeFoundationNews notices={notices} />
      <Gallery albums={galleryAlbums} />
      <PartnerSlider />
    </Box>
  );
}
