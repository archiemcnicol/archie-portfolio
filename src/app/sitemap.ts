import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route === "/" || route === "/creator" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/creator" || route === "/photography" ? 0.9 : 0.7,
  }));
}
