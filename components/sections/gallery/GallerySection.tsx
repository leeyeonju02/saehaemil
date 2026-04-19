"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Paper } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { PageSection } from "@/components/ui";
import { getAlbumCover } from "@/lib/gallery-albums";
import type { GalleryAlbum } from "@/lib/gallery-albums";
import { formatActivityDateLabel, formatCreatedAtLabel } from "@/lib/gallery-dates";

const ACCENT = "#1B5E20";

type Props = {
  /** Supabase `gallery` 테이블에서만 불러온 앨범 목록 */
  albums: GalleryAlbum[];
};

export default function GallerySection({ albums }: Props) {
  return (
    <PageSection>
      {albums.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            등록된 사진 앨범이 없습니다.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {albums.map((album) => {
            const cover = getAlbumCover(album);
            return (
              <Link
                key={album.id}
                href={`/gallery/${album.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "#fff",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    height: "100%",
                    "&:hover": {
                      boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "16 / 10",
                      bgcolor: "grey.100",
                    }}
                  >
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      unoptimized={
                        cover.src.startsWith("http://") || cover.src.startsWith("https://")
                      }
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        bgcolor: "rgba(27, 94, 32, 0.88)",
                        color: "#fff",
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      <FolderOutlinedIcon sx={{ fontSize: 16 }} aria-hidden />
                      앨범 · {album.images.length}장
                    </Box>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="h2" fontWeight={700} sx={{ mb: 1, color: "text.primary" }}>
                      {album.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.6,
                        mb: 1.5,
                      }}
                    >
                      {album.content}
                    </Typography>
                    <Typography variant="caption" component="div" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      <Box component="span" sx={{ color: ACCENT, fontWeight: 600 }}>
                        활동(봉사)
                      </Box>{" "}
                      {formatActivityDateLabel(album.activityDate)}
                    </Typography>
                    <Typography variant="caption" component="div" color="text.disabled" sx={{ mt: 0.5 }}>
                      등록 {formatCreatedAtLabel(album.createdAt)}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            );
          })}
        </Box>
      )}
    </PageSection>
  );
}
