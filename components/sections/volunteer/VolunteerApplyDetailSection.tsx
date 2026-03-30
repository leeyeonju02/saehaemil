"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { PageSection } from "@/components/ui";
import { useAuth } from "@/components/providers";
import {
  getVolunteerApplicationById,
  type VolunteerApplicationRow,
} from "@/lib/volunteer-applications-storage";

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

export default function VolunteerApplyDetailSection({ id }: { id: string }) {
  const { isAdmin, ready } = useAuth();
  const [row, setRow] = useState<VolunteerApplicationRow | null | undefined>(undefined);

  useEffect(() => {
    setRow(getVolunteerApplicationById(id) ?? null);
  }, [id]);

  if (!ready) {
    return (
      <PageSection>
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={32} />
        </Box>
      </PageSection>
    );
  }

  if (!isAdmin) {
    return (
      <PageSection>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            관리자만 오픈이 가능합니다.
          </Typography>
          <Button component={Link} href="/volunteer/apply" variant="outlined" sx={{ mt: 2 }}>
            목록으로
          </Button>
        </Box>
      </PageSection>
    );
  }

  if (row === undefined) {
    return (
      <PageSection>
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={32} />
        </Box>
      </PageSection>
    );
  }

  if (!row) {
    return (
      <PageSection>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          해당 신청 글을 찾을 수 없습니다.
        </Typography>
        <Button component={Link} href="/volunteer/apply" variant="contained" sx={{ mt: 2 }}>
          목록으로
        </Button>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          p: { xs: 2.5, sm: 3, md: 4 },
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          {row.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          작성자: {row.author} · 등록: {formatDateTime(row.createdAt)}
        </Typography>
        <Box
          component="article"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
          }}
        >
          <Typography variant="body1" component="div" color="text.primary">
            {row.content || "(내용 없음)"}
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ mt: { xs: 4, md: 6 } }}>
        <Link
          href="/volunteer/apply"
          style={{
            color: "inherit",
            textDecoration: "underline",
          }}
        >
          ← 봉사 신청 목록으로
        </Link>
      </Typography>
    </PageSection>
  );
}
