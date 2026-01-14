import { Box, Container, Typography } from "@mui/material";

export default function ActivitiesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        활동내역
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          활동내역 내용을 여기에 작성하세요.
        </Typography>
      </Box>
    </Container>
  );
}
