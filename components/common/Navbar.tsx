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
import Image from "next/image";
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
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Toolbar disableGutters sx={{ py: 1, pl: 0 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              flexGrow: 0,
              textDecoration: "none",
              mr: 4,
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: { xs: 70, sm: 85, md: 100 },
              width: { xs: 220, sm: 280, md: 320 },
            }}
          >
            <Image
              src="/images/common/mainI.png"
              alt="새해밀"
              fill
              style={{
                objectFit: "contain",
              }}
              sizes="(max-width: 600px) 220px, (max-width: 960px) 280px, 320px"
            />
          </Box>
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
