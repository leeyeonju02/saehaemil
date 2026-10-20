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
  /** 영역 높이를 부모에 맞출지 (홈 벤토 레이아웃) */
  fill?: boolean;
};

/** 대표 기사 — 사진을 크게 깔고 아래쪽 그라데이션 위에 제목을 올린다 */
export default function NewsHero({ news, fill = false }: Props) {
  const title = getNewsDisplayTitle(news);

  return (
    <Box
      component="a"
      {...articleLinkProps(news.url, title)}
      sx={{
        position: "relative",
        display: "block",
        height: fill ? { md: "100%" } : undefined,
        minHeight: { xs: 280, sm: 360, md: fill ? 420 : 440 },
        borderRadius: 4,
        overflow: "hidden",
        textDecoration: "none",
        color: "#fff",
        bgcolor: "grey.900",
        ...newsHoverSx,
        "&:hover .news-title, &:focus-visible .news-title": { color: "#fff" },
      }}
    >
      <Box sx={{ position: "absolute", inset: 0 }}>
        <NewsThumbnail src={news.image_url} iconSize={72} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 75%)",
        }}
      />
      <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, p: { xs: 2.5, sm: 3.5, md: 4 } }}>
        <Typography
          component="span"
          sx={{
            display: "inline-block",
            mb: 1.25,
            pb: 0.25,
            borderBottom: "2px solid #fff",
            fontSize: "0.6875rem",
            fontWeight: 800,
            letterSpacing: "0.2em",
          }}
        >
          머리기사
        </Typography>
        <NewsMeta news={news} onImage />
        <Typography
          component="h3"
          className="news-title"
          sx={{
            ...clampLines(3),
            mt: 1.5,
            fontWeight: 900,
            fontSize: { xs: "1.375rem", sm: "1.75rem", md: "2rem" },
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            wordBreak: "keep-all",
            textShadow: "0 1px 12px rgba(0,0,0,0.25)",
          }}
        >
          {title}
        </Typography>
        {news.description && (
          <Typography
            sx={{
              ...clampLines(2),
              mt: 1,
              maxWidth: 720,
              color: "rgba(255,255,255,0.82)",
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: 1.65,
              display: { xs: "none", sm: "-webkit-box" },
            }}
          >
            {news.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
