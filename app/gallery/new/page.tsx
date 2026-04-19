import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";
import GalleryNewGuard from "@/components/sections/gallery/GalleryNewGuard";

export const metadata = {
  title: "앨범 추가 | 새해밀",
  description: "사진 앨범 추가",
};

export default function GalleryNewPage() {
  return (
    <>
      <Hero />
      <PageHeader title="앨범 추가" description="새 사진 앨범을 등록합니다." />
      <PageSection>
        <GalleryNewGuard />
      </PageSection>
    </>
  );
}
