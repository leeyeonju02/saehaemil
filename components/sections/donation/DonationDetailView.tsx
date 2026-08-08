"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { Donation } from "@/types/donation";
import DonationDetailGallery from "@/components/sections/donation/DonationDetailGallery";

const GREEN = "#1B5E20";
const GREEN_SOFT = "rgba(27, 94, 32, 0.12)";
const BLUE_SOFT = "rgba(25, 118, 210, 0.12)";
const BLUE = "#1565C0";

type Neighbor = { id: string; title: string } | null;

type Props = {
  donation: Donation;
  prev: Neighbor;
  next: Neighbor;
};

function formatDate(value: string): string {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return value;
  }
}

function formatDateTime(value: string): string {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return value;
  }
}

function typeLabel(type: string): string {
  if (type === "goods") return "물품 후원";
  if (type === "cash") return "현금 후원";
  return type;
}

function statusLabel(status: string): string {
  return status === "completed" ? "수혜 완료" : "진행중";
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "24px 88px 1fr",
        gap: 1.25,
        alignItems: "start",
        py: 0.75,
      }}
    >
      <Box sx={{ color: "text.secondary", display: "flex", pt: 0.2 }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary" sx={{ pt: 0.15 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.6 }}>
        {value}
      </Typography>
    </Box>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: "#fff",
        height: "100%",
      }}
    >
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default function DonationDetailView({ donation, prev, next }: Props) {
  const excerpt =
    donation.donation_content.trim().length > 90
      ? `${donation.donation_content.trim().slice(0, 90)}…`
      : donation.donation_content.trim();

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>
      {/* Breadcrumb + header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "flex-start" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              홈
            </Link>
            {" > "}
            <Link
              href="/donation/records"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              후원·기부금 실적
            </Link>
            {" > "}
            <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
              상세
            </Box>
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1.3 }}>
            후원·기부금 실적 상세
          </Typography>
        </Box>

        <Link href="/donation/records" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<ListAltIcon />}
            sx={{
              alignSelf: { xs: "stretch", sm: "flex-start" },
              borderColor: "divider",
              color: "text.primary",
              bgcolor: "#fff",
            }}
          >
            목록으로 돌아가기
          </Button>
        </Link>
      </Stack>

      {/* Top summary */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          bgcolor: "#fff",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 1fr)" },
            gap: { xs: 2.5, md: 4 },
            alignItems: "start",
          }}
        >
          <DonationDetailGallery
            images={donation.image_urls}
            title={donation.donation_title}
          />

          <Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
              <Chip
                size="small"
                label={typeLabel(donation.donation_type)}
                sx={{ bgcolor: BLUE_SOFT, color: BLUE, fontWeight: 700 }}
              />
              <Chip
                size="small"
                label={statusLabel(donation.status)}
                sx={{ bgcolor: GREEN_SOFT, color: GREEN, fontWeight: 700 }}
              />
            </Stack>

            <Typography variant="h5" fontWeight={800} sx={{ mb: 1, lineHeight: 1.4 }}>
              {donation.donation_title}
            </Typography>
            {excerpt && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                {excerpt}
              </Typography>
            )}

            <Divider sx={{ mb: 1 }} />

            <InfoRow
              icon={<PersonOutlineIcon fontSize="small" />}
              label="후원자명"
              value={donation.donor_name || "-"}
            />
            <InfoRow
              icon={<EventOutlinedIcon fontSize="small" />}
              label="후원 일자"
              value={formatDate(donation.donation_date)}
            />
            <InfoRow
              icon={<GroupsOutlinedIcon fontSize="small" />}
              label="수혜 대상"
              value={donation.beneficiary || "-"}
            />
            <InfoRow
              icon={<VolunteerActivismOutlinedIcon fontSize="small" />}
              label="수혜 내용"
              value={donation.benefit_content || "-"}
            />
            <InfoRow
              icon={<VisibilityOutlinedIcon fontSize="small" />}
              label="공개 여부"
              value={donation.is_public ? "공개" : "비공개"}
            />

            <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 2 }}>
              등록 {formatDateTime(donation.created_at)}
              {"  ·  "}
              수정 {formatDateTime(donation.updated_at)}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Middle two columns */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.5,
          mb: 2.5,
        }}
      >
        <SectionCard title="후원 상세 내용">
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                후원 유형
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {typeLabel(donation.donation_type)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                후원 내용
              </Typography>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", lineHeight: 1.85, mt: 0.5 }}
              >
                {donation.donation_content || "-"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                후원 일자
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatDate(donation.donation_date)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.75 }}>
                진행 상태
              </Typography>
              <Chip
                size="small"
                label={statusLabel(donation.status)}
                sx={{ bgcolor: GREEN_SOFT, color: GREEN, fontWeight: 700 }}
              />
            </Box>
          </Stack>
        </SectionCard>

        <SectionCard title="수혜 정보">
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 0.75 }}>
                수혜 대상
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                {donation.beneficiary || "-"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 0.75 }}>
                수혜 내용
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
                {donation.benefit_content || "-"}
              </Typography>
            </Box>
          </Stack>
        </SectionCard>
      </Box>

      {/* Bottom assets */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.5,
          mb: 4,
        }}
      >
        <SectionCard title="관련 사진">
          {donation.image_urls.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 1.25,
              }}
            >
              {donation.image_urls.map((src, i) => (
                <Box
                  key={`${src}-${i}`}
                  sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    borderRadius: 1.5,
                    overflow: "hidden",
                    bgcolor: "grey.100",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`${donation.donation_title} 관련 사진 ${i + 1}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <ImageOutlinedIcon sx={{ mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">등록된 사진이 없습니다</Typography>
            </Box>
          )}
        </SectionCard>

        <SectionCard title="관련 파일">
          {donation.file_urls.length > 0 ? (
            <Stack spacing={1}>
              {donation.file_urls.map((file, i) => (
                <Box
                  key={`${file.url}-${i}`}
                  component="a"
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: 1.5,
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "grey.50",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { bgcolor: "grey.100" },
                  }}
                >
                  <InsertDriveFileOutlinedIcon sx={{ color: GREEN }} />
                  <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0, fontWeight: 600 }}>
                    {file.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <InsertDriveFileOutlinedIcon sx={{ mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">등록된 파일이 없습니다</Typography>
            </Box>
          )}
        </SectionCard>
      </Box>

      {/* Prev / Next */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        spacing={1.5}
        sx={{ pb: 2 }}
      >
        {prev ? (
          <Link href={`/donation/records/${prev.id}`} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<ChevronLeftIcon />}
              sx={{ minWidth: 180 }}
            >
              이전 후원
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            variant="outlined"
            startIcon={<ChevronLeftIcon />}
            sx={{ minWidth: 180 }}
          >
            이전 후원
          </Button>
        )}
        {next ? (
          <Link href={`/donation/records/${next.id}`} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              endIcon={<ChevronRightIcon />}
              sx={{ minWidth: 180 }}
            >
              다음 후원
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            variant="outlined"
            endIcon={<ChevronRightIcon />}
            sx={{ minWidth: 180 }}
          >
            다음 후원
          </Button>
        )}
      </Stack>
    </Box>
  );
}
