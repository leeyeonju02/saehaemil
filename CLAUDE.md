# saehaemil (새해밀)

Next.js App Router 기반 단체/기관 소개 웹사이트. 소개, 활동, 사업, 시설, 갤러리, 후원, 공지사항, 조직도, 로그인/회원가입 등의 페이지로 구성.

## 기술 스택

- **Next.js 16** (App Router, `app/` 디렉토리), **React 19**, **TypeScript 5** (strict)
- **스타일링: MUI(`@mui/material`) + Emotion**과 **Tailwind CSS 4**가 함께 쓰인다.
  - 새 UI를 작성할 때는 주변 컴포넌트가 어느 쪽 스타일링을 쓰고 있는지 먼저 확인하고 그 패턴을 따를 것. 한 컴포넌트 안에서 두 방식을 무분별하게 섞지 않는다.
  - MUI 테마는 `src/theme/ThemeRegistry.tsx`에 있다 (이 프로젝트에서 `src/` 아래 있는 유일한 코드 — 나머지는 전부 루트 기준 `app/`, `components/` 등).
- **Framer Motion** (애니메이션), **react-leaflet/leaflet** (지도, `components/map`), **Supabase JS** (`@supabase/supabase-js`, 인증/DB/스토리지)
- 패키지 매니저: **npm** (`package-lock.json` 기준. yarn/pnpm/bun 사용하지 않음)

## 커맨드

```bash
npm run dev     # 개발 서버 (기본 .env 사용)
npm run prod    # .env.prod로 로컬에서 프로덕션 환경 시뮬레이션 (scripts/with-env.mjs)
npm run build   # 프로덕션 빌드
npm run start   # 빌드된 앱 실행
npm run lint    # ESLint (eslint.config.mjs, flat config, eslint-config-next 기반)
```

- **Prettier 없음** — 포맷팅은 ESLint 규칙만 따른다.
- **테스트 프레임워크 없음** (Jest/Vitest/Playwright 미설치). 테스트 코드를 임의로 추가하지 말 것.

## 디렉토리 구조

- `app/` — 라우트 (about, activities, api, board, business, donation, facilities, gallery, history, location, login, notice, organization, signup 등)
- `components/` — `homepage`, `layout`, `map`, `providers`, `sections`, `ui`로 구분
- `lib/` — 도메인 로직/유틸 (예: `gallery-db.ts`, `notices-supabase.ts`, `donations.ts`, `auth-verify-admin.ts`, `site-config.ts`). Supabase 클라이언트 관련 코드는 `lib/supabase/`에 있음
- `hooks/`, `data/`, `types/` — 커스텀 훅, 정적 데이터, 공용 타입
- `supabase/policies/` — RLS 정책 SQL 원본 (예: `gallery_public_read.sql`, `notices_public_read.sql`). Supabase CLI 마이그레이션 디렉토리는 아님 — 정책 변경 시 이 SQL도 함께 갱신할 것
- `public/` — 정적 자산
- `scripts/` — 빌드/운영 보조 스크립트 (`with-env.mjs` 등)

## 환경 변수

`.env`, `.env.local`, `.env.prod`, `.env.remote.local` 등이 쓰이며 전부 `.gitignore`에 포함되어 있다 (커밋 금지). 실제 값은 이 문서에 절대 적지 않는다. Supabase URL/키 등은 `.env*` 파일에서 관리되고 `lib/supabase/`에서 클라이언트를 생성해 사용한다.

## 커밋 메시지

기존 히스토리는 한국어 설명형 문장(예: "후원 내역 기능 추가", "OrganizationChart 컴포넌트 리팩토링") 스타일을 따른다. 새 커밋도 이 톤을 유지할 것.
