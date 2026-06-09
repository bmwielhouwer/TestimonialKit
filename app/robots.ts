import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the owner dashboard and internal pages out of search results.
      disallow: ["/dashboard", "/widget/", "/submit-success"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
