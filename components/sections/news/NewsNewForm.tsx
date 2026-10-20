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
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Link from "next/link";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";
import { toKstDateString } from "@/lib/link-preview/date";
import type { LinkPreview } from "@/lib/link-preview/types";

/** http(s) 주소인지 확인 */
function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** 로그인 때 저장해 둔 관리자 비밀번호 (없으면 null) */
function getAdminPassword(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_PW_SESSION_KEY);
  } catch {
    return null;
  }
}

const NO_ADMIN_AUTH_MESSAGE =
  "등록 인증이 없습니다. 로그아웃 후 관리자 계정으로 다시 로그인해 주세요.";

export default function NewsNewForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sourceName, setSourceName] = useState("");
  /** YYYY-MM-DD (input type="date") */
  const [publishedAt, setPublishedAt] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scraping, setScraping] = useState(false);
  /** 불러오지 못한 썸네일 주소 — 주소가 바뀌면 자동으로 다시 시도된다 */
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "success" });

  const trimmedUrl = url.trim();
  const urlError = trimmedUrl.length > 0 && !isHttpUrl(trimmedUrl);
  const trimmedImageUrl = imageUrl.trim();
  const imageUrlError = trimmedImageUrl.length > 0 && !isHttpUrl(trimmedImageUrl);

  /** 기사 링크를 스크랩해서 입력란을 채운다 (DB 저장은 하지 않음) */
  const handleScrape = async () => {
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

    const adminPassword = getAdminPassword();
    if (!adminPassword) {
      setSnackbar({ open: true, message: NO_ADMIN_AUTH_MESSAGE, severity: "error" });
      return;
    }

    setScraping(true);
    try {
      const res = await fetch("/api/news/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl, adminPassword }),
      });
      const data = (await res.json()) as { error?: string; preview?: LinkPreview };

      if (!res.ok || !data.preview) {
        setSnackbar({
          open: true,
          message: data.error ?? "기사 정보를 가져오지 못했습니다. 직접 입력해 주세요.",
          severity: "error",
        });
        return;
      }

      // 스크랩한 값으로 덮어쓰되, 찾지 못한 항목은 입력해 둔 값을 그대로 둔다
      const p = data.preview;
      setUrl(p.url);
      if (p.title) setTitle(p.title);
      if (p.description) setDescription(p.description);
      if (p.image_url) setImageUrl(p.image_url);
      if (p.source_name) setSourceName(p.source_name);
      if (p.published_at) setPublishedAt(toKstDateString(p.published_at));

      setSnackbar({
        open: true,
        message: "기사 정보를 가져왔습니다. 내용을 확인한 뒤 등록해 주세요.",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "네트워크 오류가 발생했습니다.",
        severity: "error",
      });
    } finally {
      setScraping(false);
    }
  };

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

    const adminPassword = getAdminPassword();
    if (!adminPassword) {
      setSnackbar({ open: true, message: NO_ADMIN_AUTH_MESSAGE, severity: "error" });
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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2 }} alignItems="flex-start">
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
                : "기사 주소를 붙여 넣고 스크랩을 누르면 아래 칸이 자동으로 채워집니다."
            }
          />
          <Button
            type="button"
            variant="outlined"
            onClick={handleScrape}
            disabled={scraping || submitting || !trimmedUrl || urlError}
            startIcon={
              scraping ? <CircularProgress size={18} color="inherit" /> : <TravelExploreIcon />
            }
            sx={{
              flexShrink: 0,
              height: 56, // TextField 기본 높이와 맞춤
              width: { xs: "100%", sm: "auto" },
              whiteSpace: "nowrap",
            }}
          >
            {scraping ? "스크랩 중…" : "스크랩"}
          </Button>
        </Stack>

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

        {trimmedImageUrl && !imageUrlError && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              썸네일 미리보기
            </Typography>
            {failedImageUrl === trimmedImageUrl ? (
              <Box
                sx={{
                  width: { xs: "100%", sm: 320 },
                  aspectRatio: "1.91 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  bgcolor: "grey.100",
                  px: 2,
                }}
              >
                <Typography variant="caption" color="text.secondary" align="center">
                  이미지를 불러올 수 없습니다. 주소를 확인해 주세요.
                </Typography>
              </Box>
            ) : (
              <Box
                component="img"
                src={trimmedImageUrl}
                alt="썸네일 미리보기"
                // 다른 사이트에서 이미지를 띄우는 걸 막는 언론사 대비 (Referer 를 보내지 않음)
                referrerPolicy="no-referrer"
                onError={() => setFailedImageUrl(trimmedImageUrl)}
                sx={{
                  display: "block",
                  width: { xs: "100%", sm: 320 },
                  aspectRatio: "1.91 / 1", // og:image 권장 비율
                  objectFit: "cover",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  bgcolor: "grey.100",
                }}
              />
            )}
          </Box>
        )}

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
            disabled={submitting || scraping}
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
