"use client";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/components/providers";
import GalleryNewForm from "@/components/sections/gallery/GalleryNewForm";

export default function GalleryNewGuard() {
  const { isAdmin, ready } = useAuth();

  if (!ready) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          사진 앨범 추가는 관리자만 이용할 수 있습니다.
        </Typography>
        <Button component={Link} href="/login" variant="contained" sx={{ mt: 2 }}>
          로그인하기
        </Button>
      </Box>
    );
  }

  return <GalleryNewForm />;
}
