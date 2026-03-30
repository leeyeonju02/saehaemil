export type VolunteerApplicationRow = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
};

const STORAGE_KEY = "saehaemil_volunteer_applications_v1";

export const DEFAULT_VOLUNTEER_APPLICATIONS: VolunteerApplicationRow[] = [
  {
    id: "1",
    title: "2026년 4월 주말 프로그램 봉사 신청",
    author: "김민지",
    createdAt: "2026-03-28T09:15:00",
    content: "4월 매주 토요일 오전 돌봄 프로그램 보조 봉사를 신청합니다.",
  },
  {
    id: "2",
    title: "어르신 식사 보조 봉사 (화·목)",
    author: "이준호",
    createdAt: "2026-03-27T16:42:00",
    content: "식사 준비 및 배식 보조, 화요일·목요일 오전 가능합니다.",
  },
  {
    id: "3",
    title: "장애인 활동 지원 보조 봉사",
    author: "박서연",
    createdAt: "2026-03-26T11:03:00",
    content: "실내·외 활동 시 이동 및 프로그램 참여를 도와드리고 싶습니다.",
  },
  {
    id: "4",
    title: "봄맞이 시설 환경 정비 봉사",
    author: "최유진",
    createdAt: "2026-03-25T13:28:00",
    content: "대청소 및 화단 정리 등 시설 환경 개선 봉사 희망합니다.",
  },
  {
    id: "5",
    title: "독거 어르신 안부 전화 봉사단",
    author: "정다은",
    createdAt: "2026-03-24T10:00:00",
    content: "주 1회 안부 전화 가능하며, 오후 시간대가 편합니다.",
  },
  {
    id: "6",
    title: "문화·여가 프로그램 진행 보조",
    author: "한지우",
    createdAt: "2026-03-23T15:55:00",
    content: "노래·미술 등 여가 프로그램 진행 시 보조 인력으로 참여 희망합니다.",
  },
  {
    id: "7",
    title: "정기 헌혈 캠페인 현장 봉사",
    author: "오태양",
    createdAt: "2026-03-22T08:40:00",
    content: "헌혈 버스 방문 시 안내 및 서류 보조 봉사를 신청합니다.",
  },
];

function normalizeRow(raw: unknown): VolunteerApplicationRow | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.title !== "string") return null;
  return {
    id: o.id,
    title: o.title,
    author: typeof o.author === "string" ? o.author : "",
    createdAt: typeof o.createdAt === "string" ? o.createdAt : "",
    content: typeof o.content === "string" ? o.content : "",
  };
}

export function loadVolunteerApplications(): VolunteerApplicationRow[] {
  if (typeof window === "undefined") return DEFAULT_VOLUNTEER_APPLICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_VOLUNTEER_APPLICATIONS;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return DEFAULT_VOLUNTEER_APPLICATIONS;
    const rows = parsed.map(normalizeRow).filter((r): r is VolunteerApplicationRow => r !== null);
    return rows.length > 0 ? rows : DEFAULT_VOLUNTEER_APPLICATIONS;
  } catch {
    return DEFAULT_VOLUNTEER_APPLICATIONS;
  }
}

export function saveVolunteerApplications(rows: VolunteerApplicationRow[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    /* ignore */
  }
}

export function getVolunteerApplicationById(id: string): VolunteerApplicationRow | null {
  const rows = loadVolunteerApplications();
  return rows.find((r) => r.id === id) ?? null;
}
