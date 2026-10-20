import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import NewsHero from "@/components/sections/news/NewsHero";
import NewsCompactItem from "@/components/sections/news/NewsCompactItem";
import NewsMasthead from "@/components/sections/news/NewsMasthead";
import { NEWS_ACCENT, NEWS_INK, NEWS_RULE } from "@/components/sections/news/news-style";
import type { News } from "@/types/news";

export default function HomeNews({ news }: { news: News[] }) {
  // 등록된 기사가 없으면 홈에서는 섹션을 감춘다
  if (news.length === 0) return null;

  const [lead, ...others] = news.slice(0, 5);

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">
        <NewsMasthead
          title="언론 속 새해밀"
          kicker="NEWS"
          action={
            <Link href="/news" style={{ textDecoration: "none" }}>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: NEWS_INK,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  "&:hover": { color: NEWS_ACCENT },
                }}
              >
                <Typography component="span" sx={{ font: "inherit" }}>
                  전체보기
                </Typography>
                <ArrowForward sx={{ fontSize: 16 }} />
              </Box>
            </Link>
          }
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: others.length > 0 ? { xs: "1fr", md: "3fr 2fr" } : "1fr",
            gap: { xs: 3, md: 4 },
          }}
        >
          <NewsHero news={lead} fill />

          {others.length > 0 && (
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // 지면처럼 기사 사이 괘선
                "& > li + li": { borderTop: `1px solid ${NEWS_RULE}` },
                "& > li": { py: { xs: 2, md: 1.75 } },
                "& > li:first-of-type": { pt: 0 },
                "& > li:last-of-type": { pb: 0 },
              }}
            >
              {others.map((item) => (
                <li key={item.id}>
                  <NewsCompactItem news={item} />
                </li>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
