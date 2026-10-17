"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";

/** http(s) 주소인지 확인 */
function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function NewsNewForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sourceName, setSourceName] = useState("");
  /** YYYY-MM-DD (input type="date") */
  const [publishedAt, setPublishedAt] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isPinned, setIsPinned] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "success" });

  const trimmedUrl = url.trim();
  const urlError = trimmedUrl.length > 0 && !isHttpUrl(trimmedUrl);
  const trimmedImageUrl = imageUrl.trim();
  const imageUrlError = trimmedImageUrl.length > 0 && !isHttpUrl(trimmedImageUrl);
  const sortOrderError = sortOrder.trim() !== "" && !/^-?\d+$/.test(sortOrder.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmedUrl) {
      setSnackbar({ open: true, message: "기사 링크를 입력해 주세요.", severity: "info" });
      return;
    }
    if (urlError) {
      setSnackbar({
        open: true,
        message: "http:// 또는 https:// 로 시작하는 주소를 입력해 주세요.",
        severity: "info",
      });
      return;
    }

    if (imageUrlError) {
      setSnackbar({
        open: true,
        message: "썸네일 이미지 주소는 http:// 또는 https:// 로 시작해야 합니다.",
        severity: "info",
      });
      return;
    }
    if (sortOrderError) {
      setSnackbar({ open: true, message: "정렬 순서는 정수로 입력해 주세요.", severity: "info" });
      return;
    }

    let adminPassword: string | null = null;
    try {
      adminPassword = sessionStorage.getItem(ADMIN_PW_SESSION_KEY);
    } catch {
      adminPassword = null;
    }
    if (!adminPassword) {
      setSnackbar({
        open: true,
        message:
          "등록 인증이 없습니다. 로그아웃 후 관리자 계정으로 다시 로그인해 주세요.",
        severity: "error",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmedUrl,
          title: title.trim(),
          description: description.trim(),
          image_url: trimmedImageUrl,
          source_name: sourceName.trim(),
          published_at: publishedAt,
          sort_order: sortOrder.trim() === "" ? 0 : Number(sortOrder.trim()),
          is_pinned: isPinned,
          is_visible: !isPrivate,
          adminPassword,
        }),
      });
      const data = (await res.json()) as { error?: string; id?: string };

      if (!res.ok) {
        setSnackbar({
          open: true,
          message: data.error ?? "저장에 실패했습니다.",
          severity: "error",
        });
        return;
      }

      setSnackbar({ open: true, message: "뉴스가 등록되었습니다.", severity: "success" });
      router.push("/news");
      router.refresh();
    } catch {
      setSnackbar({
        open: true,
        message: "네트워크 오류가 발생했습니다.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ maxWidth: 720, mx: "auto" }}
    >
      <Stack spacing={3}>
        <TextField
          label="기사 링크"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          fullWidth
          type="url"
          error={urlError}
          helperText={
            urlError
              ? "http:// 또는 https:// 로 시작하는 주소를 입력해 주세요."
              : "기사 원문 주소를 붙여 넣어 주세요."
          }
        />

        <TextField
          label="기사 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          helperText="비워 두면 목록에서 기사 사이트 주소로 표시됩니다."
        />

        <TextField
          label="기사 요약"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />

        <TextField
          label="썸네일 이미지 주소"
          placeholder="https://"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          type="url"
          error={imageUrlError}
          helperText={
            imageUrlError ? "http:// 또는 https:// 로 시작하는 주소를 입력해 주세요." : undefined
          }
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
          <TextField
            label="언론사명"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            fullWidth
          />
          <TextField
            label="기사 발행일"
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Stack>

        <TextField
          label="정렬 순서"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          error={sortOrderError}
          helperText={sortOrderError ? "정수로 입력해 주세요." : "숫자가 클수록 위에 표시됩니다. (기본 0)"}
          sx={{ maxWidth: { sm: 240 } }}
        />

        <Stack>
          <FormControlLabel
            control={
              <Checkbox checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} />
            }
            label="상단 고정"
          />
          <FormControlLabel
            control={
              <Checkbox checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
            }
            label="비공개 (관리자만 볼 수 있음)"
          />
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button component={Link} href="/news" variant="outlined" size="large">
            목록으로
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            startIcon={
              submitting ? <CircularProgress size={20} color="inherit" /> : undefined
            }
          >
            {submitting ? "등록 중…" : "등록하기"}
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
