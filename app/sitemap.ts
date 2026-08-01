import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/research";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kanishkkapoor.com";
  const now = new Date();

  const sections: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#twin`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#skills`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#experience`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const research: MetadataRoute.Sitemap = [
    { url: `${base}/research`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    ...ARTICLES.map((a) => ({
      url: `${base}/research/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return [...sections, ...research];
}
