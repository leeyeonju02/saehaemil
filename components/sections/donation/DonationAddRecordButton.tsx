"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/components/providers";

export default function DonationAddRecordButton() {
  const { isAdmin, ready } = useAuth();

  if (!ready || !isAdmin) return null;

  return (
    <Button
      component={Link}
      href="/donation/records/new"
      variant="contained"
      color="primary"
      size="medium"
      startIcon={<AddIcon />}
    >
      후원 내역 추가
    </Button>
  );
}
