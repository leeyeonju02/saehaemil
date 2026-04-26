"use client";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/components/providers";
import GalleryNewForm from "@/components/sections/gallery/GalleryNewForm";
import type { GalleryAlbum } from "@/lib/gallery-albums";

type Props = {
  /** `?edit=숫자id` 로 열었을 때 서버에서 불러온 DB 앨범 */
  initialAlbum?: GalleryAlbum;
  /** URL의 `edit` 값 (형식 오류·미존재 안내용) */
  editRequestedId?: string;
};

export default function GalleryNewGuard({ initialAlbum, editRequestedId }: Props) {
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

  if (editRequestedId && !/^\d+$/.test(editRequestedId.trim())) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          DB에 저장된 앨범만 수정할 수 있습니다. 목록에서 숫자 ID 앨범의 수정을 이용해 주세요.
        </Typography>
        <Button component={Link} href="/gallery" variant="outlined" sx={{ mt: 2 }}>
          사진앨범 목록으로
        </Button>
      </Box>
    );
  }

  if (editRequestedId && /^\d+$/.test(editRequestedId.trim()) && !initialAlbum) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          수정할 앨범을 찾을 수 없습니다.
        </Typography>
        <Button component={Link} href="/gallery" variant="outlined" sx={{ mt: 2 }}>
          사진앨범 목록으로
        </Button>
      </Box>
    );
  }

  return <GalleryNewForm initialAlbum={initialAlbum ?? null} />;
}
