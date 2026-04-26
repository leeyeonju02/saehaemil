"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";
import GalleryDetailSection from "@/components/sections/gallery/GalleryDetailSection";
import GalleryAlbumFooterNav from "@/components/sections/gallery/GalleryAlbumFooterNav";
import type { GalleryAlbum } from "@/lib/gallery-albums";
import { getCustomAlbumById } from "@/lib/gallery-custom-storage";

export default function GalleryCustomDetailClient({ albumId }: { albumId: string }) {
  const [album, setAlbum] = useState<GalleryAlbum | null | undefined>(undefined);

  useEffect(() => {
    setAlbum(getCustomAlbumById(albumId) ?? null);
  }, [albumId]);

  if (album === undefined) {
    return (
      <>
        <Hero />
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (album === null) {
    return (
      <>
        <Hero />
        <PageSection>
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" gutterBottom>
              앨범을 찾을 수 없습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              이 기기의 브라우저에 저장된 앨범만 열 수 있습니다.
            </Typography>
            <Button component={Link} href="/gallery" variant="contained">
              사진앨범 목록
            </Button>
          </Box>
        </PageSection>
      </>
    );
  }

  return (
    <>
      <Hero />
      <PageHeader title={album.title} description="활동 사진 앨범" />
      <GalleryDetailSection album={album} />
      <PageSection>
        <GalleryAlbumFooterNav albumId={album.id} />
      </PageSection>
    </>
  );
}
