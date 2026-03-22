"use client";

import { useEffect, useRef, useState } from "react";
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
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Link from "next/link";

export default function NoticeNewForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info";
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

  const handleSubmit = (e: React.FormEvent) => {
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
    // TODO: API로 title, content, files(File[]), isPinned 전송
    setSnackbar({
      open: true,
      message:
        "폼 검증을 통과했습니다. 실제 등록·저장은 API 연동 후 가능합니다.",
      severity: "success",
    });
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
            여러 장 선택 가능합니다. (저장 시 서버 업로드 로직이 필요합니다.)
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
          <Button type="submit" variant="contained" size="large">
            등록하기
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
