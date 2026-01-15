"use client";

import { Box, Container, Typography } from "@mui/material";
import PostCard from "@/components/common/PostCard";
import { useEffect, useRef, useState } from "react";

// history 폴더의 이미지 목록
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

export default function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // 스크롤 속도 (픽셀/프레임)
    const cardWidth = 240; // 카드 너비 + gap

    const scroll = () => {
      if (!container || isPaused) return;

      scrollPosition += scrollSpeed;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (scrollPosition >= maxScroll) {
        // 끝에 도달하면 처음으로
        scrollPosition = 0;
        container.scrollTo({ left: 0, behavior: "auto" });
      } else {
        container.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(scroll, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* 타이틀 */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          새해밀 gallery
        </Typography>

        {/* 슬라이드 갤러리 */}
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
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
            },
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: "grey.200",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "primary.main",
              borderRadius: 4,
              "&:hover": {
                background: "primary.dark",
              },
            },
          }}
        >
          {galleryImages.map((item, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                width: { xs: 200, sm: 220, md: 240 },
                height: { xs: 280, sm: 320, md: 360 },
              }}
            >
              <PostCard
                image={item.image}
                imageAlt={item.alt}
                clickable={false}
                height="100%"
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
