"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "홈", path: "/" },
  { label: "회사소개", path: "/about" },
  { label: "연혁", path: "/history" },
  { label: "활동내역", path: "/activities" },
  { label: "조직도", path: "/organization" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 0,
              fontWeight: "bold",
              textDecoration: "none",
              color: "black",
              mr: 4,
            }}
          >
            새해밀
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                sx={{
                  color: "black",
                  fontWeight: pathname === item.path ? "bold" : "normal",
                  textDecoration: pathname === item.path ? "underline" : "none",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
