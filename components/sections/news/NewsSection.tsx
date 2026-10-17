import { Box, Typography } from "@mui/material";
import { PageSection } from "@/components/ui";
import NewsAddButton from "@/components/sections/news/NewsAddButton";

export default function NewsSection() {
  return (
    <PageSection>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <NewsAddButton />
        <Typography variant="body1" paragraph>
          등록된 뉴스가 없습니다.
        </Typography>
      </Box>
    </PageSection>
  );
}
