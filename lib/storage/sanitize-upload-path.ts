import { randomUUID } from "crypto";

export function sanitizeFolderSegment(raw: string | undefined): string {
  const s = (raw ?? "general")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 48);
  return s || "general";
}

export function sanitizeFilename(original: string): string {
  const base = original.split(/[/\\]/).pop() ?? "image";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return cleaned || "image";
}

export function buildObjectPath(folder: string, originalFilename: string): string {
  const safeFolder = sanitizeFolderSegment(folder);
  const name = sanitizeFilename(originalFilename);
  const id = randomUUID();
  return `${safeFolder}/${id}-${name}`;
}
