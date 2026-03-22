import { PageHeader } from "@/components/ui";
import BusinessSection from "@/components/sections/business/BusinessSection";

export const metadata = {
  title: "복지사업 | 새해밀",
  description: "복지사업 안내",
};

export default function BusinessWelfarePage() {
  return (
    <>
      <PageHeader title="복지사업" description="복지사업 안내입니다." />
      <BusinessSection title="복지사업" />
    </>
  );
}
