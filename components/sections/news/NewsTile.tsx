import { Box, Typography } from "@mui/material";
import NewsMeta from "@/components/sections/news/NewsMeta";
import NewsThumbnail from "@/components/sections/news/NewsThumbnail";
import {
  NEWS_INK,
  articleLinkProps,
  clampLines,
  newsHoverSx,
} from "@/components/sections/news/news-style";
import { getNewsDisplayTitle } from "@/lib/news";
import type { News } from "@/types/news";

type Props = {
  news: News;
};

/** 그리드용 기사 — 지면 단처럼 위쪽 괘선 + 둥근 사진 아래 언론사·제목·요약 */
export default function NewsTile({ news }: Props) {
  const title = getNewsDisplayTitle(news);

  return (
    <Box
      component="a"
      {...articleLinkProps(news.url, title)}
      sx={{
        display: "block",
        pt: 1.5,
        borderTop: `2px solid ${NEWS_INK}`,
        textDecoration: "none",
        color: "text.primary",
        ...newsHoverSx,
      }}
    >
      <Box sx={{ aspectRatio: "16 / 10", borderRadius: 3, overflow: "hidden", mb: 1.75 }}>
        <NewsThumbnail src={news.image_url} iconSize={48} />
      </Box>
      <NewsMeta news={news} />
      <Typography
        component="h3"
        className="news-title"
        sx={{
          ...clampLines(2),
          mt: 0.75,
          fontWeight: 700,
          fontSize: { xs: "1.0625rem", md: "1.125rem" },
          lineHeight: 1.45,
          letterSpacing: "-0.01em",
          wordBreak: "keep-all",
        }}
      >
        {title}
      </Typography>
      {news.description && (
        <Typography
          sx={{ ...clampLines(2), mt: 0.75, color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.65 }}
        >
          {news.description}
        </Typography>
      )}
    </Box>
  );
}
