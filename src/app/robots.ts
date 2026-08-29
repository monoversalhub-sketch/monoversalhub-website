// src/app/robots.ts
// Next.js auto-serves this at /robots.txt — no extra config needed.

import type { MetadataRoute } from "next";

const BASE_URL = "https://monoversalhub-website.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep authenticated or admin areas out of the index —
        // only the marketing pages and public portfolio pages
        // should be crawlable.
        disallow: ["/app/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
