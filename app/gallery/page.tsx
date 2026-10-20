import { PageHeader } from "@/components/ui";
import GallerySection from "@/components/sections/gallery/GallerySection";
import GalleryAddAlbumButton from "@/components/sections/gallery/GalleryAddAlbumButton";
import Hero from "@/components/homepage/Hero";
import { fetchGalleryAlbumsFromSupabase } from "@/lib/gallery-db";
import { paginate, parsePageParam } from "@/lib/pagination";

export const metadata = {
  title: "사진앨범 | 새해밀",
  description: "사진앨범",
};

/** Supabase `gallery` 목록을 매 요청 조회 */
export const dynamic = "force-dynamic";

/** 한 페이지에 보여줄 앨범 수 */
const GALLERY_PAGE_SIZE = 9;

type Props = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function GalleryPage({ searchParams }: Props) {
  const [albums, { page }] = await Promise.all([fetchGalleryAlbumsFromSupabase(), searchParams]);
  const paged = paginate(albums, parsePageParam(page), GALLERY_PAGE_SIZE);

  return (
    <>
      <Hero />
      <PageHeader
        title="사진앨범"
        description="활동 사진을 보실 수 있습니다."
        action={<GalleryAddAlbumButton />}
      />
      <GallerySection albums={paged.items} page={paged.page} totalPages={paged.totalPages} />
    </>
  );
}
