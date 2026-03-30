"use client";

import { useState } from "react";
import { Box, Container, Typography, Button, Stack, Chip, Popover } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

/** 참고 랜딩과 유사한 포레스트 그린 */
const HERO_GREEN = "#1B5E20";

/** Footer와 동일한 대표 전화 (전화앱 연결) */
const CONTACT_TEL_HREF = "tel:0638338582";

export default function Hero() {
  const [consultAnchor, setConsultAnchor] = useState<HTMLElement | null>(null);
  const consultOpen = Boolean(consultAnchor);

  const handleConsultClick = (event: React.MouseEvent<HTMLElement>) => {
    setConsultAnchor(event.currentTarget);
  };

  const handleConsultClose = () => {
    setConsultAnchor(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "min(92vh, 820px)", md: "min(88vh, 760px)" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "#fff",
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* 전체 배경 — landing.png (블러/별도 이미지 없음) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/common/landing.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* 어두운 오버레이 (가독성) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.38) 100%)",
          zIndex: 1,
        }}
      />

      {/* 하단 → 흰색으로 페이드 (본문은 위쪽에 두고 맨 아래만 밝게) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          top: "auto",
          height: "32%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(250,248,245,0.35) 50%, rgba(250,248,245,0.92) 88%, #FAF8F5 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 3,
          textAlign: "left",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 2 },
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
          {/* 키워드 칩 (상단 뱃지와 동일 스타일) — 메인 헤드라인 상단 */}
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            sx={{
              justifyContent: "flex-start",
              gap: 1,
              width: "100%",
            }}
          >
            {[
              "인권보호",
              "자기결정",
              "정보제공",
              "차별 없는 서비스",
            ].map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                sx={{
                  height: "auto",
                  borderRadius: 999,
                  bgcolor: "rgba(27, 94, 32, 0.55)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                  "& .MuiChip-label": {
                    px: 2,
                    py: 0.75,
                  },
                  "&:hover": {
                    bgcolor: "rgba(27, 94, 32, 0.65)",
                  },
                }}
              />
            ))}
          </Stack>

          {/* 메인 헤드라인 — 문구 동일, 두 줄 구성 */}
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.25,
              fontSize: { xs: "1.65rem", sm: "2.15rem", md: "2.65rem" },
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
              maxWidth: 720,
              width: "100%",
              textAlign: "left",
            }}
          >
            장애인의 권익과 자립을 함께 만드는
            <br />
            새해밀
          </Typography>

          {/* 서브 문구 */}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
              lineHeight: 1.75,
              opacity: 0.98,
              maxWidth: 560,
              textAlign: "left",
              textShadow: "0 1px 12px rgba(0,0,0,0.35)",
            }}
          >
            사단법인 새해밀은
            <br />
            장애인의 자립생활 이념 실현과
            <br />
            사회참여 증진을 위해 함께합니다.
          </Typography>

          {/* CTA — 참고: solid green + white outline */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: "flex-start",
              alignItems: { xs: "stretch", sm: "center" },
              pt: { xs: 1, md: 1.5 },
              width: "100%",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Button
                variant="contained"
                size="large"
                aria-haspopup="true"
                aria-expanded={consultOpen}
                aria-controls={consultOpen ? "hero-consult-popover" : undefined}
                onClick={handleConsultClick}
                endIcon={<ArrowForwardIcon sx={{ fontSize: 20 }} />}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { sm: 200 },
                  py: 1.25,
                  px: 2.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  bgcolor: HERO_GREEN,
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(27, 94, 32, 0.35)",
                  "&:hover": {
                    bgcolor: "#156018",
                    boxShadow: "0 10px 28px rgba(27, 94, 32, 0.45)",
                  },
                }}
              >
                상담 안내
              </Button>
              <Popover
                id="hero-consult-popover"
                open={consultOpen}
                anchorEl={consultAnchor}
                onClose={handleConsultClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                  paper: {
                    elevation: 8,
                    sx: {
                      mt: 1,
                      p: 2,
                      minWidth: { xs: "min(100vw - 32px, 280px)", sm: 260 },
                      borderRadius: 2,
                    },
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Button
                    component="a"
                    href={CONTACT_TEL_HREF}
                    fullWidth
                    variant="contained"
                    size="medium"
                    onClick={handleConsultClose}
                    sx={{
                      fontWeight: 700,
                      bgcolor: HERO_GREEN,
                      "&:hover": { bgcolor: "#156018" },
                    }}
                  >
                    전화안내
                  </Button>
                  <Button
                    component={Link}
                    href="/board"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={handleConsultClose}
                    sx={{ fontWeight: 700, borderColor: HERO_GREEN, color: HERO_GREEN }}
                  >
                    게시판 문의
                  </Button>
                </Stack>
              </Popover>
            </Box>
            {/* <Button
              variant="outlined"
              size="large"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 200 },
                py: 1.25,
                px: 2.5,
                borderRadius: 2,
                fontWeight: 600,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.95)",
                borderWidth: 2,
                bgcolor: "transparent",
                "&:hover": {
                  borderColor: "#fff",
                  borderWidth: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              상담 안내
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
