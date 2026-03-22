import { Typography } from "@mui/material";
import { PageSection } from "@/components/ui";
import NoticeList from "@/components/sections/notice/NoticeList";

interface NoticeSectionProps {
  variant: "list" | "sexual-harassment" | "workplace-bullying";
}

export default function NoticeSection({ variant }: NoticeSectionProps) {
  if (variant === "list") {
    return (
      <PageSection>
        <NoticeList />
      </PageSection>
    );
  }
  if (variant === "sexual-harassment") {
    return (
      <PageSection>
        <Typography variant="body1" paragraph>
          성희롱 예방 관련 내용을 여기에 작성하세요.
        </Typography>
      </PageSection>
    );
  }
  return (
    <PageSection>
      <Typography variant="body1" paragraph>
        직장내 괴롭힘 예방 관련 내용을 여기에 작성하세요.
      </Typography>
    </PageSection>
  );
}
