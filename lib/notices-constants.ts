/** Supabase 및 앱 전역에서 쓰는 공지 테이블명 */
export const NOTICES_TABLE = "notices" as const;

/** DB에 `author` 컬럼이 없거나 비어 있을 때 UI에 표시하는 기본 작성자 */
export const DEFAULT_NOTICE_AUTHOR = "새해밀" as const;
