"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";
import { MAX_IMAGE_BYTES } from "@/lib/storage/image-upload-config";
import { uploadGalleryImagesToSupabase } from "@/lib/gallery/upload-images-to-supabase";
import {
  clearGalleryNewFormDraft,
  draftEntriesToFiles,
  loadGalleryNewFormDraft,
  saveGalleryNewFormDraft,
  serializeFilesForDraft,
} from "@/lib/gallery-new-draft-storage";

const DRAFT_SAVE_MS = 500;

export default function GalleryNewForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const suppressDraftSaveRef = useRef(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [draftRestored, setDraftRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "info" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const d = loadGalleryNewFormDraft();
      if (!d) {
        if (!cancelled) setDraftRestored(true);
        return;
      }
      setTitle(d.title);
      setContent(d.content);
      setActivityDate(d.activityDate);
      if (d.files.length > 0) {
        try {
          const restored = await draftEntriesToFiles(d.files);
          if (!cancelled) setFiles(restored);
        } catch {
          /* 복원 실패 시 텍스트만 */
        }
      }
      if (!cancelled) setDraftRestored(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  useEffect(() => {
    if (!draftRestored || submitting || suppressDraftSaveRef.current) return;
    const id = window.setTimeout(() => {
      void (async () => {
        try {
          const fileEntries =
            files.length > 0 ? await serializeFilesForDraft(files) : [];
          saveGalleryNewFormDraft({
            v: 1,
            title,
            content,
            activityDate,
            files: fileEntries,
          });
        } catch {
          saveGalleryNewFormDraft({
            v: 1,
            title,
            content,
            activityDate,
            files: [],
          });
        }
      })();
    }, DRAFT_SAVE_MS);
    return () => window.clearTimeout(id);
  }, [draftRestored, submitting, title, content, activityDate, files]);

  const handlePickImages = () => fileInputRef.current?.click();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (selected.length === 0) return;
    const oversized = selected.find((f) => f.size > MAX_IMAGE_BYTES);
    if (oversized) {
      setSnackbar({
        open: true,
        message: `파일당 최대 ${MAX_IMAGE_BYTES / 1024 / 1024}MB까지 업로드할 수 있습니다. (${oversized.name})`,
        severity: "error",
      });
      e.target.value = "";
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeImageAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t) {
      setSnackbar({ open: true, message: "제목을 입력해 주세요.", severity: "info" });
      return;
    }
    if (!c) {
      setSnackbar({ open: true, message: "내용을 입력해 주세요.", severity: "info" });
      return;
    }
    if (!activityDate) {
      setSnackbar({ open: true, message: "활동 날짜를 선택해 주세요.", severity: "info" });
      return;
    }
    if (files.length === 0) {
      setSnackbar({
        open: true,
        message: "이미지를 한 장 이상 선택해 주세요.",
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
          "업로드 인증이 없습니다. 로그아웃 후 관리자 계정으로 다시 로그인해 주세요.",
        severity: "error",
      });
      return;
    }

    setSubmitting(true);
    try {
      console.log(
        "[gallery-flow] 1 시작 — 이미지 업로드(발급→Storage 직접 업로드)",
        { fileCount: files.length }
      );
      const fromStorage = await uploadGalleryImagesToSupabase(files, adminPassword);
      const imageUrls = fromStorage.map((row) => row.url);
      console.log("[gallery-flow] 1 완료 — 공개 URL 확보", {
        urlCount: imageUrls.length,
        urls: imageUrls,
      });

      console.log("[gallery-flow] 4 요청 — DB 저장 POST /api/gallery", {
        title: t,
        activity_date: activityDate,
        imageCount: imageUrls.length,
      });
      const saveRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: t,
          content: c,
          activity_date: activityDate,
          images: imageUrls,
          adminPassword,
        }),
      });
      const saveJson = (await saveRes.json()) as { error?: string; id?: string };

      if (!saveRes.ok || !saveJson.id) {
        throw new Error(saveJson.error ?? "갤러리 저장에 실패했습니다.");
      }

      console.log("[gallery-flow] 4 완료 — DB 저장 성공", { id: saveJson.id });

      suppressDraftSaveRef.current = true;
      clearGalleryNewFormDraft();

      setSnackbar({ open: true, message: "앨범이 저장되었습니다.", severity: "success" });
      router.push(`/gallery/${saveJson.id}`);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "네트워크 오류가 발생했습니다.";
      setSnackbar({
        open: true,
        message,
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
      sx={{
        maxWidth: 720,
        mx: "auto",
        bgcolor: "#fff",
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        작성 중인 내용은 이 브라우저에 임시 저장됩니다. 앨범 저장에 성공하면 임시 저장이 삭제됩니다.
      </Typography>
      <Stack spacing={2.5}>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          disabled={submitting}
        />
        <TextField
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
          multiline
          minRows={6}
          disabled={submitting}
        />
        <TextField
          label="활동 날짜"
          type="date"
          value={activityDate}
          onChange={(e) => setActivityDate(e.target.value)}
          required
          fullWidth
          disabled={submitting}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            사진
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            hidden
            onChange={handleFilesChange}
          />
          <Button
            type="button"
            variant="outlined"
            startIcon={<ImageOutlinedIcon />}
            onClick={handlePickImages}
            disabled={submitting}
            sx={{ mb: 1 }}
          >
            이미지 선택
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            여러 장 선택 가능 · 파일당 최대 {MAX_IMAGE_BYTES / 1024 / 1024}MB (JPEG, PNG, GIF,
            WEBP)
          </Typography>
          {previewUrls.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={2} useFlexGap sx={{ mt: 1 }}>
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
                    disabled={submitting}
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

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button type="button" variant="outlined" disabled={submitting} onClick={() => router.back()}>
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : undefined}
          >
            {submitting ? "업로드 중…" : "앨범 저장"}
          </Button>
        </Stack>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
