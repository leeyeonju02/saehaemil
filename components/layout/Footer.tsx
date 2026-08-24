"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1B1C1E",
        color: "rgba(255,255,255,0.72)",
        pt: { xs: 5, md: 6 },
        pb: { xs: 5, md: 4 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <MuiLink
              component={Link}
              href="#"
              sx={{
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: { xs: "0.95rem", md: "1rem" },
                "&:hover": { color: "#fff" },
              }}
            >
              개인정보처리방침
            </MuiLink>
            <Typography
              component="span"
              sx={{ mx: 1.5, color: "rgba(255,255,255,0.5)" }}
            >
              ·
            </Typography>
            <MuiLink
              component={Link}
              href="#"
              sx={{
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: { xs: "0.95rem", md: "1rem" },
                "&:hover": { color: "#fff" },
              }}
            >
              이용약관
            </MuiLink>
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.8,
              fontSize: { xs: "1.05rem", md: "1.15rem" },
            }}
          >
            사단법인 새해밀 장애인 활동지원기관
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.95rem", md: "1.02rem" } }}
          >
            주소: 전북특별자치도 익산시 무왕로29길 9-8(팔봉동)
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.95rem", md: "1.02rem" } }}
          >
            대표: 신용
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.95rem", md: "1.02rem" } }}
          >
            사업자등록번호: 390-82-00710
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.95rem", md: "1.02rem" } }}
          >
            전화: 063-833-8582, 010-8191-9558
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.95rem", md: "1.02rem" } }}
          >
            팩스: 063-833-7280
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.95rem", md: "1.02rem" } }}
          >
            E-mail: newsun124@naver.com
          </Typography>

          <Typography
            sx={{
              mt: { xs: 4, md: 4.5 },
              color: "rgba(255,255,255,0.5)",
              fontSize: { xs: "0.9rem", md: "0.98rem" },
              letterSpacing: "0.01em",
            }}
          >
            COPYRIGHT ⓒ {currentYear} 사단법인 새해밀 장애인 활동지원기관. ALL
            RIGHTS RESERVED.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
