import { Typography, Box } from "@mui/material";
import { PageSection } from "@/components/ui";

export default function LocationSection() {
  return (
    <PageSection>
      <Typography variant="body1" paragraph>
        오시는 길 안내 내용을 여기에 작성하세요.
      </Typography>
      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: "grey.100",
          borderRadius: 1,
          minHeight: 200,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          지도 영역 (추후 연동)
        </Typography>
      </Box>
    </PageSection>
  );
}
