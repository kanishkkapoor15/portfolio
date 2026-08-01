import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/research";

/**
 * Only real, separately-addressable pages belong here.
 *
 * The previous version listed #about, #skills, #projects and so on. Google
 * does not treat a fragment as its own page: every one of them canonicalises
 * back to the homepage, so six "discovered pages" was really one. Listing them
 * adds no coverage and dilutes the signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kanishkkapoor.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/research`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...ARTICLES.map((a) => ({
      url: `${base}/research/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
