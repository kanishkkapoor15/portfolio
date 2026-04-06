import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: "https://kanishkkapoor.com/sitemap.xml",
    host: "https://kanishkkapoor.com",
  };
}
