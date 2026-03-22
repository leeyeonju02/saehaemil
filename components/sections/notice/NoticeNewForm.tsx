"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Link from "next/link";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";

export default function NoticeNewForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const handlePickImages = () => fileInputRef.current?.click();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (selected.length === 0) return;
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeImageAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setSnackbar({
        open: true,
        message: "제목을 입력해 주세요.",
        severity: "info",
      });
      return;
    }
    if (!content.trim()) {
      setSnackbar({
        open: true,
        message: "내용을 입력해 주세요.",
        severity: "info",
      });
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
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          is_pinned: isPinned,
          image_urls: [] as string[],
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

      if (data.id) {
        setSnackbar({
          open: true,
          message: "공지가 등록되었습니다.",
          severity: "success",
        });
        router.push(`/notice/${data.id}`);
        router.refresh();
        return;
      }

      setSnackbar({
        open: true,
        message: "응답이 올바르지 않습니다.",
        severity: "error",
      });
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
          required
          fullWidth
          label="제목"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공지 제목을 입력하세요"
        />

        <TextField
          required
          fullWidth
          multiline
          minRows={10}
          label="내용"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="공지 내용을 입력하세요"
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            이미지 첨부
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFilesChange}
          />
          <Button
            type="button"
            variant="outlined"
            startIcon={<ImageOutlinedIcon />}
            onClick={handlePickImages}
            sx={{ mb: 2 }}
          >
            이미지 선택
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            여러 장 선택 가능합니다. 현재 버전은 본문·고정만 DB에 저장되며, 이미지는 추후 스토리지 연동 예정입니다.
          </Typography>
          {previewUrls.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={2} useFlexGap>
              {previewUrls.map((url, index) => (
                <Box
                  key={`${url}-${index}`}
                  sx={{
                    position: "relative",
                    width: 160,
                    height: 120,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box
                    component="img"
                    src={url}
                    alt=""
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    type="button"
                    size="small"
                    aria-label="이미지 삭제"
                    onClick={() => removeImageAt(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "common.white",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              name="is_pinned"
            />
          }
          label="상단 고정 (목록 최상단에 고정 표시)"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button component={Link} href="/notice" variant="outlined" size="large">
            목록으로
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            startIcon={
              submitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : undefined
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
