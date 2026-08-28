import { Box } from "@mui/material";

import MandatoryTraining from "@/components/sections/business/MandatoryTraining";

export const metadata = {
  title: "활동지원사 의무 교육 | 새해밀",
  description: "활동지원사 의무 교육 안내",
};

export default function BusinessMandatoryTrainingPage() {
  return (
    <Box component="main">
      <MandatoryTraining />
    </Box>
  );
}
