import { Typography } from "@mui/material";
import { PageSection } from "@/components/ui";

interface BusinessSectionProps {
  title: string;
  description?: string;
}

export default function BusinessSection({ title, description }: BusinessSectionProps) {
  return (
    <PageSection>
      {description && (
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
      )}
      <Typography variant="body1" color="text.secondary">
        {title} 관련 내용을 여기에 작성하세요.
      </Typography>
    </PageSection>
  );
}
