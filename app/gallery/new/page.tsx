import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import { PageHeader, PageSection } from "@/components/ui";
import GalleryNewGuard from "@/components/sections/gallery/GalleryNewGuard";
import { fetchGalleryAlbumByIdFromSupabase } from "@/lib/gallery-db";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ edit?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { edit } = await searchParams;
  if (edit?.trim() && /^\d+$/.test(edit.trim())) {
    return {
      title: "앨범 수정 | 새해밀",
      description: "사진 앨범 수정",
    };
  }
  return {
    title: "앨범 추가 | 새해밀",
    description: "사진 앨범 추가",
  };
}

export default async function GalleryNewPage({ searchParams }: Props) {
  const { edit } = await searchParams;
  const editRaw = typeof edit === "string" ? edit.trim() : "";
  const isNumericEdit = /^\d+$/.test(editRaw);
  const initialAlbum = isNumericEdit ? await fetchGalleryAlbumByIdFromSupabase(editRaw) : undefined;

  const isEdit = isNumericEdit;
  const title = isEdit ? "앨범 수정" : "앨범 추가";
  const description = isEdit
    ? "등록된 사진 앨범을 수정합니다."
    : "새 사진 앨범을 등록합니다.";

  return (
    <>
      <Hero />
      <PageHeader title={title} description={description} />
      <PageSection>
        <GalleryNewGuard
          initialAlbum={initialAlbum}
          editRequestedId={editRaw || undefined}
        />
      </PageSection>
    </>
  );
}
