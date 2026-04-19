-- gallery 테이블 — 웹(anon)에서 목록·상세 조회 (RLS 사용 시)
-- 서비스 롤은 RLS 우회. anon 읽기만 필요하면 아래 정책을 켜세요.

-- ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "gallery_select_public"
-- ON public.gallery
-- FOR SELECT
-- TO anon, authenticated
-- USING (true);
