import { Box } from "@mui/material";
import WelfareIntroSection from "@/components/sections/business/WelfareIntroSection";
import WelfareSystemInfo from "@/components/sections/business/WelfareSystemInfo";
import WelfareServiceContent from "@/components/sections/business/WelfareServiceContent";
import WelfareUsageGuide from "@/components/sections/business/WelfareUsageGuide";
import WelfareHouseholdService from "@/components/sections/business/WelfareHouseholdService";
import WelfareServiceFeatures from "@/components/sections/business/WelfareServiceFeatures";

export const metadata = {
  title: "복지사업 | 새해밀",
  description: "새해밀 복지사업 및 장애인활동지원 서비스 안내",
};

export default function BusinessWelfarePage() {
  return (
    <>
      <Box
        component="main"
        sx={{
          minHeight: { xs: "min(28rem, 55vh)", md: "min(32rem, 50vh)" },
        }}
      >
        <WelfareIntroSection />
        <WelfareSystemInfo />
        <WelfareServiceContent />
        <WelfareUsageGuide />
        <WelfareHouseholdService />
        <WelfareServiceFeatures />
      </Box>
    </>
  );
}
