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
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Link from "next/link";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";
import type { Notice, NoticeAttachment } from "@/types/notice";
import { MAX_IMAGE_BYTES } from "@/lib/storage/image-upload-config";
import {
  ALLOWED_NOTICE_FILE_EXTENSIONS,
  MAX_NOTICE_FILE_BYTES,
} from "@/lib/storage/notice-file-upload-config";
import { uploadNoticeMediaToSupabase } from "@/lib/notices/upload-notice-media-to-supabase";

type Props = {
  /** 수정 모드일 때 서버에서 전달된 공지 (없으면 신규 작성) */
  initialNotice: Notice | null;
};

function isAllowedNoticeDocFile(file: File): boolean {
  const part = file.name.trim().split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_NOTICE_FILE_EXTENSIONS.has(part);
}

export default function NoticeNewForm({ initialNotice }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [persistedImageUrls, setPersistedImageUrls] = useState<string[]>([]);
  const [persistedAttachments, setPersistedAttachments] = useState<NoticeAttachment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [docFiles, setDocFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (initialNotice) {
      setTitle(initialNotice.title);
      setContent(initialNotice.content);
      setIsPinned(initialNotice.is_pinned);
      setPersistedImageUrls([...initialNotice.image_urls]);
      setPersistedAttachments([...initialNotice.attachments]);
      setEditingId(initialNotice.id);
    } else {
      setTitle("");
      setContent("");
      setIsPinned(false);
      setPersistedImageUrls([]);
      setPersistedAttachments([]);
      setEditingId(null);
    }
    setFiles([]);
    setDocFiles([]);
  }, [initialNotice]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const handlePickImages = () => fileInputRef.current?.click();
  const handlePickDocs = () => docInputRef.current?.click();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (selected.length === 0) return;
    const oversized = selected.find((f) => f.size > MAX_IMAGE_BYTES);
    if (oversized) {
      setSnackbar({
        open: true,
        message: `이미지는 ${MAX_IMAGE_BYTES / 1024 / 1024}MB 이하여야 합니다. (${oversized.name})`,
        severity: "error",
      });
      e.target.value = "";
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter(isAllowedNoticeDocFile);
    if (selected.length === 0) {
      setSnackbar({
        open: true,
        message: "허용된 형식만 선택할 수 있습니다. (pdf, xlsx, xls, hwp, hwpx, doc, docx, ppt, pptx)",
        severity: "info",
      });
      e.target.value = "";
      return;
    }
    const oversized = selected.find((f) => f.size > MAX_NOTICE_FILE_BYTES);
    if (oversized) {
      setSnackbar({
        open: true,
        message: `첨부는 ${MAX_NOTICE_FILE_BYTES / 1024 / 1024}MB 이하여야 합니다. (${oversized.name})`,
        severity: "error",
      });
      e.target.value = "";
      return;
    }
    setDocFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeImageAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocAt = (index: number) => {
    setDocFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removePersistedAttachmentAt = (index: number) => {
    setPersistedAttachments((prev) => prev.filter((_, i) => i !== index));
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
      const isEdit = Boolean(editingId);
      let image_urls: string[];
      let file_urls: { label: string; url: string }[];

      try {
        const uploadedImages =
          files.length > 0
            ? await uploadNoticeMediaToSupabase(files, adminPassword, "image")
            : [];
        const uploadedDocs =
          docFiles.length > 0
            ? await uploadNoticeMediaToSupabase(docFiles, adminPassword, "file")
            : [];

        image_urls = isEdit
          ? [...persistedImageUrls, ...uploadedImages.map((u) => u.url)]
          : uploadedImages.map((u) => u.url);
        const newDocEntries = uploadedDocs.map((u) => ({ label: u.filename, url: u.url }));
        file_urls = isEdit ? [...persistedAttachments, ...newDocEntries] : newDocEntries;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "파일 업로드에 실패했습니다.";
        setSnackbar({ open: true, message: msg, severity: "error" });
        return;
      }

      const res = await fetch(isEdit ? `/api/notices/${editingId}` : "/api/notices", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          is_pinned: isPinned,
          image_urls,
          file_urls,
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

      const resultId = data.id ?? (isEdit ? editingId : undefined);
      if (resultId) {
        setSnackbar({
          open: true,
          message: isEdit ? "공지가 수정되었습니다." : "공지가 등록되었습니다.",
          severity: "success",
        });
        router.push(`/notice/${resultId}`);
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
            여러 장 선택 가능합니다. 등록 시 Supabase Storage에 업로드됩니다 (이미지당 최대{" "}
            {MAX_IMAGE_BYTES / 1024 / 1024}MB).
          </Typography>
          {persistedImageUrls.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={2} useFlexGap sx={{ mb: 2 }}>
              {persistedImageUrls.map((url, index) => (
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
                    aria-label="저장된 이미지 제거"
                    onClick={() =>
                      setPersistedImageUrls((prev) => prev.filter((_, i) => i !== index))
                    }
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

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            문서 첨부 (hwp, xlsx, pdf 등)
          </Typography>
          <input
            ref={docInputRef}
            type="file"
            accept={[
              ".pdf",
              ".xlsx",
              ".xls",
              ".hwp",
              ".hwpx",
              ".doc",
              ".docx",
              ".ppt",
              ".pptx",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/vnd.ms-excel",
            ].join(",")}
            multiple
            hidden
            onChange={handleDocsChange}
          />
          <Button
            type="button"
            variant="outlined"
            startIcon={<InsertDriveFileOutlinedIcon />}
            onClick={handlePickDocs}
            sx={{ mb: 2 }}
          >
            파일 선택
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            여러 파일 선택 가능합니다.             갤러리 사진과 동일하게 서명 URL로 Storage에 올린 뒤, DB file_urls 컬럼에 label·url 배열로
            저장됩니다 (파일당 최대 {MAX_NOTICE_FILE_BYTES / 1024 / 1024}MB).
          </Typography>
          {persistedAttachments.length > 0 && (
            <Stack spacing={0.75} sx={{ mb: 2 }}>
              {persistedAttachments.map((att, index) => (
                <Box
                  key={`${att.url}-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    py: 0.75,
                    px: 1.5,
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "grey.50",
                  }}
                >
                  <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0 }}>
                    {att.label}
                  </Typography>
                  <IconButton
                    type="button"
                    size="small"
                    aria-label="첨부 제거"
                    onClick={() => removePersistedAttachmentAt(index)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}
          {docFiles.length > 0 && (
            <Stack spacing={0.75}>
              {docFiles.map((file, index) => (
                <Box
                  key={`${file.name}-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    py: 0.75,
                    px: 1.5,
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0 }}>
                    {file.name}
                  </Typography>
                  <IconButton
                    type="button"
                    size="small"
                    aria-label="선택한 파일 제거"
                    onClick={() => removeDocAt(index)}
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
            {submitting ? (editingId ? "저장 중…" : "등록 중…") : editingId ? "저장하기" : "등록하기"}
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
