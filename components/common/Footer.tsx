"use client";

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const footerLinks = {
  about: [
    { label: "회사소개", path: "/about" },
    { label: "연혁", path: "/history" },
    { label: "활동내역", path: "/activities" },
    { label: "조직도", path: "/organization" },
  ],
  support: [
    { label: "후원 안내", path: "#" },
    { label: "자원봉사", path: "#" },
    { label: "협력 기관", path: "#" },
  ],
  legal: [
    { label: "개인정보처리방침", path: "#" },
    { label: "이용약관", path: "#" },
    { label: "사이트맵", path: "#" },
  ],
};

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.300",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "2fr 1fr 1.5fr 1.5fr",
            },
            gap: 4,
          }}
        >
          {/* 회사 정보 */}
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              새해밀 장애인 활동 지원 센터
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              장애인의 일상에 함께하는 활동지원
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>주소:</strong> 서울특별시 강남구 테헤란로 123
              </Typography>
              <Typography variant="body2">
                <strong>전화:</strong> 02-1234-5678
              </Typography>
              <Typography variant="body2">
                <strong>팩스:</strong> 02-1234-5679
              </Typography>
              <Typography variant="body2">
                <strong>이메일:</strong> info@saehaemil.org
              </Typography>
            </Stack>
          </Box>

          {/* 빠른 링크 */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              회사소개
            </Typography>
            <Stack spacing={1}>
              {footerLinks.about.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.path}
                  sx={{
                    color: "grey.300",
                    textDecoration: "none",
                    "&:hover": { color: "white", textDecoration: "underline" },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          {/* 후원/협력 */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              후원 및 협력
            </Typography>
            <Stack spacing={1}>
              {footerLinks.support.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.path}
                  sx={{
                    color: "grey.300",
                    textDecoration: "none",
                    "&:hover": { color: "white", textDecoration: "underline" },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          {/* 법적 정보 */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              법적 정보
            </Typography>
            <Stack spacing={1}>
              {footerLinks.legal.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.path}
                  sx={{
                    color: "grey.300",
                    textDecoration: "none",
                    "&:hover": { color: "white", textDecoration: "underline" },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" sx={{ color: "grey.500" }}>
                사업자등록번호: 123-45-67890
              </Typography>
              <br />
              <Typography variant="caption" sx={{ color: "grey.500" }}>
                사회적기업 인증번호: 2024-0001
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "grey.700" }} />

        {/* 저작권 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.500" }}>
            © {currentYear ?? new Date().getFullYear()} 새해밀 장애인 활동 지원
            센터. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "grey.500" }}>
            본 사이트는 장애인 활동 지원을 목적으로 운영됩니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
