"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/components/providers";

export default function GalleryAddAlbumButton() {
  const { isAdmin, ready } = useAuth();

  if (!ready || !isAdmin) return null;

  return (
    <Button
      component={Link}
      href="/gallery/new"
      variant="contained"
      color="primary"
      size="medium"
      startIcon={<AddIcon />}
    >
      앨범 추가
    </Button>
  );
}
