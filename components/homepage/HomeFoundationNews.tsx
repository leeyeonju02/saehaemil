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
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
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
          flexWrap="wrap"
          gap={2}
          sx={{ mb: 3 }}
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
                px: 2,
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
              <Typography color="text.secondary">등록된 공지가 없습니다.</Typography>
            </Box>
          ) : (
            list.map((notice, index) => (
              <Box key={notice.id}>
                {index > 0 && <Divider />}
                <Link
                  href={`/notice/${notice.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.5, sm: 2 },
                    py: { xs: 1.75, sm: 2 },
                    px: { xs: 2, sm: 2.5 },
                    flexWrap: { xs: "wrap", sm: "nowrap" },
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
                      bgcolor: BADGE_BG,
                      color: ACCENT,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      height: 26,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {notice.title}
                      </Typography>
                      {isNew(notice.created_at) && (
                        <Chip
                          icon={
                            <NotificationsNone sx={{ fontSize: "16px !important", color: "#d32f2f !important" }} />
                          }
                          label="NEW"
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            color: "#d32f2f",
                            bgcolor: "rgba(211, 47, 47, 0.08)",
                            border: "1px solid rgba(211, 47, 47, 0.25)",
                            "& .MuiChip-icon": { ml: "4px" },
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ flexShrink: 0, color: "text.secondary" }}
                  >
                    <CalendarToday sx={{ fontSize: 18 }} />
                    <Typography variant="body2" component="span" sx={{ whiteSpace: "nowrap" }}>
                      {formatDate(notice.created_at)}
                    </Typography>
                    <ChevronRight sx={{ fontSize: 22, color: "action.active", ml: 0.5 }} />
                  </Stack>
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
