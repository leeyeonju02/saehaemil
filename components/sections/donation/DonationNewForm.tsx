"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Link from "next/link";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";

type DonationType = "cash" | "goods";
type DonationStatus = "in_progress" | "completed";

export default function DonationNewForm() {
  const router = useRouter();

  const [donorName, setDonorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationType, setDonationType] = useState<DonationType>("cash");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [benefitContent, setBenefitContent] = useState("");
  const [status, setStatus] = useState<DonationStatus>("in_progress");
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "info" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnonymous && !donorName.trim()) {
      setSnackbar({
        open: true,
        message: "후원자명을 입력해 주세요.",
        severity: "info",
      });
      return;
    }
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
    if (!donationDate.trim()) {
      setSnackbar({
        open: true,
        message: "후원 날짜를 입력해 주세요.",
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
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: donorName.trim(),
          is_anonymous: isAnonymous,
          donation_type: donationType,
          donation_title: title.trim(),
          donation_content: content.trim(),
          donation_date: donationDate.trim(),
          beneficiary: beneficiary.trim(),
          benefit_content: benefitContent.trim(),
          status,
          is_public: isPublic,
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

      setSnackbar({
        open: true,
        message: "후원 내역이 등록되었습니다.",
        severity: "success",
      });
      router.push("/donation/records");
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
        <Typography variant="body2" color="text.secondary">
          후원/기부금 실적 내역을 작성합니다. (이미지·파일 업로드는 추후 연결됩니다)
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            required={!isAnonymous}
            fullWidth
            label="후원자명"
            value={isAnonymous ? "" : donorName}
            onChange={(e) => setDonorName(e.target.value)}
            disabled={isAnonymous || submitting}
            placeholder={isAnonymous ? "익명" : "예: 홍길동, ○○기업"}
            sx={{ flex: 1 }}
          />
          <FormControlLabel
            sx={{ flexShrink: 0, ml: { sm: 0.5 }, mr: 0 }}
            control={
              <Checkbox
                checked={isAnonymous}
                disabled={submitting}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsAnonymous(checked);
                  if (checked) setDonorName("");
                }}
              />
            }
            label="익명"
          />
        </Stack>

        <FormControl component="fieldset" disabled={submitting}>
          <FormLabel component="legend" sx={{ mb: 0.5, fontWeight: 600 }}>
            후원 타입
          </FormLabel>
          <RadioGroup
            row
            value={donationType}
            onChange={(e) => setDonationType(e.target.value as DonationType)}
          >
            <FormControlLabel value="cash" control={<Radio />} label="현금" />
            <FormControlLabel value="goods" control={<Radio />} label="물품" />
          </RadioGroup>
        </FormControl>

        <TextField
          required
          fullWidth
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          placeholder="후원 내역 제목을 입력하세요"
        />

        <TextField
          required
          fullWidth
          multiline
          minRows={6}
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
          placeholder="후원 관련 내용을 작성해 주세요"
        />

        <TextField
          required
          fullWidth
          label="후원 날짜"
          type="date"
          value={donationDate}
          onChange={(e) => setDonationDate(e.target.value)}
          disabled={submitting}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="수혜대상 (선택)"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
          disabled={submitting}
          placeholder="예: 장애인 이용자, ○○프로그램 참여자"
        />

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="수혜내용 (선택)"
          value={benefitContent}
          onChange={(e) => setBenefitContent(e.target.value)}
          disabled={submitting}
          placeholder="수혜 내용과 사용 내역을 작성해 주세요"
        />

        <FormControl component="fieldset" disabled={submitting}>
          <FormLabel component="legend" sx={{ mb: 0.5, fontWeight: 600 }}>
            진행상태 (선택)
          </FormLabel>
          <RadioGroup
            row
            value={status}
            onChange={(e) => setStatus(e.target.value as DonationStatus)}
          >
            <FormControlLabel
              value="in_progress"
              control={<Radio />}
              label="진행중"
            />
            <FormControlLabel value="completed" control={<Radio />} label="완료" />
          </RadioGroup>
        </FormControl>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            이미지 업로드 (추후 연결)
          </Typography>
          <Button
            type="button"
            variant="outlined"
            startIcon={<ImageOutlinedIcon />}
            disabled
            sx={{ mb: 1 }}
          >
            이미지 선택
          </Button>
          <Typography variant="caption" color="text.secondary" display="block">
            이미지 업로드는 이후 단계에서 연결됩니다.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            파일 업로드 (추후 연결)
          </Typography>
          <Button
            type="button"
            variant="outlined"
            startIcon={<InsertDriveFileOutlinedIcon />}
            disabled
            sx={{ mb: 1 }}
          >
            파일 선택
          </Button>
          <Typography variant="caption" color="text.secondary" display="block">
            파일 업로드는 이후 단계에서 연결됩니다.
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              disabled={submitting}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          }
          label="공개 여부 (체크 시 웹에 공개)"
        />

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button
            component={Link}
            href="/donation/records"
            variant="outlined"
            disabled={submitting}
          >
            목록으로
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            startIcon={
              submitting ? <CircularProgress size={16} color="inherit" /> : undefined
            }
          >
            {submitting ? "등록 중…" : "등록"}
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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
