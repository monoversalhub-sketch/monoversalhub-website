// src/app/sitemap.ts
// (updated to be defensive when the tailors table/columns may differ)

import type { MetadataRoute } from "next";
import { Client } from "@neondatabase/serverless";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monoversalhub-website.vercel.app";

async function getItemSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  const conn = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!conn) return [];

  const client = new Client({ connectionString: conn });
  try {
    await client.connect();

    // Try a straightforward query first; fall back to a safe information_schema
    // check if the tailors table doesn't exist.
    try{
      const res = await client.query(`SELECT COALESCE(slug,url_slug) AS slug, COALESCE(updated_at, NOW()) AS updated_at FROM tailors WHERE COALESCE(portfolio_public, false) = true LIMIT 1000`)
      await client.end();
      return res.rows.map((r) => ({ slug: r.slug, updatedAt: r.updated_at || new Date() }));
    }catch(e){
      // If tailors table not found, return empty list gracefully
      console.warn('sitemap: tailors query failed, falling back to empty list', e.message || e)
      await client.end();
      return [];
    }

  } catch (err) {
    try { await client.end(); } catch (e) {}
    console.error('sitemap: failed to load slugs', err.message || err);
    return [];
  }
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
