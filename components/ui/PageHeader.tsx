import type { ReactNode } from "react";
import { Container, Typography, Box, Stack } from "@mui/material";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** 헤더 오른쪽(제목·설명과 같은 줄 기준 끝)에 표시할 영역 */
  action?: ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
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
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "flex-start" }}
          justifyContent="space-between"
          gap={2}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
          {action ? (
            <Box sx={{ flexShrink: 0, alignSelf: { xs: "stretch", sm: "flex-start" } }}>
              {action}
            </Box>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
