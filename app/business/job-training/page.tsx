import { Box } from "@mui/material";
import JobTraining from "@/components/sections/business/JobTraining";

export const metadata = {
  title: "활동지원사 직무 교육 | 새해밀",
  description: "활동지원사 직무 교육 안내",
};

export default function BusinessJobTrainingPage() {
  return (
    <Box component="main">
      <JobTraining />
    </Box>
  );
}
