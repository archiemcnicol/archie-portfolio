export type CampaignMetric = {
  views: string;
  likes: string;
};

export type CampaignContact = {
  name: string;
  organisation?: string;
  role?: string;
};

export type PublicCampaignLink = {
  label: string;
  href?: string;
  platform: "TikTok" | "Instagram";
  coverSrc?: string;
  analytics?: CampaignMetric;
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
  brandUrl?: string;
  campaignPartner?: string;
  partnerUrl?: string;
  managedBy?: CampaignContact[];
  links: PublicCampaignLink[];
  analytics?: CampaignMetric;
};

export type PartnershipExperience = {
  brand: string;
  detail: string;
  period?: string;
  brandUrl?: string;
  campaignPartner?: string;
  partnerUrl?: string;
  managedBy?: CampaignContact[];
  analytics?: CampaignMetric;
  links?: PublicCampaignLink[];
};

export type SelectedPerformance = {
  id: string;
  brand: string;
  campaign?: string;
  period?: string;
  views: string;
  likes: string;
  brandUrl?: string;
  campaignPartner?: string;
  partnerUrl?: string;
};

export const PUBLIC_CAMPAIGNS: PublicCampaign[] = [
  {
    id: "nike",
    brand: "Nike",
    campaign: "Nike product integration",
    period: "January 2026",
    format: "Branded product integration",
    summary:
      "A fashion-led product integration built from the brief through styling, filming and edit, shaped to feel native to Archie's established short-form format.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_NIKE.svg",
    logoAlt: "Nike Swoosh logo",
    tone: "ink",
    brandUrl: "https://www.nike.com/gb/",
    campaignPartner: "SuperAwesome",
    partnerUrl: "https://www.superawesome.com/",
    managedBy: [
      { name: "Ryan Herrieff", organisation: "SuperAwesome", role: "Campaign contact" },
    ],
    links: [
      {
        label: "Watch on TikTok · 7 Jan 2026",
        href: "https://vm.tiktok.com/ZNRrSuv3S/",
        platform: "TikTok",
        coverSrc: "/brand-work/nike-2026-01-07.webp",
      },
    ],
    analytics: { views: "2.9K", likes: "134" },
  },
  {
    id: "boss-bottled-beyond",
    brand: "BOSS",
    campaign: "BOSS Bottled fragrance work",
    period: "October 2025 — January 2026",
    format: "2 fragrance integrations",
    summary:
      "Two separate BOSS Bottled fragrance promotions translated into polished, platform-native fashion and lifestyle content.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boss_logo_2021.svg",
    logoAlt: "BOSS wordmark",
    tone: "stone",
    brandUrl: "https://www.hugoboss.com/uk/",
    campaignPartner: "Socially Powerful",
    partnerUrl: "https://sociallypowerful.com/",
    managedBy: [
      { name: "Robbie Sheaves", organisation: "Socially Powerful", role: "Account Executive" },
    ],
    links: [
      {
        label: "Video 01 · 4 Oct 2025",
        href: "https://vm.tiktok.com/ZNd7Wft36/",
        platform: "TikTok",
        coverSrc: "/brand-work/boss-bottled-beyond-2025-10-04.webp",
        analytics: { views: "1.8K", likes: "88" },
      },
      {
        label: "Video 02 · 6 Jan 2026",
        href: "https://www.tiktok.com/@7342225099493606432/video/7592280935027035414",
        platform: "TikTok",
        analytics: { views: "22.5K", likes: "1,077" },
      },
    ],
  },
  {
    id: "moschino-toy",
    brand: "Moschino",
    campaign: "Moschino Toy",
    period: "June 2025",
    format: "TikTok + Instagram Reel",
    summary:
      "A cross-platform fragrance brief taken from product receipt and creative development through client approval and final TikTok and Instagram delivery.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moschino_logo.svg",
    logoAlt: "Moschino wordmark",
    tone: "blue",
    brandUrl: "https://www.moschino.com/",
    campaignPartner: "Buttermilk",
    partnerUrl: "https://www.buttermilk.com/",
    managedBy: [
      { name: "Zoe McGillicuddy", organisation: "Buttermilk", role: "Campaign management" },
      { name: "Haydn Manning", organisation: "Buttermilk", role: "Account management" },
    ],
    links: [
      {
        label: "Watch on TikTok",
        href: "https://vm.tiktok.com/ZNdUsJTCT/",
        platform: "TikTok",
        coverSrc: "/brand-work/moschino-toy-2025-06-23.webp",
      },
      {
        label: "Watch on Instagram",
        href: "https://www.instagram.com/reel/DLP4vh6s_Kk/",
        platform: "Instagram",
      },
    ],
    analytics: { views: "2.8K", likes: "93" },
  },
  {
    id: "superdry-2024",
    brand: "Superdry",
    campaign: "Superdry styling campaign",
    period: "September 2024",
    format: "TikTok styling video",
    summary:
      "A fashion-led styling brief commissioned directly by Superdry and developed into a native short-form deliverable. One live campaign video remains in the portfolio.",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Superdry_Logo_2020.svg",
    logoAlt: "Superdry wordmark",
    tone: "acid",
    brandUrl: "https://www.superdry.com/",
    managedBy: [
      { name: "Lydia Shute", organisation: "Superdry", role: "Campaign contact" },
    ],
    links: [
      {
        label: "Watch on TikTok",
        href: "https://vm.tiktok.com/ZGeEcsen9/",
        platform: "TikTok",
        coverSrc: "/brand-work/superdry-2024-09-16.webp",
      },
    ],
    analytics: { views: "28.6K", likes: "665" },
  },
];

export const SELECTED_PERFORMANCE: SelectedPerformance[] = [
  {
    id: "tilt-2025-07-08",
    brand: "TILT",
    campaign: "Go Full Tilt",
    period: "8 Jul 2025",
    views: "914.6K",
    likes: "5.4K",
    brandUrl: "https://www.tilt.app/",
    campaignPartner: "Redpill",
  },
  {
    id: "tilt-2025-07-07",
    brand: "TILT",
    campaign: "Go Full Tilt",
    period: "7 Jul 2025",
    views: "637.9K",
    likes: "4.1K",
    brandUrl: "https://www.tilt.app/",
    campaignPartner: "Redpill",
  },
  {
    id: "aly-2024-09-04",
    brand: "ALY",
    period: "4 Sep 2024",
    views: "403.5K",
    likes: "29.8K",
  },
  {
    id: "killowen-pick-your-poison",
    brand: "KiLLOWEN",
    campaign: "Pick Your Poison",
    period: "2025",
    views: "271.3K",
    likes: "18K",
    campaignPartner: "NOTION MGMT",
    partnerUrl: "https://notionmgmt.com/",
  },
  {
    id: "wintr-2024-12-13",
    brand: "WINTR",
    period: "13 Dec 2024",
    views: "92.5K",
    likes: "3.5K",
  },
  {
    id: "lyle-scott-2025-05-01",
    brand: "Lyle & Scott",
    period: "1 May 2025",
    views: "46.5K",
    likes: "1.7K",
    brandUrl: "https://www.lyleandscott.com/",
    campaignPartner: "CheekySport",
  },
];

export const PARTNERSHIP_ROSTER: PartnershipExperience[] = [
  {
    brand: "Nike",
    detail: "Fashion product integration",
    period: "7 Jan 2026",
    brandUrl: "https://www.nike.com/gb/",
    campaignPartner: "SuperAwesome",
    partnerUrl: "https://www.superawesome.com/",
    managedBy: [{ name: "Ryan Herrieff", organisation: "SuperAwesome", role: "Campaign contact" }],
    analytics: { views: "2.9K", likes: "134" },
    links: [
      { label: "TikTok", href: "https://vm.tiktok.com/ZNRrSuv3S/", platform: "TikTok" },
    ],
  },
  {
    brand: "BOSS",
    detail: "Two BOSS Bottled fragrance integrations",
    period: "Oct 2025 — Jan 2026",
    brandUrl: "https://www.hugoboss.com/uk/",
    campaignPartner: "Socially Powerful",
    partnerUrl: "https://sociallypowerful.com/",
    managedBy: [{ name: "Robbie Sheaves", organisation: "Socially Powerful", role: "Account Executive" }],
    links: [
      {
        label: "TikTok · video 01",
        href: "https://vm.tiktok.com/ZNd7Wft36/",
        platform: "TikTok",
        analytics: { views: "1.8K", likes: "88" },
      },
      {
        label: "TikTok · video 02",
        href: "https://www.tiktok.com/@7342225099493606432/video/7592280935027035414",
        platform: "TikTok",
        analytics: { views: "22.5K", likes: "1,077" },
      },
    ],
  },
  {
    brand: "Moschino",
    detail: "Toy fragrance campaign · TikTok + Instagram Reel",
    period: "23 Jun 2025",
    brandUrl: "https://www.moschino.com/",
    campaignPartner: "Buttermilk",
    partnerUrl: "https://www.buttermilk.com/",
    managedBy: [
      { name: "Zoe McGillicuddy", organisation: "Buttermilk", role: "Campaign management" },
      { name: "Haydn Manning", organisation: "Buttermilk", role: "Account management" },
    ],
    analytics: { views: "2.8K", likes: "93" },
    links: [
      { label: "TikTok", href: "https://vm.tiktok.com/ZNdUsJTCT/", platform: "TikTok" },
      { label: "Instagram", href: "https://www.instagram.com/reel/DLP4vh6s_Kk/", platform: "Instagram" },
    ],
  },
  {
    brand: "Superdry",
    detail: "Fashion styling campaign · one live TikTok deliverable",
    period: "16 Sep 2024",
    brandUrl: "https://www.superdry.com/",
    managedBy: [{ name: "Lydia Shute", organisation: "Superdry", role: "Campaign contact" }],
    analytics: { views: "28.6K", likes: "665" },
    links: [
      { label: "TikTok", href: "https://vm.tiktok.com/ZGeEcsen9/", platform: "TikTok" },
    ],
  },
  {
    brand: "Lyle & Scott",
    detail: "Fashion creator collaboration",
    period: "1 May 2025",
    brandUrl: "https://www.lyleandscott.com/",
    campaignPartner: "CheekySport",
    partnerUrl: "https://cheekysport.com/",
    analytics: { views: "46.5K", likes: "1.7K" },
  },
  {
    brand: "DAVIDOFF",
    detail: "Cool Elixir new fragrance launch",
    period: "Published 6 Jul 2025",
    brandUrl: "https://www.zinodavidoff.com/",
    campaignPartner: "Disrupt Marketing",
    partnerUrl: "https://disruptmarketing.co/",
    managedBy: [
      { name: "Alice Mangazzi", organisation: "Disrupt Marketing", role: "Campaign management" },
    ],
    analytics: { views: "2.1K", likes: "62" },
  },
  {
    brand: "All Points East · Tyler, The Creator",
    detail: "Two event-promotion videos",
    period: "Aug 2026",
    campaignPartner: "Skitch",
    partnerUrl: "https://skitch.co/",
  },
  {
    brand: "TILT",
    detail: "Go Full Tilt creator campaign · two TikTok deliverables",
    period: "7–8 Jul 2025",
    brandUrl: "https://www.tilt.app/",
    campaignPartner: "Redpill",
    analytics: { views: "1.55M", likes: "9.5K" },
  },
  {
    brand: "KiLLOWEN",
    detail: "Pick Your Poison · music promotion",
    period: "2025",
    campaignPartner: "NOTION MGMT",
    partnerUrl: "https://notionmgmt.com/",
    analytics: { views: "271.3K", likes: "18K" },
  },
  {
    brand: "Domno Vintage",
    detail: "Vintage and jewellery affiliate collaboration",
    period: "7 May 2025",
    brandUrl: "https://domno.com/",
    analytics: { views: "5.2K", likes: "135" },
  },
  {
    brand: "The Supermade",
    detail: "Streetwear collaboration",
    period: "2 Jun 2025",
    brandUrl: "https://www.thesupermade.com/en-uk/",
    analytics: { views: "2.1K", likes: "67" },
  },
  {
    brand: "Inflation",
    detail: "Fashion collaboration",
    period: "15 May 2025",
    analytics: { views: "5.2K", likes: "182" },
  },
  {
    brand: "WINTR",
    detail: "Fashion collaboration",
    period: "13 Dec 2024",
    analytics: { views: "92.5K", likes: "3.5K" },
  },
  {
    brand: "Fermi",
    detail: "Fashion collaboration",
    period: "8 Nov 2024",
    analytics: { views: "24.5K", likes: "816" },
  },
  {
    brand: "TEE CLAN",
    detail: "Streetwear collaboration",
    period: "6 Nov 2024",
    brandUrl: "https://teeclan.store/",
    analytics: { views: "15K", likes: "496" },
  },
  {
    brand: "VSZN",
    detail: "Fashion collaboration",
    period: "Oct 2024",
    analytics: { views: "34.5K", likes: "1.5K" },
  },
  {
    brand: "SPYDA",
    detail: "Fashion collaboration",
    period: "24 Oct 2024",
    analytics: { views: "18.3K", likes: "742" },
  },
  {
    brand: "Unfounded Studios",
    detail: "Fashion content and delivered campaign assets",
    period: "Jul + Oct 2024",
  },
  {
    brand: "ALY",
    detail: "Jewellery collaboration",
    period: "4 Sep 2024",
    analytics: { views: "403.5K", likes: "29.8K" },
  },
  {
    brand: "Nowhere Specific",
    detail: "Fashion collaboration",
    brandUrl: "https://nowherespecificclothing.com/",
    analytics: { views: "27.1K", likes: "1.1K" },
  },
  {
    brand: "In Print We Trust",
    detail: "TikTok Shop creator programme",
    period: "28 Aug 2024",
    analytics: { views: "20.5K", likes: "842" },
  },
  {
    brand: "Vintage Crest",
    detail: "Fashion collaboration",
    period: "20 Aug 2024",
    analytics: { views: "32.5K", likes: "980" },
  },
  {
    brand: "Offshore Clothing",
    detail: "Jewellery collaboration",
    period: "27 Jul 2024",
    analytics: { views: "17.1K", likes: "625" },
  },
  { brand: "Jean Paul Gaultier", detail: "Le Male fragrance gifting" },
  { brand: "Firmoo", detail: "Eyewear creator work" },
  { brand: "KORA Works", detail: "Omar+ — Frozen" },
  { brand: "Snoop", detail: "Budgeting app partnership" },
  {
    brand: "Whatnot",
    detail: "Men's Fashion & Sneakers Creator Programme",
    period: "Aug 2026",
    brandUrl: "https://www.whatnot.com/",
    links: [
      { label: "TikTok haul", href: "https://vm.tiktok.com/ZGdQeggsV/", platform: "TikTok" },
    ],
  },
];