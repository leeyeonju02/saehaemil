import { PageHeader } from "@/components/ui";
import PolicyDocumentView from "@/components/sections/policy/PolicyDocumentView";
import { PRIVACY_POLICY } from "@/data/privacy-policy";

export const metadata = {
  title: "개인정보처리방침 | 새해밀",
  description: "사단법인 새해밀 장애인 활동지원기관 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="개인정보처리방침" />
      <PolicyDocumentView document={PRIVACY_POLICY} />
    </>
  );
}
