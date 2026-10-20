import { Box, Stack, Typography } from "@mui/material";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import { PageSection } from "@/components/ui";
import NewsAddButton from "@/components/sections/news/NewsAddButton";
import NewsHero from "@/components/sections/news/NewsHero";
import NewsMasthead from "@/components/sections/news/NewsMasthead";
import NewsTile from "@/components/sections/news/NewsTile";
import type { News } from "@/types/news";

type Props = {
  news: News[];
};

export default function NewsSection({ news }: Props) {
  const [hero, ...rest] = news;

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
            <NewsHero news={hero} />

            {rest.length > 0 && (
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
                  {rest.map((item) => (
                    <li key={item.id}>
                      <NewsTile news={item} />
                    </li>
                  ))}
                </Box>
              </Box>
            )}
          </Stack>
        )}
      </Box>
    </PageSection>
  );
}
