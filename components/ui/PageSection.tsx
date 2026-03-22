import { Container, Box } from "@mui/material";

interface PageSectionProps {
  children: React.ReactNode;
}

export default function PageSection({ children }: PageSectionProps) {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
