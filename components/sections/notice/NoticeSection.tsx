import { Typography } from "@mui/material";
import { PageSection } from "@/components/ui";
import NoticeList from "@/components/sections/notice/NoticeList";
import type { Notice } from "@/types/notice";

interface NoticeSectionProps {
  variant: "list" | "sexual-harassment" | "workplace-bullying";
  initialNotices?: Notice[];
}

export default function NoticeSection({ variant, initialNotices = [] }: NoticeSectionProps) {
  if (variant === "list") {
    return (
      <PageSection>
        <NoticeList initialNotices={initialNotices} />
      </PageSection>
    );
  }


}
