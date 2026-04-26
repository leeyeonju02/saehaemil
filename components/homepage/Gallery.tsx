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
import { getAlbumCover } from "@/lib/gallery-albums";
import type { GalleryAlbum } from "@/lib/gallery-albums";

const ACCENT = "#1B5E20";

type Props = {
  /** Supabase `gallery` 테이블에서 조회한 앨범 목록 */
  albums: GalleryAlbum[];
};

/** 앨범(폴더) 카드 — 가로 스크롤 한 장 너비 */
const cardSx = {
  flexShrink: 0,
  width: { xs: 200, sm: 230, md: 270 },
  height: { xs: 300, sm: 340, md: 380 },
  display: "flex",
  flexDirection: "column" as const,
  overflow: "hidden",
};

export default function Gallery({ albums }: Props) {
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
              앨범별로 모았습니다.
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
          {albums.length === 0 ? (
            <Box sx={{ py: 2, width: "100%", textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                등록된 사진 앨범이 없습니다.
              </Typography>
            </Box>
          ) : (
            albums.map((album) => {
              const cover = getAlbumCover(album);
              return (
                <Link
                  key={album.id}
                  href={`/gallery/${album.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    sx={{
                      ...cardSx,
                      borderRadius: 2,
                      border: 1,
                      borderColor: "divider",
                      bgcolor: "#fff",
                      "&:hover .gallery-hover-overlay": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        flex: 1,
                        minHeight: 0,
                      }}
                    >
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(max-width: 600px) 200px, (max-width: 900px) 230px, 270px"
                        style={{ objectFit: "cover" }}
                        unoptimized={
                          cover.src.startsWith("http://") || cover.src.startsWith("https://")
                        }
                      />
                    <Box
                      className="gallery-hover-overlay"
                      aria-hidden
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0, 0, 0, 0.38)",
                        opacity: 0,
                        transition: "opacity 0.28s ease",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1.25,
                      borderTop: 1,
                      borderColor: "divider",
                      bgcolor: "#fff",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.35,
                        color: "text.primary",
                      }}
                    >
                      {album.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                      앨범 · {album.images.length}장
                    </Typography>
                  </Box>
                  </Box>
                </Link>
              );
            })
          )}
        </Box>
      </Container>
    </Box>
  );
}
