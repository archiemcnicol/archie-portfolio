export const SITE_NAME = "Archie McNicol";

export const SITE_DESCRIPTION =
  "Portfolio of Archie McNicol — a UK content creator, photographer, community manager and digital creative working across brand campaigns, photography and online projects.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const PUBLIC_PROFILE = {
  email: "archiemcnicol002@gmail.com",
  location: "Buckinghamshire, UK",
  tiktok: "https://www.tiktok.com/@fitswitharchie",
  linkedin: "https://uk.linkedin.com/in/archie-mcnicol-73b5a5283",
  pexels: "https://www.pexels.com/@archie-mcnicol-559645417",
  github: "https://github.com/archiemcnicol",
} as const;

export const PUBLIC_ROUTES = [
  "/",
  "/creator",
  "/photography",
  "/business",
  "/affiliate",
  "/professional",
  "/about",
  "/contact",
] as const;
