import { Box } from "@mui/material";
import JobTrainingHero from "@/components/sections/business/JobTrainingHero";
import JobTrainingIntro from "@/components/sections/business/JobTrainingIntro";
import JobTrainingTarget from "@/components/sections/business/JobTrainingTarget";
import JobTrainingCurriculum from "@/components/sections/business/JobTrainingCurriculum";
import JobTrainingGallery from "@/components/sections/business/JobTrainingGallery";

export const metadata = {
  title: "활동지원사 직무 교육 | 새해밀",
  description: "활동지원사 직무 교육 안내",
};

export default function BusinessJobTrainingPage() {
  return (
    <Box component="main">
      <JobTrainingHero />
      <JobTrainingIntro />
      <JobTrainingTarget />
      <JobTrainingCurriculum />
      <JobTrainingGallery />
    </Box>
  );
}
