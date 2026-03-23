"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";

const ACCENT = "#1B5E20";

const galleryImages = [
  { image: "/images/history/his1.png", alt: "새해밀 갤러리 이미지 1" },
  { image: "/images/history/his2.png", alt: "새해밀 갤러리 이미지 2" },
  { image: "/images/history/his3.png", alt: "새해밀 갤러리 이미지 3" },
  { image: "/images/history/his4.png", alt: "새해밀 갤러리 이미지 4" },
  { image: "/images/history/his5.png", alt: "새해밀 갤러리 이미지 5" },
  { image: "/images/history/his6.png", alt: "새해밀 갤러리 이미지 6" },
  { image: "/images/history/his7.png", alt: "새해밀 갤러리 이미지 7" },
  { image: "/images/history/his8.png", alt: "새해밀 갤러리 이미지 8" },
  { image: "/images/history/his9.png", alt: "새해밀 갤러리 이미지 9" },
  { image: "/images/history/his10.png", alt: "새해밀 갤러리 이미지 10" },
];

/** 한 줄에 보이는 개수에 맞춘 카드 너비 (lg에서 약 4장) */
const cardSx = {
  flexShrink: 0,
  width: { xs: 200, sm: 230, md: 270 },
  height: { xs: 260, sm: 300, md: 340 },
};

export default function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const tick = () => {
      if (!container || isPaused) return;

      scrollPosition += scrollSpeed;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (maxScroll <= 0) return;

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
        container.scrollTo({ left: 0, behavior: "auto" });
      } else {
        container.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(tick, 16);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "#FAF8F4",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Box sx={{ textAlign: "left", flex: "1 1 280px", minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: ACCENT,
                fontWeight: 600,
                display: "block",
                letterSpacing: "0.1em",
                fontSize: "0.8125rem",
              }}
            >
              활동 갤러리
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              fontWeight={800}
              sx={{
                mt: 0.5,
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                color: "text.primary",
              }}
            >
              함께한 순간들
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 1.5,
                maxWidth: 560,
                lineHeight: 1.75,
              }}
            >
              프로그램과 행사, 일상 현장에서 새해밀이 함께한 소중한 순간들을
              모았습니다.
            </Typography>
          </Box>
          <Link href="/gallery" style={{ textDecoration: "none" }}>
            <Button
              component="span"
              variant="outlined"
              endIcon={<ChevronRight fontSize="small" />}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                bgcolor: "#ffffff",
                borderRadius: 2,
                px: 2,
                fontWeight: 600,
                alignSelf: { xs: "stretch", sm: "flex-start" },
                "&:hover": {
                  borderColor: ACCENT,
                  bgcolor: "#ffffff",
                },
              }}
            >
              전체보기
            </Button>
          </Link>
        </Stack>

        <Box
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            display: "flex",
            gap: { xs: 1.5, md: 2 },
            overflowX: "auto",
            scrollBehavior: "smooth",
            pb: 2,
            mx: { xs: -2, sm: -3, md: 0 },
            px: { xs: 2, sm: 3, md: 0 },
            cursor: "grab",
            "&:active": { cursor: "grabbing" },
            scrollbarGutter: "stable",
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-track": {
              background: "grey.200",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              background: ACCENT,
              borderRadius: 4,
              opacity: 0.6,
            },
          }}
        >
          {galleryImages.map((item, index) => (
            <Box
              key={index}
              sx={{
                ...cardSx,
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
                bgcolor: "grey.100",
                flexShrink: 0,
                "&:hover .gallery-hover-overlay": {
                  opacity: 1,
                },
              }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 600px) 200px, (max-width: 900px) 230px, 270px"
                style={{ objectFit: "cover" }}
              />
              <Box
                className="gallery-hover-overlay"
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(0, 0, 0, 0.42)",
                  opacity: 0,
                  transition: "opacity 0.28s ease",
                  pointerEvents: "none",
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
