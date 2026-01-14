import { Box, Container, Typography } from "@mui/material";

export default function OrganizationPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        조직도
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          조직도 내용을 여기에 작성하세요.
        </Typography>
      </Box>
    </Container>
  );
}
