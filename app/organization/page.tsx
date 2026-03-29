import OrganizationSection from "@/components/sections/organization/OrganizationSection";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "조직도 | 새해밀",
  description: "사단법인 새해밀의 조직 구성과 인력 현황을 안내합니다.",
};

export default function OrganizationPage() {
  return (
  (<>
    <Hero/>
     <OrganizationSection />
  </>)
  )
}
