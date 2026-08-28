import { Box } from "@mui/material";

import MandatoryTrainingHero from "@/components/sections/business/MandatoryTrainingHero";
import MandatoryTrainingIntro from "@/components/sections/business/MandatoryTrainingIntro";
import MandatoryTrainingTarget from "@/components/sections/business/MandatoryTrainingTarget";
import MandatoryTrainingCourses from "@/components/sections/business/MandatoryTrainingCourses";
import MandatoryTrainingFeatures from "@/components/sections/business/MandatoryTrainingFeatures";
import MandatoryTrainingSchedule from "@/components/sections/business/MandatoryTrainingSchedule";
import MandatoryTrainingImportance from "@/components/sections/business/MandatoryTrainingImportance";

export const metadata = {
  title: "활동지원사 의무 교육 | 새해밀",
  description: "활동지원사 의무 교육 안내",
};

export default function BusinessMandatoryTrainingPage() {
  return (
    <Box component="main">
      <MandatoryTrainingHero />
      <MandatoryTrainingIntro />
      <MandatoryTrainingTarget />
      <MandatoryTrainingCourses />
      <MandatoryTrainingFeatures />
      <MandatoryTrainingSchedule />
      <MandatoryTrainingImportance />
    </Box>
  );
}
