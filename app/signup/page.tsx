import { PageHeader, PageSection } from "@/components/ui";
import SignupForm from "@/components/sections/auth/SignupForm";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "회원가입 | 새해밀",
  description: "새해밀 장애인 활동 지원 센터 회원가입",
};

export default function SignupPage() {
  return (
    <>
      <Hero />
      <PageHeader title="회원가입" description="새해밀 회원으로 가입하세요." />
      <PageSection>
        <SignupForm />
      </PageSection>
    </>
  );
}
