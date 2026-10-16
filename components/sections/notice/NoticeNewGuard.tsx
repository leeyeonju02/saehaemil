"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/components/providers";
import NoticeNewForm from "@/components/sections/notice/NoticeNewForm";
import { fetchNoticeAsAdmin } from "@/lib/notices-admin-client";
import type { Notice } from "@/types/notice";

type Props = {
  /** `?edit=id` 로 열었을 때 서버에서 불러온 공지 (없으면 신규 작성) */
  initialNotice?: Notice;
  /** URL에 `edit`가 있었는지 — 공지 미존재 시 안내용 */
  editRequestedId?: string;
};

export default function NoticeNewGuard({ initialNotice, editRequestedId }: Props) {
  const { isAdmin, ready } = useAuth();
  /** 비공개 공지는 서버에서 불러오지 않으므로 관리자 권한으로 다시 조회 */
  const [privateNotice, setPrivateNotice] = useState<Notice | null>(null);
  const [privateLookupDone, setPrivateLookupDone] = useState(false);
  const needsPrivateLookup = Boolean(editRequestedId && !initialNotice);

  useEffect(() => {
    if (!ready || !isAdmin || !needsPrivateLookup || !editRequestedId) return;
    let cancelled = false;
    fetchNoticeAsAdmin(editRequestedId).then((result) => {
      if (cancelled) return;
      setPrivateNotice(result);
      setPrivateLookupDone(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ready, isAdmin, needsPrivateLookup, editRequestedId]);

  const notice = initialNotice ?? privateNotice ?? undefined;

  if (!ready || (isAdmin && needsPrivateLookup && !privateLookupDone)) {
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

  if (editRequestedId && !notice) {
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

  return <NoticeNewForm initialNotice={notice ?? null} />;
}
