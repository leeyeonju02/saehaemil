import { PageHeader } from "@/components/ui";
import PolicyDocumentView from "@/components/sections/policy/PolicyDocumentView";
import { TERMS_OF_SERVICE } from "@/data/terms-of-service";

export const metadata = {
  title: "이용약관 | 새해밀",
  description: "사단법인 새해밀 장애인 활동지원기관 홈페이지 이용약관",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="이용약관" />
      <PolicyDocumentView document={TERMS_OF_SERVICE} />
    </>
  );
}
