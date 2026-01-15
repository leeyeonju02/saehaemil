import { Box } from "@mui/material";
import Hero from "@/components/homepage/Hero";
import Gallery from "@/components/homepage/Gallery";
import PartnerSlider from "@/components/homepage/PartnerSlider";

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <Gallery />
      <PartnerSlider />
    </Box>
  );
}
