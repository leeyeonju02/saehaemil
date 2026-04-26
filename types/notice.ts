/** 공지에 붙는 문서·스프레드시트 등 (이미지 외 첨부) */
export interface NoticeAttachment {
  /** 다운로드/링크에 표시할 이름 */
  label: string;
  /** `public` 기준 경로 (예: `/images/files/문서.xlsx`) */
  url: string;
}

/** `data/notice.json` 한 행 구조 */
export interface NoticeRecord {
  id: number;
  title: string;
  content: string;
  image_urls: string[];
  /** DB `file_urls` 와 동일 구조 — 없으면 `attachments` 사용 */
  file_urls?: NoticeAttachment[];
  /** HWP, XLSX 등 첨부(JSON) — 레거시 */
  attachments?: NoticeAttachment[];
  is_visible: boolean;
  is_pinned: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  /** 없으면 UI에서 기본값(새해밀) 사용 */
  author?: string;
}

/** 앱 내부에서 쓰는 정규화된 공지 (id는 라우트용 문자열) */
export interface Notice {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  attachments: NoticeAttachment[];
  author: string;
  created_at: string;
  updated_at: string;
  is_visible: boolean;
  is_pinned: boolean;
  sort_order: number;
}
