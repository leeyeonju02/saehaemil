import { PageHeader } from "@/components/ui";
import DonationSection from "@/components/sections/donation/DonationSection";

export const metadata = {
  title: "후원안내 | 새해밀",
  description: "후원 안내 및 참여 방법",
};

export default function DonationPage() {
  return (
    <>
      <PageHeader title="후원안내" description="후원 방법 및 안내입니다." />
      <DonationSection variant="info" />
    </>
  );
}
