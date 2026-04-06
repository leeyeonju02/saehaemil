import { PageHeader } from "@/components/ui";
import GallerySection from "@/components/sections/gallery/GallerySection";
import Hero from "@/components/homepage/Hero";
export const metadata = {
  title: "사진앨범 | 새해밀",
  description: "사진앨범",
};

export default function GalleryPage() {
  return (
    <> 
    <Hero/>
      <PageHeader title="사진앨범" description="활동 사진을 보실 수 있습니다." />
      <GallerySection />
    </>
  );
}
