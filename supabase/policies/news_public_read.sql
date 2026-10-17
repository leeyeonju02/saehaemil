-- 뉴스(news) 테이블 RLS
-- 웹 방문자(anon)·로그인 사용자(authenticated)는 공개 기사(is_visible = true)만 조회
-- 쓰기 정책은 두지 않음 → 등록·수정·삭제는 서버 API(서비스 롤 키)로만 수행

alter table public.news enable row level security;

create policy "news_select_public_visible"
  on public.news for select
  to anon, authenticated
  using (is_visible = true);
