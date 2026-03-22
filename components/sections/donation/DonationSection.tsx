import { Typography } from "@mui/material";
import { PageSection } from "@/components/ui";

interface DonationSectionProps {
  variant: "info" | "records";
}

export default function DonationSection({ variant }: DonationSectionProps) {
  if (variant === "records") {
    return (
      <PageSection>
        <Typography variant="body1" paragraph>
          후원/기부금 실적 내용을 여기에 작성하세요.
        </Typography>
      </PageSection>
    );
  }
  return (
    <PageSection>
      <Typography variant="body1" paragraph>
        후원 안내 내용을 여기에 작성하세요.
      </Typography>
    </PageSection>
  );
}
