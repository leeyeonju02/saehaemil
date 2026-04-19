/**
 * 갤러리 «앨범 추가» 폼 — 제출 전까지 localStorage 임시 저장 (이 브라우저 전용)
 */

export const GALLERY_NEW_FORM_DRAFT_KEY = "saehaemil_gallery_new_form_draft_v1";

/** 대략적 한도 — localStorage(약 5MB) 초과 방지 */
const MAX_DRAFT_JSON_LENGTH = 4_200_000;

export type GalleryNewDraftFileEntry = {
  name: string;
  type: string;
  dataUrl: string;
};

export type GalleryNewDraftPayload = {
  v: 1;
  title: string;
  content: string;
  activityDate: string;
  files: GalleryNewDraftFileEntry[];
};

export function clearGalleryNewFormDraft(): void {
  try {
    localStorage.removeItem(GALLERY_NEW_FORM_DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

export function loadGalleryNewFormDraft(): GalleryNewDraftPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(GALLERY_NEW_FORM_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const o = parsed as Partial<GalleryNewDraftPayload>;
    if (o.v !== 1) return null;
    return {
      v: 1,
      title: typeof o.title === "string" ? o.title : "",
      content: typeof o.content === "string" ? o.content : "",
      activityDate: typeof o.activityDate === "string" ? o.activityDate : "",
      files: Array.isArray(o.files) ? (o.files as GalleryNewDraftFileEntry[]) : [],
    };
  } catch {
    return null;
  }
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
    r.readAsDataURL(file);
  });
}

export async function serializeFilesForDraft(
  files: File[]
): Promise<GalleryNewDraftFileEntry[]> {
  const out: GalleryNewDraftFileEntry[] = [];
  for (const file of files) {
    const dataUrl = await readFileAsDataURL(file);
    out.push({ name: file.name, type: file.type, dataUrl });
  }
  return out;
}

export async function draftEntriesToFiles(
  entries: GalleryNewDraftFileEntry[]
): Promise<File[]> {
  const files: File[] = [];
  for (const e of entries) {
    const res = await fetch(e.dataUrl);
    const blob = await res.blob();
    files.push(new File([blob], e.name, { type: e.type || blob.type || "image/jpeg" }));
  }
  return files;
}

export function saveGalleryNewFormDraft(payload: GalleryNewDraftPayload): boolean {
  if (typeof window === "undefined") return false;
  try {
    let str = JSON.stringify(payload);
    if (str.length > MAX_DRAFT_JSON_LENGTH) {
      const slim: GalleryNewDraftPayload = {
        v: 1,
        title: payload.title,
        content: payload.content,
        activityDate: payload.activityDate,
        files: [],
      };
      str = JSON.stringify(slim);
      if (str.length > MAX_DRAFT_JSON_LENGTH) return false;
    }
    localStorage.setItem(GALLERY_NEW_FORM_DRAFT_KEY, str);
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      try {
        const slim: GalleryNewDraftPayload = {
          v: 1,
          title: payload.title,
          content: payload.content,
          activityDate: payload.activityDate,
          files: [],
        };
        localStorage.setItem(GALLERY_NEW_FORM_DRAFT_KEY, JSON.stringify(slim));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
