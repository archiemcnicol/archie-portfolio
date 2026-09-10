export type ExperienceItem = {
  period: string;
  title: string;
  role: string;
  summary: string;
  href: string;
  highlights: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "2026 — present",
    title: "Digital projects",
    role: "Web / content systems",
    summary: "Web builds and content systems for publishing, analytics and asset management.",
    href: "/business",
    highlights: ["Next.js", "Vercel", "Supabase", "Cloudinary", "Content systems"],
  },
  {
    period: "2024 — present",
    title: "@fitswitharchie",
    role: "Content creator",
    summary:
      "Fashion and lifestyle creator with a 25K+ community, 20M+ views and paid or gifted campaigns across fashion, fragrance, live commerce and events.",
    href: "/creator",
    highlights: ["25K+ community", "20M+ views", "TikTok", "Reels", "Brand campaigns", "Live commerce"],
  },
  {
    period: "2024 — 2026",
    title: "Performance partnerships",
    role: "Commerce promotion / performance",
    summary: "Commerce promotion measured through sign-ups, parcels and freight; partner-level reporting stays private.",
    href: "/affiliate",
    highlights: ["Sign-ups", "Parcels", "Freight", "Dashboards", "Reporting", "Performance analysis"],
  },
  {
    period: "2023 — present",
    title: "CapCut UK",
    role: "Community manager / creator operations",
    summary:
      "UK creator operations with the internal team in Shanghai across support, challenges, payments, reporting and issue escalation.",
    href: "/professional/capcut",
    highlights: ["UK creator support", "UK ↔ Shanghai", "Cross-border communication", "Payments", "Bug escalation", "Reporting"],
  },
  {
    period: "2018 — present",
    title: "Photography",
    role: "Travel / aerial / event / lifestyle photographer",
    summary: "Travel, aerial, event and lifestyle photography built into a 616-image public archive.",
    href: "/photography",
    highlights: ["Travel", "Aerial", "Events", "Lifestyle", "Editing", "Pexels"],
  },
];

export const BACKGROUND_MILESTONES = [
  {
    period: "2018–20",
    title: "Photography beginnings",
    copy: "Started taking photography seriously and built the foundation for the later travel, aerial and lifestyle archive.",
  },
  {
    period: "2023",
    title: "Fashion / e-commerce",
    copy: "Ran an independent fashion project covering branding, e-commerce and customer communication.",
  },
  {
    period: "2023",
    title: "Creator community operations",
    copy: "Started the CapCut UK role across creator support, challenges, payments, moderation and UK ↔ Shanghai communication.",
  },
  {
    period: "2024",
    title: "@fitswitharchie grows",
    copy: "Fashion and lifestyle content grew into regular brand work and a community that passed 25K followers and 20M views.",
  },
  {
    period: "2024–26",
    title: "Performance partnerships",
    copy: "Expanded creator work into commerce, tracking sign-ups, parcels and freight rather than stopping at reach.",
  },
] as const;

export const SELECTED_CLIENTS = [
  "Nike",
  "BOSS",
  "Moschino",
  "Superdry",
  "Lyle & Scott",
  "DAVIDOFF",
  "Jean Paul Gaultier",
  "Whatnot",
  "Sketch.co / All Points East",
] as const;

export const TOOLKIT = [
  {
    title: "Content production",
    items: ["Concept development", "Styling", "On-camera presenting", "Short-form filming", "Editing", "TikTok", "Instagram Reels"],
  },
  {
    title: "Community / operations",
    items: ["Discord", "Creator support", "Cross-border communication", "Moderation", "Challenge operations", "Payment administration", "Bug escalation", "Weekly reporting"],
  },
  {
    title: "Photography / capture",
    items: [
      "Sony ZV-1 II",
      "Samsung Galaxy S26 Ultra",
      "DJI Air 3",
      "DJI Osmo Action 5 Pro",
      "DJI Mic 2",
      "Travel photography",
      "Aerial photography",
      "Event coverage",
    ],
  },
  {
    title: "Web / data",
    items: ["Next.js", "React", "Vercel", "Supabase", "Cloudinary", "CSV workflows", "Spreadsheet reporting"],
  },
] as const;

export const PROFILE_STATS = [
  ["25K+", "Social community"],
  ["20M+", "Views across creator content"],
  ["3+ yrs", "Creator-community experience"],
  ["616", "Photographs in the public archive"],
] as const;
