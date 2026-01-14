import { Box, Container, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        회사소개
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          회사 소개 내용을 여기에 작성하세요.
        </Typography>
      </Box>
    </Container>
  );
}
