"use client";

import Image from "next/image";
import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const GREEN = "#1B5E20";

export default function LocationHeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: 220, sm: 280, md: 320 },
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/common/landing.png"
        alt="새해밀 장애인 활동지원센터 외관"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(27,94,32,0.88) 0%, rgba(27,94,32,0.55) 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          minHeight: { xs: 220, sm: 280, md: 320 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: { xs: 4, md: 5 },
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 560 }}>
          <Chip
            icon={<PlaceOutlinedIcon sx={{ fontSize: 18, color: `${GREEN} !important` }} />}
            label="LOCATION"
            size="small"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(255,255,255,0.95)",
              color: GREEN,
              fontWeight: 700,
              letterSpacing: 1.2,
              fontSize: "0.7rem",
            }}
          />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: { xs: "1.65rem", sm: "2rem", md: "2.25rem" },
              lineHeight: 1.25,
              textShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            새해밀을 찾아주세요
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.92)",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            익산시 팔봉동에 위치한 새해밀 장애인 활동지원센터입니다.
            아래 지도와 안내를 참고해 방문해 주세요.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
