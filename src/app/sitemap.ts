import type { MetadataRoute } from "next";
import { PHOTOGRAPHY_SERIES } from "@/lib/photography-final-taxonomy";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: route === "/" || route === "/creator" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/creator" || route === "/photography" ? 0.9 : 0.7,
  }));

  const photographyProjects: MetadataRoute.Sitemap = PHOTOGRAPHY_SERIES
    .filter((series) => series.public)
    .map((series) => ({
      url: new URL(`/photography/${series.slug}`, SITE_URL).toString(),
      lastModified: new Date(`${series.sortDate}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    }));

  return [...publicPages, ...photographyProjects];
}
