-- 공지사항(notices) 테이블 — anon(웹)에서 목록/상세 조회가 되도록 RLS 정책
-- Supabase Dashboard → SQL Editor 에서 실행하세요.
--
-- 증상: Table Editor 에는 행이 보이는데, 앱에서 .from('notices').select() 가 data: [] 만 옴
-- 이유: RLS 가 켜져 있으면 기본적으로 anon 은 SELECT 불가 (대시보드 postgres 역할은 RLS 우회)

-- 1) RLS 사용 중이면 유지하고, 읽기 정책만 추가
-- (이미 정책이 있으면 이름 충돌 시 이름만 바꾸거나 기존 정책 확인)

-- 공개 노출 글만 읽기 허용 (권장)
CREATE POLICY "notices_select_public_visible"
ON public.notices
FOR SELECT
TO anon, authenticated
USING (is_visible = true);

-- 개발 중에는 아래처럼 전체 읽기 허용도 가능 (운영 전에는 위 정책만 쓰는 것을 권장)
-- CREATE POLICY "notices_select_all_dev"
-- ON public.notices
-- FOR SELECT
-- TO anon, authenticated
-- USING (true);
