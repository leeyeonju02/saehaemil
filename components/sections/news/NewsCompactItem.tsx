import { Box, Typography } from "@mui/material";
import NewsMeta from "@/components/sections/news/NewsMeta";
import NewsThumbnail from "@/components/sections/news/NewsThumbnail";
import {
  articleLinkProps,
  clampLines,
  newsHoverSx,
} from "@/components/sections/news/news-style";
import { getNewsDisplayTitle } from "@/lib/news";
import type { News } from "@/types/news";

type Props = {
  news: News;
};

/** 사이드 목록용 기사 — 왼쪽 둥근 정사각 사진 + 제목 */
export default function NewsCompactItem({ news }: Props) {
  const title = getNewsDisplayTitle(news);

  return (
    <Box
      component="a"
      {...articleLinkProps(news.url, title)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        textDecoration: "none",
        color: "text.primary",
        ...newsHoverSx,
      }}
    >
      <Box sx={{ width: { xs: 84, md: 96 }, aspectRatio: "1 / 1", borderRadius: 2.5, overflow: "hidden", flexShrink: 0 }}>
        <NewsThumbnail src={news.image_url} iconSize={28} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <NewsMeta news={news} />
        <Typography
          component="h3"
          className="news-title"
          sx={{
            ...clampLines(2),
            mt: 0.5,
            fontWeight: 700,
            fontSize: { xs: "0.9375rem", md: "1rem" },
            lineHeight: 1.45,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
