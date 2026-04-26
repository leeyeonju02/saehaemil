"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "@/components/providers";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";

type Props = {
  noticeId: string;
};

export default function NoticeDetailAdminBar({ noticeId }: Props) {
  const { isAdmin, ready } = useAuth();
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  if (!ready || !isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    setErrorText(null);
    let adminPassword: string | null = null;
    try {
      adminPassword = sessionStorage.getItem(ADMIN_PW_SESSION_KEY);
    } catch {
      adminPassword = null;
    }
    if (!adminPassword) {
      setErrorText("등록 인증이 없습니다. 로그아웃 후 관리자로 다시 로그인해 주세요.");
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/notices/${encodeURIComponent(noticeId)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setErrorText(data.error ?? "삭제에 실패했습니다.");
        return;
      }

      setDeleteOpen(false);
      router.push("/notice");
      router.refresh();
    } catch {
      setErrorText("네트워크 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        useFlexGap
        sx={{
          mb: 2,
          justifyContent: "flex-end",
          alignItems: { xs: "flex-end", sm: "center" },
        }}
      >
        <Button
          component={Link}
          href={`/notice/new?edit=${encodeURIComponent(noticeId)}`}
          variant="outlined"
          size="medium"
        >
          수정
        </Button>
        <Button
          color="error"
          variant="outlined"
          size="medium"
          onClick={() => {
            setErrorText(null);
            setDeleteOpen(true);
          }}
        >
          삭제
        </Button>
      </Stack>

      <Dialog open={deleteOpen} onClose={() => !deleting && setDeleteOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>공지 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            이 공지를 목록에서 숨깁니다. 계속하시겠습니까?
          </Typography>
          {errorText ? (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {errorText}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteOpen(false)} disabled={deleting}>
            취소
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete} disabled={deleting}>
            {deleting ? "삭제 중…" : "삭제"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
