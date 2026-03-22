import { PageHeader } from "@/components/ui";
import OrganizationSection from "@/components/sections/organization/OrganizationSection";

export const metadata = {
  title: "조직도 | 새해밀",
  description: "새해밀 장애인 활동 지원 센터 조직도",
};

export default function OrganizationPage() {
  return (
    <>
      <PageHeader title="조직도" />
      <OrganizationSection />
    </>
  );
}
