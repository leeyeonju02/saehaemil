import { Box, Stack, Typography } from "@mui/material";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import { PageSection, Pagination } from "@/components/ui";
import NewsAddButton from "@/components/sections/news/NewsAddButton";
import NewsHero from "@/components/sections/news/NewsHero";
import NewsMasthead from "@/components/sections/news/NewsMasthead";
import NewsTile from "@/components/sections/news/NewsTile";
import { paginate } from "@/lib/pagination";
import type { News } from "@/types/news";

/** 한 페이지에 보여줄 기사 카드 수 (상단 대표 기사는 제외) */
const NEWS_PAGE_SIZE = 9;

type Props = {
  news: News[];
  /** 1부터 시작하는 현재 페이지 (범위를 벗어나면 보정됨) */
  page?: number;
};

export default function NewsSection({ news, page = 1 }: Props) {
  const [hero, ...rest] = news;
  const { items: cards, page: currentPage, totalPages } = paginate(rest, page, NEWS_PAGE_SIZE);

  return (
    <PageSection>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <NewsAddButton />

        <NewsMasthead
          title="언론 속 새해밀"
          kicker="NEWS"
          action={
            <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.8125rem" }}>
              총 {news.length}건
            </Typography>
          }
        />

        {!hero ? (
          <Box sx={{ py: 10, textAlign: "center", color: "text.secondary", bgcolor: "grey.50", borderRadius: 4 }}>
            <NewspaperOutlinedIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
            <Typography>등록된 뉴스가 없습니다.</Typography>
          </Box>
        ) : (
          <Stack spacing={{ xs: 5, md: 6 }}>
            {currentPage === 1 && <NewsHero news={hero} />}

            {cards.length > 0 && (
              <Box>
                <Typography
                  component="h2"
                  sx={{
                    mb: 2.5,
                    fontWeight: 900,
                    fontSize: { xs: "1.25rem", md: "1.375rem" },
                    letterSpacing: "-0.02em",
                  }}
                >
                  최신 기사
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                    columnGap: 3,
                    rowGap: { xs: 4, md: 5 },
                  }}
                >
                  {cards.map((item) => (
                    <li key={item.id}>
                      <NewsTile news={item} />
                    </li>
                  ))}
                </Box>
                <Pagination page={currentPage} totalPages={totalPages} />
              </Box>
            )}
          </Stack>
        )}
      </Box>
    </PageSection>
  );
}
