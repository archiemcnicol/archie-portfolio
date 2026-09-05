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
    summary:
      "Building web experiences and practical content systems that connect portfolio presentation, analytics, asset organisation and publishing workflows.",
    href: "/business",
    highlights: ["Next.js", "Vercel", "GitHub", "Supabase", "Cloudinary", "Content systems"],
  },
  {
    period: "2024 — present",
    title: "@fitswitharchie",
    role: "Content creator",
    summary:
      "Fashion and lifestyle short-form content grown into a 25K+ community and more than 20M views, alongside paid and gifted work across fashion, fragrance, live commerce and events.",
    href: "/creator",
    highlights: ["25K+ community", "20M+ views", "TikTok", "Reels", "Brand campaigns", "Live commerce"],
  },
  {
    period: "2024 — 2026",
    title: "Performance partnerships",
    role: "Affiliate / creator-led acquisition",
    summary:
      "Creator-led acquisition work tracked beyond views into registrations, activations, parcels and freight across ACBuy, USFans and earlier commerce partnerships, supported by spreadsheet, CSV and dashboard workflows.",
    href: "/affiliate",
    highlights: ["Registrations", "Activations", "Conversion", "Freight", "Dashboards", "Partner reporting"],
  },
  {
    period: "2023 — present",
    title: "CapCut UK",
    role: "Community manager / creator operations",
    summary:
      "More than three years working directly with creators and central teams across support, challenges, payment administration, reporting, moderation, issue escalation and programme communication.",
    href: "/professional/capcut",
    highlights: ["Creator support", "Challenge operations", "Payments", "Moderation", "Bug escalation", "Reporting"],
  },
  {
    period: "2018 — present",
    title: "Photography",
    role: "Travel / aerial / event / lifestyle photographer",
    summary:
      "Photography began as an early creative interest around 2018, developed through 2019–20 and later grew into a large travel, aerial, event and lifestyle archive presented independently and through Pexels.",
    href: "/photography",
    highlights: ["Travel", "Aerial", "Events", "Lifestyle", "Editing", "Pexels"],
  },
];

export const BACKGROUND_MILESTONES = [
  {
    period: "2018–20",
    title: "Photography beginnings",
    copy: "Started taking photography seriously around 2018 and kept developing the craft through 2019–20, building the foundation for the later travel, aerial and lifestyle portfolio.",
  },
  {
    period: "Early independent work",
    title: "Fashion / e-commerce",
    copy: "Launched and operated an independent fashion project, learning branding, e-commerce, customer communication and the commercial side of building something for an audience.",
  },
  {
    period: "2023",
    title: "Creator community operations",
    copy: "Began the long-running CapCut community-management work that developed into creator support, reporting, challenge operations, payments, moderation and central-team liaison.",
  },
  {
    period: "2024",
    title: "@fitswitharchie grows",
    copy: "Fashion and lifestyle content became a much larger public focus, developing into regular short-form work, brand campaigns and a community that later passed 25K followers and 20M views.",
  },
  {
    period: "2024–26",
    title: "Performance partnerships",
    copy: "Expanded creator work into affiliate and commerce partnerships, learning to measure registrations, activations, parcels, freight and conversion rather than stopping at social reach.",
  },
  {
    period: "2026",
    title: "Full-time creative focus",
    copy: "After completing A-level study, chose to move directly into full-time creative work rather than university, with creator work, photography, community operations and digital projects developed together.",
  },
] as const;

export const EDUCATION = {
  period: "Completed 2026",
  title: "A-levels",
  subjects: ["Geography", "Media Studies", "Photography"],
  summary:
    "Completed A-level study in 2026, then moved directly into full-time creative work rather than university.",
};

export const TOOLKIT = [
  {
    title: "Content production",
    items: ["Concept development", "Styling", "On-camera presenting", "Short-form filming", "Editing", "TikTok", "Instagram Reels"],
  },
  {
    title: "Community / operations",
    items: ["Discord", "Creator support", "Moderation", "Challenge operations", "Payment administration", "Bug escalation", "Weekly reporting"],
  },
  {
    title: "Photography / capture",
    items: ["Sony ZV-1 II", "DJI Air 3", "DJI Osmo Action 5 Pro", "Travel photography", "Aerial photography", "Event coverage"],
  },
  {
    title: "Web / data",
    items: ["Next.js", "React", "GitHub", "Vercel", "Supabase", "Cloudinary", "CSV workflows", "Spreadsheet reporting"],
  },
] as const;

export const PROFILE_STATS = [
  ["25K+", "Social community"],
  ["20M+", "Views across creator content"],
  ["3+ yrs", "Creator-community experience"],
  ["616", "Photographs in the public archive"],
] as const;
