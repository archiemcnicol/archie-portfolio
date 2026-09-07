export const SITE_NAME = "Archie McNicol";

export const SITE_DESCRIPTION =
  "Portfolio of Archie McNicol — a UK content creator, photographer, community manager and digital creative working across brand campaigns, photography, performance partnerships and online projects.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://archiemcnicol.com";

export const PUBLIC_PROFILE = {
  email: "fitswitharchie@gmail.com",
  location: "United Kingdom",
  tiktok: "https://www.tiktok.com/@fitswitharchie",
  instagram: "https://www.instagram.com/fitswitharchie/",
  linkedin: "https://uk.linkedin.com/in/archie-mcnicol-73b5a5283",
  pexels: "https://www.pexels.com/@archie-mcnicol-559645417",
} as const;

export const PUBLIC_ROUTES = [
  "/",
  "/creator",
  "/photography",
  "/business",
  "/business/web",
  "/affiliate",
  "/professional",
  "/professional/capcut",
  "/about",
  "/contact",
] as const;
