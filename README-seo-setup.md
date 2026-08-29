// src/app/sitemap.ts
// Next.js auto-serves this at /sitemap.xml — no extra config needed.

import type { MetadataRoute } from "next";

const BASE_URL = "https://monoversalhub-website.vercel.app";

// Replace this with your actual DB call once per-item pages exist.
async function getItemSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const items = await getItemSlugs();
  const itemRoutes: MetadataRoute.Sitemap = items.map((t) => ({
    url: `${BASE_URL}/t/${t.slug}`,
    lastModified: t.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...itemRoutes];
}
