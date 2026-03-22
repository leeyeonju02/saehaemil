/** `data/notice.json` 한 행 구조 */
export interface NoticeRecord {
  id: number;
  title: string;
  content: string;
  image_urls: string[];
  is_visible: boolean;
  is_pinned: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  /** 없으면 UI에서 기본값(관리자) 사용 */
  author?: string;
}

/** 앱 내부에서 쓰는 정규화된 공지 (id는 라우트용 문자열) */
export interface Notice {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  author: string;
  created_at: string;
  updated_at: string;
  is_visible: boolean;
  is_pinned: boolean;
  sort_order: number;
}
