import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadNoticeById, loadAllNoticeIds } from "@/lib/notices";
import { fetchNoticeByIdForAdmin } from "@/lib/notices-supabase";
import NoticeDetailView from "@/components/sections/notice/NoticeDetailView";
import NoticePrivateDetail from "@/components/sections/notice/NoticePrivateDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const ids = await loadAllNoticeIds();
  return ids.map((id) => ({ id }));
}

/** 공개 목록에 없는 공지가 비공개로 존재하는지 (내용은 넘기지 않음) */
async function isPrivateNotice(id: string): Promise<boolean> {
  try {
    const notice = await fetchNoticeByIdForAdmin(id);
    return Boolean(notice && !notice.is_visible);
  } catch {
    return false;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = await loadNoticeById(id);
  if (!notice) {
    return { title: "공지사항 | 새해밀", robots: { index: false, follow: false } };
  }
  return {
    title: `${notice.title} | 새해밀`,
    description: notice.content.slice(0, 120),
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = await loadNoticeById(id);

  if (notice) {
    return <NoticeDetailView notice={notice} />;
  }

  // 비공개 공지는 서버 HTML에 내용을 싣지 않고, 관리자 브라우저에서 따로 불러온다
  if (await isPrivateNotice(id)) {
    return <NoticePrivateDetail noticeId={id} />;
  }

  notFound();
}
