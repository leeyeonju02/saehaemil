import { Box, Typography, Link } from "@mui/material";
import { PageSection } from "@/components/ui";
import NoticeList from "@/components/sections/notice/NoticeList";
import type { Notice } from "@/types/notice";

interface NoticeSectionProps {
  variant:
    | "list"
    | "sexual-harassment"
    | "workplace-bullying"
    | "safety-health-training"
    | "disaster-response-training"
    | "workplace-disability-awareness";
  initialNotices?: Notice[];
  /** PDF 페이지에서 경로를 페이지에서 직접 넘길 때 (기본값은 variant별 상수) */
  pdfSrc?: string;
  pdfTitle?: string;
}

const PDF_BY_VARIANT = {
  "sexual-harassment": "/images/pdfs/성희롱 예방 교육 자료.pdf",
  "workplace-bullying": "/images/pdfs/직장내괴롭힘교육자료.pdf",
  "safety-health-training": "/images/pdfs/안전보건관리교육 자료.pdf",
  "disaster-response-training": "/images/pdfs/재난대응교육자료.pdf",
  "workplace-disability-awareness":
    "/images/pdfs/직장 내 장애인 인식개선 교육 자료.pdf",
} as const;

function NoticePdfEmbed({ src, title }: { src: string; title: string }) {
  return (
    <PageSection>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "min(85vh, 900px)", md: "min(82vh, 920px)" },
            minHeight: { xs: 480, md: 560 },
            borderRadius: 2,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            bgcolor: "grey.100",
          }}
        >
          <Box
            component="iframe"
            src={src}
            title={title}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          PDF가 보이지 않으면{" "}
          <Link href={src} target="_blank" rel="noopener noreferrer" underline="always">
            새 탭에서 열기
          </Link>
          를 이용해 주세요.
        </Typography>
      </Box>
    </PageSection>
  );
}

const DEFAULT_PDF_TITLE: Record<keyof typeof PDF_BY_VARIANT, string> = {
  "sexual-harassment": "성희롱 예방 교육 자료",
  "workplace-bullying": "직장내 괴롭힘 교육 자료",
  "safety-health-training": "안전보건관리 교육 자료",
  "disaster-response-training": "재난대응 교육 자료",
  "workplace-disability-awareness": "직장 내 장애인 인식개선 교육 자료",
};

export default function NoticeSection({
  variant,
  initialNotices = [],
  pdfSrc,
  pdfTitle,
}: NoticeSectionProps) {
  if (variant === "list") {
    return (
      <PageSection>
        <NoticeList initialNotices={initialNotices} />
      </PageSection>
    );
  }

  const pdfVariants = [
    "sexual-harassment",
    "workplace-bullying",
    "safety-health-training",
    "disaster-response-training",
    "workplace-disability-awareness",
  ] as const satisfies readonly NoticeSectionProps["variant"][];

  if (pdfVariants.includes(variant as (typeof pdfVariants)[number])) {
    const key = variant as keyof typeof PDF_BY_VARIANT;
    const src = pdfSrc ?? PDF_BY_VARIANT[key];
    const title = pdfTitle ?? DEFAULT_PDF_TITLE[key];
    return <NoticePdfEmbed src={src} title={title} />;
  }

  return null;
}
