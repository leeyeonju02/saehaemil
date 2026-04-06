import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Typography } from "@mui/material";
import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";
import GalleryDetailSection from "@/components/sections/gallery/GalleryDetailSection";
import { getAlbumById, getAllAlbumIds } from "@/lib/gallery-albums";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllAlbumIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const album = getAlbumById(id);
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
  const album = getAlbumById(id);

  if (!album) {
    notFound();
  }

  return (
    <>
      <Hero />
      <PageHeader title={album.title} description="활동 사진 앨범" />
      <GalleryDetailSection album={album} />
      <PageSection>
        <Typography sx={{ mt: { xs: 2, md: 4 } }}>
          <Link
            href="/gallery"
            style={{
              color: "inherit",
              textDecoration: "underline",
            }}
          >
            ← 사진앨범 목록으로
          </Link>
        </Typography>
      </PageSection>
    </>
  );
}
