import { Box, Stack, Typography } from "@mui/material";
import { NEWS_ACCENT, NEWS_INK, formatTodayKst } from "@/components/sections/news/news-style";

type Props = {
  /** 제호 (큰 제목) */
  title: string;
  /** 제호 옆 작은 꼬리표 */
  kicker?: string;
  /** 오른쪽 끝 (전체보기 링크, 기사 수 등) */
  action?: React.ReactNode;
  /** 제목 태그 — 페이지 안 위치에 맞게 */
  component?: "h1" | "h2";
};

/** 신문 제호 — 굵은 선과 가는 선 사이에 이름 · 날짜 */
export default function NewsMasthead({ title, kicker, action, component = "h2" }: Props) {
  return (
    <Box sx={{ borderTop: `4px solid ${NEWS_INK}`, mb: { xs: 3, md: 4 } }}>
      <Box sx={{ mt: "3px", borderTop: `1px solid ${NEWS_INK}`, borderBottom: `1px solid ${NEWS_INK}` }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1.5}
          sx={{ py: { xs: 1.25, md: 1.5 } }}
        >
          <Stack direction="row" alignItems="baseline" gap={1.5} flexWrap="wrap" sx={{ minWidth: 0 }}>
            <Typography
              component={component}
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.5rem", md: "2rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: NEWS_INK,
              }}
            >
              {title}
            </Typography>
            {kicker && (
              <Typography
                component="span"
                sx={{ color: NEWS_ACCENT, fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.18em" }}
              >
                {kicker}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              component="span"
              sx={{ color: "text.secondary", fontSize: "0.8125rem", display: { xs: "none", sm: "inline" } }}
            >
              {formatTodayKst()}
            </Typography>
            {action}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
