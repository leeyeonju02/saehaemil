import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ChevronRight from "@mui/icons-material/ChevronRight";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import type { Notice } from "@/types/notice";

const ACCENT = "#1B5E20";
const BADGE_BG = "rgba(27, 94, 32, 0.12)";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(d.getDate()).padStart(2, "0")}`;
}

function isNew(iso: string) {
  return Date.now() - new Date(iso).getTime() < 7 * 24 * 60 * 60 * 1000;
}

export default function HomeFoundationNews({ notices }: { notices: Notice[] }) {
  const list = notices.slice(0, 5);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "#F1EEE7",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          gap={2}
          sx={{ mb: { xs: 2.5, md: 3 } }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="overline"
              sx={{
                color: ACCENT,
                fontWeight: 600,
                display: "block",
                letterSpacing: "0.1em",
                fontSize: "0.8125rem",
              }}
            >
              공지사항
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              fontWeight={800}
              sx={{ mt: 0.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}
            >
              재단 소식
            </Typography>
          </Box>
          <Link href="/notice" style={{ textDecoration: "none" }}>
            <Button
              component="span"
              variant="outlined"
              endIcon={<ChevronRight fontSize="small" />}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                bgcolor: "#ffffff",
                borderRadius: 2,
                px: { xs: 1.5, sm: 2 },
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
                fontWeight: 600,
                "&:hover": {
                  borderColor: ACCENT,
                  bgcolor: "#ffffff",
                },
              }}
            >
              전체보기
            </Button>
          </Link>
        </Stack>

        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          {list.length === 0 ? (
            <Box sx={{ py: 4, px: 2, textAlign: "center" }}>
              <Typography color="text.secondary">
                등록된 공지가 없습니다.
              </Typography>
            </Box>
          ) : (
            list.map((notice, index) => (
              <Box key={notice.id}>
                {index > 0 && <Divider />}
                <Link
                  href={`/notice/${notice.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* 모바일: [뱃지 · 날짜] 아래 제목 한 줄 전체 / 데스크톱: 뱃지 · 제목 · 날짜 한 줄 */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "auto 1fr auto",
                        sm: "auto 1fr auto auto",
                      },
                      gridTemplateAreas: {
                        xs: '"chip date arrow" "title title arrow"',
                        sm: '"chip title date arrow"',
                      },
                      alignItems: "center",
                      columnGap: { xs: 1, sm: 2 },
                      rowGap: 0.75,
                      py: { xs: 1.75, sm: 2 },
                      px: { xs: 2, sm: 2.5 },
                      transition: "background-color 0.15s",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <Chip
                      label={notice.is_pinned ? "공지" : "소식"}
                      size="small"
                      sx={{
                        gridArea: "chip",
                        bgcolor: BADGE_BG,
                        color: ACCENT,
                        fontWeight: 700,
                        fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                        height: { xs: 22, sm: 26 },
                        "& .MuiChip-label": { px: { xs: 1, sm: 1.25 } },
                      }}
                    />
                    <Typography
                      component="h3"
                      sx={{
                        gridArea: "title",
                        minWidth: 0,
                        fontWeight: 700,
                        fontSize: { xs: "0.9375rem", sm: "1rem" },
                        lineHeight: 1.5,
                        wordBreak: "keep-all",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {notice.title}
                    </Typography>
                    <Typography
                      component="time"
                      dateTime={notice.created_at}
                      sx={{
                        gridArea: "date",
                        color: "text.secondary",
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(notice.created_at)}
                    </Typography>
                    <ChevronRight
                      sx={{
                        gridArea: "arrow",
                        fontSize: { xs: 20, sm: 22 },
                        color: "action.active",
                      }}
                    />
                  </Box>
                </Link>
              </Box>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
}
