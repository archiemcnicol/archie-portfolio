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
    period: "2023 — present",
    title: "CapCut UK",
    role: "Community manager / creator operations",
    summary:
      "More than three years working directly with UK creators and central teams across creator support, challenges, payment administration, reporting and issue escalation.",
    href: "/professional/capcut",
    highlights: ["Creator support", "Challenge operations", "Payments", "Bug escalation", "Weekly reporting"],
  },
  {
    period: "2024 — present",
    title: "@fitswitharchie",
    role: "Content creator",
    summary:
      "Fashion and lifestyle short-form content grown into a 25K+ community and more than 20M views, alongside paid and gifted work for major fashion, fragrance and event clients.",
    href: "/creator",
    highlights: ["25K+ community", "20M+ views", "TikTok", "Reels", "Brand campaigns"],
  },
  {
    period: "2024 — 2026",
    title: "Performance partnerships",
    role: "Affiliate / creator-led acquisition",
    summary:
      "Creator-led acquisition work tracked beyond views into registrations, activations, parcels, freight and partner revenue signals across ACBuy, USFans and earlier agent partnerships.",
    href: "/affiliate",
    highlights: ["Registrations", "Activations", "Conversion", "Freight", "Partner reporting"],
  },
  {
    period: "2024 — present",
    title: "Photography",
    role: "Travel / event / lifestyle photographer",
    summary:
      "A growing photography archive spanning travel, aerial, event and lifestyle work, with public work presented both independently and through Pexels.",
    href: "/photography",
    highlights: ["Travel", "Aerial", "Events", "Lifestyle", "Editing"],
  },
  {
    period: "2026 — present",
    title: "Digital projects",
    role: "Web / content systems",
    summary:
      "Building web experiences and practical content systems that connect portfolio presentation, analytics, asset organisation and publishing workflows.",
    href: "/business",
    highlights: ["Next.js", "Vercel", "GitHub", "Supabase", "Content systems"],
  },
];

export const EDUCATION = {
  period: "Completed 2026",
  title: "A-levels",
  subjects: ["Geography", "Media Studies", "Photography"],
  summary:
    "Completed A-level study in 2026, then chose to move directly into full-time creative work rather than university.",
};

export const PROFILE_STATS = [
  ["25K+", "Social community"],
  ["20M+", "Views across creator content"],
  ["3+ yrs", "Creator-community experience"],
  ["616", "Photographs in the public archive"],
] as const;
