import type { Metadata } from "next";
import { PageHeader, PageSection } from "@/components/ui";
import NoticeNewGuard from "@/components/sections/notice/NoticeNewGuard";
import { loadNoticeById } from "@/lib/notices";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ edit?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { edit } = await searchParams;
  if (edit?.trim()) {
    return {
      title: "공지 수정 | 새해밀",
      description: "공지사항 수정",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: "공지 작성 | 새해밀",
    description: "공지사항 작성",
    robots: { index: false, follow: false },
  };
}

export default async function NoticeNewPage({ searchParams }: Props) {
  const { edit } = await searchParams;
  const editId = typeof edit === "string" ? edit.trim() : "";
  const initialNotice = editId ? await loadNoticeById(editId) : undefined;

  const isEdit = Boolean(editId);
  const title = isEdit ? "공지 수정" : "공지 작성";
  const description = isEdit
    ? "등록된 공지사항을 수정합니다."
    : "새 공지사항을 등록합니다.";

  return (
    <>
      <PageHeader title={title} description={description} />
      <PageSection>
        <NoticeNewGuard initialNotice={initialNotice} editRequestedId={editId || undefined} />
      </PageSection>
    </>
  );
}
