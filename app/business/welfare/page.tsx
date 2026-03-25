import { Box } from "@mui/material";
import { PageHeader } from "@/components/ui";
import BusinessSection from "@/components/sections/business/BusinessSection";
import Hero from "@/components/homepage/Hero";
export const metadata = {
  title: "복지사업 | 새해밀",
  description: "복지사업 안내",
};

export default function BusinessWelfarePage() {
  return (
    <>
      <Hero />
      <Box
        component="main"
        sx={{
          minHeight: { xs: "min(28rem, 55vh)", md: "min(32rem, 50vh)" },
        }}
      >
        <PageHeader title="복지사업" description="복지사업 안내입니다." />
        <BusinessSection title="복지사업" />
      </Box>
    </>
  );
}
