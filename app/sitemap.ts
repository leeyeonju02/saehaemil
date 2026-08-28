import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { loadNotices } from "@/lib/notices";
import { fetchGalleryAlbumsFromSupabase } from "@/lib/gallery-db";
import { fetchPublicDonationsFromSupabase } from "@/lib/donations";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/history", changeFrequency: "monthly", priority: 0.6 },
  { path: "/organization", changeFrequency: "monthly", priority: 0.6 },
  { path: "/facilities", changeFrequency: "monthly", priority: 0.6 },
  { path: "/location", changeFrequency: "monthly", priority: 0.6 },
  { path: "/activities", changeFrequency: "weekly", priority: 0.7 },
  { path: "/business/job-training", changeFrequency: "monthly", priority: 0.7 },
  { path: "/business/salary", changeFrequency: "monthly", priority: 0.7 },
  { path: "/business/welfare", changeFrequency: "monthly", priority: 0.7 },
  { path: "/notice", changeFrequency: "daily", priority: 0.8 },
  { path: "/notice/disaster-response-training", changeFrequency: "yearly", priority: 0.5 },
  { path: "/notice/mandatory-training", changeFrequency: "yearly", priority: 0.5 },
  { path: "/notice/safety-health-training", changeFrequency: "yearly", priority: 0.5 },
  { path: "/notice/sexual-harassment", changeFrequency: "yearly", priority: 0.5 },
  { path: "/notice/workplace-bullying", changeFrequency: "yearly", priority: 0.5 },
  { path: "/notice/workplace-disability-awareness", changeFrequency: "yearly", priority: 0.5 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/board", changeFrequency: "daily", priority: 0.6 },
  { path: "/donation", changeFrequency: "monthly", priority: 0.6 },
  { path: "/donation/records", changeFrequency: "weekly", priority: 0.6 },
  { path: "/volunteer/apply", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [notices, albums, donations] = await Promise.all([
    loadNotices().catch(() => []),
    fetchGalleryAlbumsFromSupabase().catch(() => []),
    fetchPublicDonationsFromSupabase().catch(() => []),
  ]);

  const noticeEntries: MetadataRoute.Sitemap = notices.map((notice) => ({
    url: `${SITE_URL}/notice/${notice.id}`,
    lastModified: notice.updated_at || notice.created_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const galleryEntries: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${SITE_URL}/gallery/${album.id}`,
    lastModified: album.createdAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const donationEntries: MetadataRoute.Sitemap = donations.map((donation) => ({
    url: `${SITE_URL}/donation/records/${donation.id}`,
    lastModified: donation.updated_at || donation.created_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...noticeEntries, ...galleryEntries, ...donationEntries];
}
