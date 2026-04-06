export type GalleryImageItem = {
  src: string;
  alt: string;
};

/** 폴더(앨범) 단위 갤러리 — 목록 카드·상세 `/gallery/[id]` 공통 */
export type GalleryAlbum = {
  id: string;
  title: string;
  content: string;
  /** 게시글 등록 일시 (ISO) */
  createdAt: string;
  /** 활동·봉사 일자 (YYYY-MM-DD 또는 ISO) */
  activityDate: string;
  images: GalleryImageItem[];
};

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: "tiket-2026",
    title: "[박상민 콘서트] 문화공연 티켓 후원",
    content:
      "문화 공연 티켓을 후원받아 장애인 90명과 함께 공연을 보러갔습니다. 문화 예술 향유의 즐거움을 나누는 시간이었습니다.",
    createdAt: "2026-03-26T14:30:00Z",
    activityDate: "2026-04-04",
    images: [
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-10 001.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-11 002.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-12 003.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-12 004.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-13 005.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-13 006.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-14 007.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-14 008.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-14 009.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-15 010.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-15 011.jpeg", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/KakaoTalk_Photo_2026-04-07-07-42-16 012.jpeg", alt: "봄 프로그램 현장 1" },

    ],
  },
  {
    id: "spring-program-2026",
    title: "2025년 장애인 활동지원사 힐링체험",
    content:
      "장애인 활동지원사와 함께한 힐링체험 현장입니다. 힐링체험을 통해 장애인 활동지원사의 정서적 건강을 향상시키는 프로그램입니다.",
    createdAt: "2026-03-26T14:30:00Z",
    activityDate: "2025-11-07",
    images: [
      { src: "/images/history/his1.png", alt: "봄 프로그램 현장 1" },
      { src: "/images/history/his2.png", alt: "봄 프로그램 현장 2" },
      { src: "/images/history/his3.png", alt: "봄 프로그램 현장 3" },
      { src: "/images/history/his4.png", alt: "봄 프로그램 현장 4" },
    ],
  },
  {
    id: "volunteer-day-march",
    title: "장애인분야 클러스터 세미나 및 실무자 교육",
    content:
      "센터장 수여식 및 장애인분야 클러스터 세미나 및 실무자 교육 현장입니다. 클러스터 세미나 및 실무자 교육을 통해 장애인 활동지원사의 전문성을 향상시키는 프로그램입니다.",
    createdAt: "2026-03-22T11:00:00Z",
    activityDate: "2026-03-08",
    images: [
      { src: "/images/history/his5.png", alt: "봉사 활동 1" },
      { src: "/images/history/his6.png", alt: "봉사 활동 2" },
      { src: "/images/history/his7.png", alt: "봉사 활동 3" },
    ],
  },
  {
    id: "daily-care-winter",
    title: "장애인 청소년 및 애견가족 테라피독",
    content:
      "장애인 청소년 및 애견가족 테라피독 프로그램 현장입니다. 테라피독을 통해 장애인 청소년 및 애견가족의 건강과 삶의 질을 향상시키는 프로그램입니다.",
    createdAt: "2026-03-18T09:15:00Z",
    activityDate: "2026-03-01",
    images: [
      { src: "/images/history/his8.png", alt: "일상 돌봄 1" },
      { src: "/images/history/his9.png", alt: "일상 돌봄 2" },
      { src: "/images/history/his10.png", alt: "일상 돌봄 3" },
    ],
  },
];

export function getAlbumById(id: string): GalleryAlbum | undefined {
  return GALLERY_ALBUMS.find((a) => a.id === id);
}

export function getAllAlbumIds(): string[] {
  return GALLERY_ALBUMS.map((a) => a.id);
}

/** 대표 이미지 — 첫 장 */
export function getAlbumCover(album: GalleryAlbum): GalleryImageItem {
  return album.images[0] ?? { src: "/images/history/his1.png", alt: album.title };
}
