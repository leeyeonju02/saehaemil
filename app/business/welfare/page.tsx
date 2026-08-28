import { Box } from "@mui/material";
import Welfare from "@/components/sections/business/Welfare";

export const metadata = {
  title: "복지사업 | 새해밀",
  description: "새해밀 복지사업 및 장애인활동지원 서비스 안내",
};

export default function BusinessWelfarePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: { xs: "min(28rem, 55vh)", md: "min(32rem, 50vh)" },
      }}
    >
      <Welfare />
    </Box>
  );
}
