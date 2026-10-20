import { Box, Stack, Typography } from "@mui/material";
import { NEWS_ACCENT } from "@/components/sections/news/news-style";
import { formatNewsRelativeDate, getNewsDomain } from "@/lib/news";
import type { News } from "@/types/news";

type Props = {
  news: News;
  /** 사진 위에 올릴 때 (흰 글씨) */
  onImage?: boolean;
};

/** 언론사 · 발행 시각 한 줄 */
export default function NewsMeta({ news, onImage = false }: Props) {
  const date = formatNewsRelativeDate(news.published_at);
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
      <Typography
        component="span"
        noWrap
        sx={{
          fontSize: "0.75rem",
          fontWeight: 800,
          letterSpacing: "0.04em",
          color: onImage ? "#fff" : NEWS_ACCENT,
          ...(onImage && {
            px: 1.25,
            py: 0.375,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
          }),
        }}
      >
        {news.source_name ?? getNewsDomain(news.url)}
      </Typography>
      {date && (
        <>
          {!onImage && (
            <Box component="span" sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
          )}
          <Typography
            component="span"
            sx={{
              fontSize: "0.75rem",
              color: onImage ? "rgba(255,255,255,0.8)" : "text.secondary",
              flexShrink: 0,
            }}
          >
            {date}
          </Typography>
        </>
      )}
    </Stack>
  );
}
