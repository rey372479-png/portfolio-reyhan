import type { MetadataRoute } from "next";
import { getProyek } from "@/lib/proyek";

const siteUrl = "https://portfolio-reyhan-omega.vercel.app";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProyek();
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/tentang`, lastModified, priority: 0.7 },
    { url: `${siteUrl}/keahlian`, lastModified, priority: 0.7 },
    { url: `${siteUrl}/proyek`, lastModified, priority: 0.8 },
    { url: `${siteUrl}/kontak`, lastModified, priority: 0.6 },
    ...projects.map((project) => ({
      url: `${siteUrl}/proyek/${project.id}`,
      lastModified,
      priority: 0.6,
    })),
  ];
}