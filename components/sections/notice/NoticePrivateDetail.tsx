"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "@/components/providers";
import { PageSection } from "@/components/ui";
import NoticeDetailView from "@/components/sections/notice/NoticeDetailView";
import { fetchNoticeAsAdmin } from "@/lib/notices-admin-client";
import type { Notice } from "@/types/notice";

type Props = {
  noticeId: string;
};

/** 비공개 공지 상세 — 관리자에게만 내용을 불러와 보여 준다 */
export default function NoticePrivateDetail({ noticeId }: Props) {
  const { isAdmin, ready } = useAuth();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!ready || !isAdmin) return;
    let cancelled = false;
    fetchNoticeAsAdmin(noticeId).then((result) => {
      if (cancelled) return;
      if (result) setNotice(result);
      else setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ready, isAdmin, noticeId]);

  if (notice) {
    return <NoticeDetailView notice={notice} />;
  }

  const loading = !ready || (isAdmin && !failed);

  return (
    <PageSection>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={32} />
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {isAdmin
              ? "공지를 불러오지 못했습니다. 로그아웃 후 관리자로 다시 로그인해 주세요."
              : "비공개 처리된 공지입니다."}
          </Typography>
          <Button component={Link} href="/notice" variant="outlined" sx={{ mt: 2 }}>
            공지 목록으로
          </Button>
        </Box>
      )}
    </PageSection>
  );
}
