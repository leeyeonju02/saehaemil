import { Typography, Box } from "@mui/material";
import { PageSection } from "@/components/ui";

export default function GallerySection() {
  return (
    <PageSection>
      <Typography variant="body1" paragraph>
        사진앨범 내용을 여기에 작성하세요.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" },
          gap: 2,
          mt: 2,
        }}
      >
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              aspectRatio: "1",
              bgcolor: "grey.200",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              이미지
            </Typography>
          </Box>
        ))}
      </Box>
    </PageSection>
  );
}
