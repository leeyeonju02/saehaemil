import { PageHeader, PageSection } from "@/components/ui";
import LoginForm from "@/components/sections/auth/LoginForm";

export const metadata = {
  title: "로그인 | 새해밀",
  description: "새해밀 장애인 활동 지원 센터 로그인",
};

export default function LoginPage() {
  return (
    <>
      <PageHeader title="로그인" description="회원 계정으로 로그인하세요." />
      <PageSection>
        <LoginForm />
      </PageSection>
    </>
  );
}
