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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";
import { IMAGE_INPUT_ACCEPT, MAX_ORIGINAL_IMAGE_BYTES } from "@/lib/upload/image/config";
import { prepareImageSelection } from "@/lib/upload/image/compress";
import { uploadImages } from "@/lib/upload/image/upload-images";
import type { GalleryAlbum } from "@/lib/gallery-albums";
import {
  clearGalleryNewFormDraft,
  draftEntriesToFiles,
  loadGalleryNewFormDraft,
  saveGalleryNewFormDraft,
  serializeFilesForDraft,
} from "@/lib/gallery-new-draft-storage";

const DRAFT_SAVE_MS = 500;

/** 대표사진 선택 — 기존 사진은 URL, 새로 추가한 사진은 업로드 전이라 순번으로 가리킨다 */
type CoverSelection =
  | { kind: "persisted"; url: string }
  | { kind: "new"; index: number }
  | null;

function getInitialCover(album: GalleryAlbum): CoverSelection {
  const url = album.coverSrc;
  return url && album.images.some((image) => image.src === url)
    ? { kind: "persisted", url }
    : null;
}

type Props = {
  /** `?edit=id` 로 열었을 때 서버에서 전달된 DB 앨범 (없으면 신규) */
  initialAlbum: GalleryAlbum | null;
};

export default function GalleryNewForm({ initialAlbum }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const suppressDraftSaveRef = useRef(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [persistedImageUrls, setPersistedImageUrls] = useState<string[]>([]);
  const [cover, setCover] = useState<CoverSelection>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [draftRestored, setDraftRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preparingImages, setPreparingImages] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "info" });

  useEffect(() => {
    if (initialAlbum) {
      suppressDraftSaveRef.current = true;
      clearGalleryNewFormDraft();
      setTitle(initialAlbum.title);
      setContent(initialAlbum.content);
      setActivityDate(initialAlbum.activityDate.slice(0, 10));
      setPersistedImageUrls(initialAlbum.images.map((i) => i.src));
      setCover(getInitialCover(initialAlbum));
      setEditingId(initialAlbum.id);
      setFiles([]);
      setDraftRestored(true);
      return;
    }
    setEditingId(null);
    setPersistedImageUrls([]);
    setCover(null);
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
  }, [initialAlbum]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  useEffect(() => {
    if (initialAlbum) return;
    if (!draftRestored || submitting || suppressDraftSaveRef.current) return;
    if (!title && !content && !activityDate && files.length === 0) {
      clearGalleryNewFormDraft();
      return;
    }
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
  }, [
    initialAlbum,
    draftRestored,
    submitting,
    title,
    content,
    activityDate,
    files,
  ]);

  const handleReset = () => {
    if (initialAlbum) {
      setTitle(initialAlbum.title);
      setContent(initialAlbum.content);
      setActivityDate(initialAlbum.activityDate.slice(0, 10));
      setPersistedImageUrls(initialAlbum.images.map((i) => i.src));
      setCover(getInitialCover(initialAlbum));
    } else {
      setTitle("");
      setContent("");
      setActivityDate("");
      clearGalleryNewFormDraft();
    }
    setFiles([]);
    if (initialAlbum == null) setCover(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setResetOpen(false);
    setSnackbar({
      open: true,
      message: "내용이 초기화되었습니다.",
      severity: "info",
    });
  };

  const handlePickImages = () => fileInputRef.current?.click();

  // 이미지 용량 제한
  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (picked.length === 0) return;
    setPreparingImages(true);
    const { files: selected, error } = await prepareImageSelection(picked);
    setPreparingImages(false);
    if (error) {
      setSnackbar({ open: true, message: error, severity: "error" });
    }
    if (selected.length > 0) {
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeImageAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setCover((prev) => {
      if (prev?.kind !== "new") return prev;
      if (prev.index === index) return null;
      return prev.index > index ? { kind: "new", index: prev.index - 1 } : prev;
    });
  };

  const removePersistedImageAt = (index: number) => {
    const url = persistedImageUrls[index];
    setPersistedImageUrls((prev) => prev.filter((_, i) => i !== index));
    setCover((prev) => (prev?.kind === "persisted" && prev.url === url ? null : prev));
  };

  const isPersistedCover = (url: string) => cover?.kind === "persisted" && cover.url === url;
  const isNewCover = (index: number) => cover?.kind === "new" && cover.index === index;

  const togglePersistedCover = (url: string) => {
    setCover(isPersistedCover(url) ? null : { kind: "persisted", url });
  };

  const toggleNewCover = (index: number) => {
    setCover(isNewCover(index) ? null : { kind: "new", index });
  };

  const renderCoverToggle = (selected: boolean, onClick: () => void) => (
    <>
      <IconButton
        type="button"
        size="small"
        aria-label={selected ? "대표사진 선택 해제" : "대표사진으로 선택"}
        aria-pressed={selected}
        onClick={onClick}
        disabled={submitting}
        sx={{
          position: "absolute",
          top: 4,
          left: 4,
          bgcolor: "rgba(0,0,0,0.5)",
          color: selected ? "warning.light" : "common.white",
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
      >
        {selected ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
      </IconButton>
      {selected && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            py: 0.25,
            textAlign: "center",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 600,
          }}
        >
          대표사진
        </Typography>
      )}
    </>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t) {
      setSnackbar({
        open: true,
        message: "제목을 입력해 주세요.",
        severity: "info",
      });
      return;
    }
    if (!c) {
      setSnackbar({
        open: true,
        message: "내용을 입력해 주세요.",
        severity: "info",
      });
      return;
    }
    if (!activityDate) {
      setSnackbar({
        open: true,
        message: "활동 날짜를 선택해 주세요.",
        severity: "info",
      });
      return;
    }
    const isEdit = Boolean(editingId);
    if (isEdit) {
      if (persistedImageUrls.length === 0 && files.length === 0) {
        setSnackbar({
          open: true,
          message: "이미지를 한 장 이상 유지하거나 새로 추가해 주세요.",
          severity: "info",
        });
        return;
      }
    } else if (files.length === 0) {
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
      const isEdit = Boolean(editingId);
      let imageUrls: string[];
      let newUrls: string[] = [];
      if (files.length > 0) {
        console.log(
          "[gallery-flow] 1 시작 — 이미지 업로드(발급→Storage 직접 업로드)",
          { fileCount: files.length }
        );
        const fromStorage = await uploadImages(files, {
          purpose: "gallery",
          adminPassword,
        });
        newUrls = fromStorage.map((row) => row.url);
        console.log("[gallery-flow] 1 완료 — 공개 URL 확보", {
          urlCount: newUrls.length,
          urls: newUrls,
        });
        imageUrls = isEdit ? [...persistedImageUrls, ...newUrls] : newUrls;
      } else {
        imageUrls = [...persistedImageUrls];
      }

      const saveRes = await fetch(
        isEdit ? `/api/gallery/${editingId}` : "/api/gallery",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            content: c,
            activity_date: activityDate,
            images: imageUrls,
            pin:
              cover?.kind === "persisted"
                ? cover.url
                : cover?.kind === "new"
                  ? (newUrls[cover.index] ?? null)
                  : null,
            adminPassword,
          }),
        }
      );
      const saveJson = (await saveRes.json()) as {
        error?: string;
        id?: string;
      };

      const resultId = saveJson.id ?? (isEdit ? editingId : undefined);
      if (!saveRes.ok || !resultId) {
        throw new Error(saveJson.error ?? "갤러리 저장에 실패했습니다.");
      }

      console.log("[gallery-flow] 4 완료 — DB 저장 성공", { id: resultId });

      suppressDraftSaveRef.current = true;
      clearGalleryNewFormDraft();

      setSnackbar({
        open: true,
        message: isEdit ? "앨범이 수정되었습니다." : "앨범이 저장되었습니다.",
        severity: "success",
      });
      router.push(`/gallery/${resultId}`);
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
        작성 중인 내용은 이 브라우저에 임시 저장됩니다. 앨범 저장에 성공하면
        임시 저장이 삭제됩니다.
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
            accept={IMAGE_INPUT_ACCEPT}
            multiple
            hidden
            onChange={handleFilesChange}
          />
          <Button
            type="button"
            variant="outlined"
            startIcon={
              preparingImages ? <CircularProgress size={18} color="inherit" /> : <ImageOutlinedIcon />
            }
            onClick={handlePickImages}
            disabled={submitting || preparingImages}
            sx={{ mb: 1 }}
          >
            {preparingImages ? "이미지 줄이는 중…" : "이미지 선택"}
          </Button>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            여러 장 선택 가능 · 파일당 최대 {MAX_ORIGINAL_IMAGE_BYTES / 1024 / 1024}MB
            (JPEG, PNG, GIF, WEBP) · 큰 사진은 자동으로 줄여서 올립니다
            <br />
            사진의 ☆ 버튼을 눌러 대표사진을 선택할 수 있습니다. 선택하지 않으면 첫 번째 사진이
            대표사진이 됩니다.
          </Typography>
          {persistedImageUrls.length > 0 && (
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={2}
              useFlexGap
              sx={{ mb: 2 }}
            >
              {persistedImageUrls.map((url, index) => (
                <Box
                  key={`${url}-${index}`}
                  sx={{
                    position: "relative",
                    width: 160,
                    height: 120,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: isPersistedCover(url) ? 2 : 1,
                    borderColor: isPersistedCover(url) ? "primary.main" : "divider",
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
                    onClick={() => removePersistedImageAt(index)}
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
                  {renderCoverToggle(isPersistedCover(url), () => togglePersistedCover(url))}
                </Box>
              ))}
            </Stack>
          )}
          {previewUrls.length > 0 && (
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={2}
              useFlexGap
              sx={{ mt: 1 }}
            >
              {previewUrls.map((url, index) => (
                <Box
                  key={`${url}-${index}`}
                  sx={{
                    position: "relative",
                    width: 160,
                    height: 120,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: isNewCover(index) ? 2 : 1,
                    borderColor: isNewCover(index) ? "primary.main" : "divider",
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
                  {renderCoverToggle(isNewCover(index), () => toggleNewCover(index))}
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button
            type="button"
            color="error"
            variant="outlined"
            disabled={submitting}
            onClick={() => setResetOpen(true)}
            sx={{ mr: "auto" }}
          >
            내용 초기화
          </Button>
          <Button
            type="button"
            variant="outlined"
            disabled={submitting}
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || preparingImages}
            startIcon={
              submitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : undefined
            }
          >
            {submitting ? "업로드 중…" : editingId ? "변경 저장" : "앨범 저장"}
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

      <Dialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>내용 초기화</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {initialAlbum
              ? "수정한 내용을 모두 되돌리고 원래 앨범 내용으로 초기화합니다. 계속하시겠습니까?"
              : "작성 중인 내용과 임시 저장을 모두 삭제합니다. 되돌릴 수 없습니다. 계속하시겠습니까?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setResetOpen(false)}>취소</Button>
          <Button color="error" variant="contained" onClick={handleReset}>
            초기화
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
