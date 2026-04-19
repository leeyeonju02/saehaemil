import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";
import GalleryDetailSection from "@/components/sections/gallery/GalleryDetailSection";
import GalleryAlbumFooterNav from "@/components/sections/gallery/GalleryAlbumFooterNav";
import GalleryCustomDetailClient from "@/components/sections/gallery/GalleryCustomDetailClient";
import { getAlbumById, getAllAlbumIds } from "@/lib/gallery-albums";
import { fetchGalleryAlbumByIdFromSupabase } from "@/lib/gallery-db";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllAlbumIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const album =
    getAlbumById(id) ?? (await fetchGalleryAlbumByIdFromSupabase(id));
  if (!album) {
    return { title: "사진앨범 | 새해밀" };
  }
  return {
    title: `${album.title} | 새해밀`,
    description: album.content.slice(0, 120),
  };
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { id } = await params;
  const album =
    getAlbumById(id) ?? (await fetchGalleryAlbumByIdFromSupabase(id));

  if (!album) {
    return <GalleryCustomDetailClient albumId={id} />;
  }

  return (
    <>
      <Hero />
      <PageHeader title={album.title} description="활동 사진 앨범" />
      <GalleryDetailSection album={album} />
      <PageSection>
        <GalleryAlbumFooterNav />
      </PageSection>
    </>
  );
}
