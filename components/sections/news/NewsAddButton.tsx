"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useAuth } from "@/components/providers";

/** 관리자에게만 보이는 뉴스 등록 버튼 */
export default function NewsAddButton() {
  const { isAdmin, ready } = useAuth();

  if (!ready || !isAdmin) return null;

  return (
    <Button
      component={Link}
      href="/news/new"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, mb: 2 }}
    >
      뉴스 추가
    </Button>
  );
}
