import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader, PageSection } from "@/components/ui";
import { Typography, Box } from "@mui/material";
import { loadNoticeById, loadAllNoticeIds } from "@/lib/notices";
import Link from "next/link";
import Hero from "@/components/homepage/Hero";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const ids = await loadAllNoticeIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = await loadNoticeById(id);
  if (!notice) {
    return { title: "공지사항 | 새해밀" };
  }
  return {
    title: `${notice.title} | 새해밀`,
    description: notice.content.slice(0, 120),
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = await loadNoticeById(id);

  if (!notice) {
    notFound();
  }

  const dateLabel = new Date(notice.created_at).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <Hero />
      <PageHeader
        title={notice.title}
        description={`작성자: ${notice.author} · 등록: ${dateLabel}`}
      />
      <PageSection>
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            p: { xs: 2.5, sm: 3, md: 4 },
            minHeight: { xs: "max(22rem, 48vh)", md: "max(24rem, 40vh)" },
          }}
        >
          {notice.image_urls.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 3,
              }}
            >
              {notice.image_urls.map((url) => (
                <Box
                  key={url}
                  component="img"
                  src={url}
                  alt=""
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          )}
          <Box
            component="article"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
              "& p": { mb: 2 },
            }}
          >
            <Typography variant="body1" component="div" color="text.primary">
              {notice.content}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ mt: { xs: 10, md: 15 } }}>
          <Link
            href="/notice"
            style={{
              color: "inherit",
              textDecoration: "underline",
            }}
          >
            ← 공지사항 목록으로
          </Link>
        </Typography>
      </PageSection>
    </>
  );
}
