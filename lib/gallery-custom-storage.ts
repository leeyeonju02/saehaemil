import type { GalleryAlbum } from "@/lib/gallery-albums";
import { GALLERY_ALBUMS } from "@/lib/gallery-albums";

export const CUSTOM_GALLERY_STORAGE_KEY = "saehaemil_gallery_custom_albums_v1";

export function loadCustomAlbums(): GalleryAlbum[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_GALLERY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as GalleryAlbum[];
  } catch {
    return [];
  }
}

export function saveCustomAlbums(albums: GalleryAlbum[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_GALLERY_STORAGE_KEY, JSON.stringify(albums));
}

export function appendCustomAlbum(album: GalleryAlbum): void {
  const prev = loadCustomAlbums();
  saveCustomAlbums([album, ...prev]);
}

export function getCustomAlbumById(id: string): GalleryAlbum | undefined {
  return loadCustomAlbums().find((a) => a.id === id);
}

/** 커스텀 앨범을 앞에 두고, 활동일 기준 최신순 */
export function mergeAlbumLists(custom: GalleryAlbum[]): GalleryAlbum[] {
  const customIds = new Set(custom.map((c) => c.id));
  const staticRest = GALLERY_ALBUMS.filter((a) => !customIds.has(a.id));
  return [...custom, ...staticRest].sort(
    (a, b) =>
      new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
  );
}

/**
 * Supabase(DB) · localStorage 커스텀 · 정적 시드 앨범을 id 기준 합치고 활동일 최신순.
 * 같은 id는 먼저 온 소스만 유지(server → custom → static 순으로 넣음).
 */
export function mergeAllGalleryLists(
  serverAlbums: GalleryAlbum[],
  customAlbums: GalleryAlbum[]
): GalleryAlbum[] {
  const ids = new Set<string>();
  const merged: GalleryAlbum[] = [];
  for (const a of [...serverAlbums, ...customAlbums, ...GALLERY_ALBUMS]) {
    if (ids.has(a.id)) continue;
    ids.add(a.id);
    merged.push(a);
  }
  return merged.sort(
    (a, b) =>
      new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
  );
}
