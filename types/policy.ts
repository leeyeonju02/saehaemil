/** 개인정보처리방침·이용약관 등 조항형 문서 공통 타입 */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

export type PolicyDocument = {
  /** 목차·스크린리더용 문서 이름 (예: "개인정보처리방침") */
  name: string;
  intro: string;
  sections: PolicySection[];
  /** "YYYY-MM-DD" */
  effectiveDate: string;
  /** 이전 버전 시행일 (최신순) */
  history: string[];
};
