export type PublicCampaignLink = {
  label: string;
  href: string;
  platform: "TikTok" | "Instagram";
  coverSrc?: string;
};

export type PublicCampaign = {
  id: string;
  brand: string;
  campaign: string;
  period: string;
  format: string;
  summary: string;
  logoSrc: string;
  logoAlt: string;
  tone: "ink" | "acid" | "stone" | "blue";
  links: PublicCampaignLink[];
  analytics: {
    likes: string;
  };
};

export type PartnershipExperience = {
  brand: string;
  detail: string;
};

export const PUBLIC_CAMPAIGNS: PublicCampaign[] = [
  {
    id: "nike",
    brand: "Nike",
    campaign: "Nike product integration",
    period: "January 2026",
    format: "Branded product integration",
    summary:
      "A fashion-led TikTok integration combining a clear branded-content disclosure with Archie's established styling format.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_NIKE.svg",
    logoAlt: "Nike Swoosh logo",
    tone: "ink",
    links: [
      {
        label: "Watch on TikTok",
        href: "https://vm.tiktok.com/ZNRrSuv3S/",
        platform: "TikTok",
        coverSrc: "/brand-work/nike-2026-01-07.webp",
      },
    ],
    analytics: { likes: "134" },
  },
  {
    id: "boss-bottled-beyond",
    brand: "BOSS",
    campaign: "BOSS Bottled Beyond",
    period: "October 2025",
    format: "Fragrance gifting",
    summary:
      "A polished fragrance integration shaped for short-form fashion and lifestyle audiences.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boss_logo_2021.svg",
    logoAlt: "BOSS wordmark",
    tone: "stone",
    links: [
      {
        label: "Watch on TikTok",
        href: "https://vm.tiktok.com/ZNd7Wft36/",
        platform: "TikTok",
        coverSrc: "/brand-work/boss-bottled-beyond-2025-10-04.webp",
      },
    ],
    analytics: { likes: "88" },
  },
  {
    id: "moschino-toy",
    brand: "Moschino",
    campaign: "Moschino Toy",
    period: "June 2025",
    format: "TikTok + Instagram Reel",
    summary:
      "A cross-platform fragrance campaign delivered for TikTok and Instagram, with both live placements retained.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moschino_logo.svg",
    logoAlt: "Moschino wordmark",
    tone: "blue",
    links: [
      {
        label: "Watch on TikTok",
        href: "https://vm.tiktok.com/ZNdUsJTCT/",
        platform: "TikTok",
        coverSrc: "/brand-work/moschino-toy-2025-06-23.webp",
      },
      {
        label: "Watch on Instagram",
        href: "https://www.instagram.com/reel/DLP4vh6s_Kk/?igsh=MWZoY2htZ3A3dTRlNQ==",
        platform: "Instagram",
      },
    ],
    analytics: { likes: "93" },
  },
  {
    id: "superdry-2024",
    brand: "Superdry",
    campaign: "Two-part styling campaign",
    period: "September 2024",
    format: "Two TikTok deliverables",
    summary:
      "Two coordinated fashion posts created and published as part of a gifted Superdry campaign.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Superdry_Logo_2020.svg",
    logoAlt: "Superdry wordmark",
    tone: "acid",
    links: [
      {
        label: "Watch post one",
        href: "https://vm.tiktok.com/ZGeEcsen9/",
        platform: "TikTok",
        coverSrc: "/brand-work/superdry-2024-09-16.webp",
      },
      {
        label: "Watch post two",
        href: "https://vm.tiktok.com/ZGeoh1to7/",
        platform: "TikTok",
        coverSrc: "/brand-work/superdry-2024-09-21.webp",
      },
    ],
    analytics: { likes: "660 + 2,954" },
  },
];

export const PARTNERSHIP_ROSTER: PartnershipExperience[] = [
  { brand: "Nike", detail: "Fashion product integration" },
  { brand: "BOSS", detail: "Bottled Beyond fragrance" },
  { brand: "Moschino", detail: "Toy fragrance campaign" },
  { brand: "Superdry", detail: "Fashion and styling campaigns" },
  { brand: "Jean Paul Gaultier", detail: "Le Male fragrance gifting" },
  { brand: "Lyle & Scott", detail: "Fashion creator collaboration" },
  { brand: "Sketch.co / All Points East", detail: "Tyler, The Creator event promotion" },
  { brand: "Tilt / Redpill", detail: "Go Full Tilt creator campaign" },
  { brand: "Firmoo", detail: "Eyewear creator work" },
  {
    brand: "NOTION MGMT",
    detail: "KiLLOWEN — Pick Your Poison · KiLLOWEN — ALL 2 U",
  },
  { brand: "KORA Works", detail: "Omar+ — Frozen" },
  { brand: "Snoop", detail: "Budgeting app partnership" },
  { brand: "In Print We Trust", detail: "TikTok Shop creator programme" },
  { brand: "Domno Vintage", detail: "Vintage and jewellery partnership" },
  { brand: "The Supermade", detail: "Streetwear partnership" },
  { brand: "Whatnot", detail: "Men's Fashion & Sneakers Creator Programme" },
];
