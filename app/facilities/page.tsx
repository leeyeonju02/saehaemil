import { Typography } from "@mui/material";
import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";

export const metadata = {
  title: "시설, 설비현황 | 새해밀",
  description: "사단법인 새해밀의 시설 및 설비 현황을 안내합니다.",
};

export default function FacilitiesPage() {
  return (
    <>
      <Hero />
      <PageHeader
        title="시설, 설비현황"
        description="새해밀의 시설·설비 현황을 안내합니다."
      />
      <PageSection>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          상세 내용을 준비 중입니다.
        </Typography>
      </PageSection>
    </>
  );
}
