import { Container, Typography, Box } from "@mui/material";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        py: 4,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
