/** `news` 테이블 한 행 (앱 내부용으로 정규화) */
export interface News {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  source_name: string | null;
  /** ISO 문자열 */
  published_at: string | null;
  is_visible: boolean;
  is_pinned: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
