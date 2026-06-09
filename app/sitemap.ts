import type { MetadataRoute } from "next";
import { getBusinesses } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const now = new Date();

  const businessPages: MetadataRoute.Sitemap = getBusinesses().map((business) => ({
    url: `${base}/collect/${business.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...businessPages,
  ];
}
