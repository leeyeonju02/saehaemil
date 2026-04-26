"use client";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/components/providers";
import NoticeNewForm from "@/components/sections/notice/NoticeNewForm";
import type { Notice } from "@/types/notice";

type Props = {
  /** `?edit=id` 로 열었을 때 서버에서 불러온 공지 (없으면 신규 작성) */
  initialNotice?: Notice;
  /** URL에 `edit`가 있었는지 — 공지 미존재 시 안내용 */
  editRequestedId?: string;
};

export default function NoticeNewGuard({ initialNotice, editRequestedId }: Props) {
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
          공지 작성은 관리자만 이용할 수 있습니다.
        </Typography>
        <Button component={Link} href="/login" variant="contained" sx={{ mt: 2 }}>
          로그인하기
        </Button>
      </Box>
    );
  }

  if (editRequestedId && !initialNotice) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          수정할 공지를 찾을 수 없습니다.
        </Typography>
        <Button component={Link} href="/notice" variant="outlined" sx={{ mt: 2 }}>
          공지 목록으로
        </Button>
      </Box>
    );
  }

  return <NoticeNewForm initialNotice={initialNotice ?? null} />;
}
