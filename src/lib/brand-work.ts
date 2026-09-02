export type PublicCampaign = {
  id: string;
  brand: string;
  campaign: string;
  period: string;
  format: string;
  summary: string;
  mark: string;
  tone: "ink" | "acid" | "stone" | "blue";
  links: { label: string; href: string }[];
};

export const PUBLIC_CAMPAIGNS: PublicCampaign[] = [
  {
    id: "nike-superawesome",
    brand: "Nike",
    campaign: "Nike x SuperAwesome",
    period: "January 2026",
    format: "Branded product integration",
    summary:
      "A fashion-led TikTok integration combining a clear branded-content disclosure with Archie's established styling format.",
    mark: "NK",
    tone: "ink",
    links: [
      { label: "Watch on TikTok", href: "https://vm.tiktok.com/ZNRrSuv3S/" },
    ],
  },
  {
    id: "boss-bottled-beyond",
    brand: "BOSS",
    campaign: "BOSS Bottled Beyond",
    period: "October 2025",
    format: "Fragrance gifting",
    summary:
      "A polished fragrance integration shaped for short-form fashion and lifestyle audiences.",
    mark: "BS",
    tone: "stone",
    links: [
      { label: "Watch on TikTok", href: "https://vm.tiktok.com/ZNd7Wft36/" },
    ],
  },
  {
    id: "moschino-toy",
    brand: "Moschino",
    campaign: "Moschino Toy",
    period: "June 2025",
    format: "TikTok + Instagram Reel",
    summary:
      "A cross-platform fragrance campaign delivered for TikTok and Instagram, with both live placements retained.",
    mark: "MO",
    tone: "blue",
    links: [
      { label: "Watch on TikTok", href: "https://vm.tiktok.com/ZNdUsJTCT/" },
      {
        label: "Watch on Instagram",
        href: "https://www.instagram.com/reel/DLP4vh6s_Kk/?igsh=MWZoY2htZ3A3dTRlNQ==",
      },
    ],
  },
  {
    id: "superdry-2024",
    brand: "Superdry",
    campaign: "Two-part styling campaign",
    period: "September 2024",
    format: "Two TikTok deliverables",
    summary:
      "Two coordinated fashion posts created and published as part of a gifted Superdry campaign.",
    mark: "SD",
    tone: "acid",
    links: [
      { label: "Watch post one", href: "https://vm.tiktok.com/ZGeEcsen9/" },
      { label: "Watch post two", href: "https://vm.tiktok.com/ZGeoh1to7/" },
    ],
  },
];

export const PARTNERSHIP_ROSTER = [
  "Nike",
  "BOSS",
  "Moschino",
  "Superdry",
  "Jean Paul Gaultier",
  "Lyle & Scott",
  "All Points East",
  "Tilt / Redpill",
  "Firmoo",
  "NOTION MGMT",
  "KORA Works",
];
