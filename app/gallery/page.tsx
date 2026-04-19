import { PageHeader } from "@/components/ui";
import GallerySection from "@/components/sections/gallery/GallerySection";
import GalleryAddAlbumButton from "@/components/sections/gallery/GalleryAddAlbumButton";
import Hero from "@/components/homepage/Hero";
import { fetchGalleryAlbumsFromSupabase } from "@/lib/gallery-db";

export const metadata = {
  title: "사진앨범 | 새해밀",
  description: "사진앨범",
};

/** Supabase `gallery` 목록을 매 요청 조회 */
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await fetchGalleryAlbumsFromSupabase();

  return (
    <>
      <Hero />
      <PageHeader
        title="사진앨범"
        description="활동 사진을 보실 수 있습니다."
        action={<GalleryAddAlbumButton />}
      />
      <GallerySection albums={albums} />
    </>
  );
}
