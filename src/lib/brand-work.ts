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
        label: "Watch on TikTok",
        href: "https://www.tiktok.com/@fitswitharchie/video/7592280935027035414",
        platform: "TikTok",
        coverSrc: "/brand-work/nike-2026-01-07.webp",
      },
    ],
    analytics: { views: "22.5K", likes: "1,077" },
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
        href: "https://www.tiktok.com/@fitswitharchie/video/7557375899180485910",
        platform: "TikTok",
        coverSrc: "/brand-work/boss-bottled-beyond-2025-10-04.webp",
        analytics: { views: "1.8K", likes: "88" },
      },
      {
        label: "Video 02 · 7 Jan 2026",
        href: "https://www.tiktok.com/@fitswitharchie/video/7592653916953644310",
        platform: "TikTok",
        analytics: { views: "2.9K", likes: "134" },
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
        href: "https://www.tiktok.com/@fitswitharchie/video/7519140859351174422",
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
        href: "https://www.tiktok.com/@fitswitharchie/video/7415251227971259680",
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
    period: "6 Jan 2026",
    brandUrl: "https://www.nike.com/gb/",
    campaignPartner: "SuperAwesome",
    partnerUrl: "https://www.superawesome.com/",
    managedBy: [{ name: "Ryan Herrieff", organisation: "SuperAwesome", role: "Campaign contact" }],
    analytics: { views: "22.5K", likes: "1,077" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7592280935027035414", platform: "TikTok" },
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
        label: "TikTok 1",
        href: "https://www.tiktok.com/@fitswitharchie/video/7557375899180485910",
        platform: "TikTok",
        analytics: { views: "1.8K", likes: "88" },
      },
      {
        label: "TikTok 2",
        href: "https://www.tiktok.com/@fitswitharchie/video/7592653916953644310",
        platform: "TikTok",
        analytics: { views: "2.9K", likes: "134" },
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
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7519140859351174422", platform: "TikTok" },
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
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7415251227971259680", platform: "TikTok" },
    ],
  },
  {
    brand: "Lyle & Scott",
    detail: "Fashion creator collaboration",
    period: "1 May 2025",
    brandUrl: "https://www.lyleandscott.com/",
    campaignPartner: "CheekySport",
    partnerUrl: "https://cheekysport.com/",
    analytics: { views: "46.5K", likes: "1,676" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7499465138953653526", platform: "TikTok" },
    ],
  },
  {
    brand: "DAVIDOFF",
    detail: "Cool Elixir new fragrance launch",
    period: "Published 6 Jul 2025",
    brandUrl: "https://www.zinodavidoff.com/",
    campaignPartner: "Disrupt Marketing",
    partnerUrl: "https://disruptmarketing.co/",
    managedBy: [{ name: "Alice Mangazzi", organisation: "Disrupt Marketing", role: "Campaign management" }],
    analytics: { views: "2.1K", likes: "62" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7523993384546077974", platform: "TikTok" },
    ],
  },
  {
    brand: "Sketch.co",
    detail: "All Points East / Tyler, The Creator · two event-promotion videos",
    period: "Aug 2026",
    links: [
      {
        label: "TikTok 1",
        href: "https://www.tiktok.com/@fitswitharchie/video/7676507920359558422",
        platform: "TikTok",
        analytics: { views: "11.6K", likes: "374" },
      },
      {
        label: "TikTok 2",
        href: "https://www.tiktok.com/@fitswitharchie/video/7678728230278303008",
        platform: "TikTok",
        analytics: { views: "16.6K", likes: "1,048" },
      },
    ],
  },
  {
    brand: "TILT",
    detail: "Go Full Tilt creator campaign · two TikTok deliverables",
    period: "7–8 Jul 2025",
    brandUrl: "https://www.tilt.app/",
    campaignPartner: "Redpill",
    links: [
      {
        label: "TikTok 1",
        href: "https://www.tiktok.com/@fitswitharchie/video/7524371608803265814",
        platform: "TikTok",
        analytics: { views: "637.9K", likes: "4.1K" },
      },
      {
        label: "TikTok 2",
        href: "https://www.tiktok.com/@fitswitharchie/video/7524743379410881814",
        platform: "TikTok",
        analytics: { views: "914.6K", likes: "5.4K" },
      },
    ],
  },
  {
    brand: "KiLLOWEN",
    detail: "Pick Your Poison · music promotion",
    period: "10 Mar 2025",
    campaignPartner: "NOTION MGMT",
    partnerUrl: "https://notionmgmt.com/",
    analytics: { views: "271.3K", likes: "18K" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7480232374132018434", platform: "TikTok" },
    ],
  },
  {
    brand: "Domno Vintage",
    detail: "Vintage and jewellery affiliate collaboration",
    period: "7 May 2025",
    brandUrl: "https://domno.com/",
    analytics: { views: "5.2K", likes: "135" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7501481439297293590", platform: "TikTok" },
    ],
  },
  {
    brand: "The Supermade",
    detail: "Streetwear collaboration",
    period: "2 Jun 2025",
    brandUrl: "https://www.thesupermade.com/en-uk/",
    analytics: { views: "2.1K", likes: "67" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7511393518951091478", platform: "TikTok" },
    ],
  },
  {
    brand: "Inflation",
    detail: "Fashion collaboration",
    period: "15 May 2025",
    analytics: { views: "5.2K", likes: "182" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7504690174270557462", platform: "TikTok" },
    ],
  },
  {
    brand: "WINTR",
    detail: "Fashion collaboration",
    period: "13 Dec 2024",
    analytics: { views: "92.5K", likes: "3,514" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7447955753240939808", platform: "TikTok" },
    ],
  },
  {
    brand: "Firmoo",
    detail: "Eyewear creator work",
    period: "8 Nov 2024",
    analytics: { views: "24.5K", likes: "816" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7434975842251394336", platform: "TikTok" },
    ],
  },
  {
    brand: "TEE CLAN",
    detail: "Streetwear collaboration",
    period: "6 Nov 2024",
    brandUrl: "https://teeclan.store/",
    analytics: { views: "14.9K", likes: "496" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7434213429142900000", platform: "TikTok" },
    ],
  },
  {
    brand: "VSZN",
    detail: "Fashion collaboration",
    period: "Oct 2024",
    analytics: { views: "34.5K", likes: "1,542" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7430871224265313568", platform: "TikTok" },
    ],
  },
  {
    brand: "SPYDA",
    detail: "Fashion collaboration",
    period: "24 Oct 2024",
    analytics: { views: "18.3K", likes: "742" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7429383030269070625", platform: "TikTok" },
    ],
  },
  {
    brand: "Unfounded Studios",
    detail: "Fashion content and delivered campaign assets",
    period: "Jul + Oct 2024",
    links: [
      {
        label: "TikTok 1",
        href: "https://www.tiktok.com/@fitswitharchie/video/7395243777901858081",
        platform: "TikTok",
        analytics: { views: "12.4K", likes: "559" },
      },
      {
        label: "TikTok 2",
        href: "https://www.tiktok.com/@fitswitharchie/video/7427512816929639712",
        platform: "TikTok",
        analytics: { views: "12.9K", likes: "609" },
      },
    ],
  },
  {
    brand: "ALY",
    detail: "Jewellery collaboration",
    period: "4 Sep 2024",
    analytics: { views: "403.5K", likes: "29.8K" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7410796625053945120", platform: "TikTok" },
    ],
  },
  {
    brand: "Nowhere Specific",
    detail: "Fashion collaboration",
    period: "Sep 2024",
    brandUrl: "https://nowherespecificclothing.com/",
    analytics: { views: "27.1K", likes: "1,056" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7410423230105701664", platform: "TikTok" },
    ],
  },
  {
    brand: "In Print We Trust",
    detail: "Fashion creator collaboration",
    period: "28 Aug 2024",
    analytics: { views: "20.5K", likes: "842" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7408212871684885792", platform: "TikTok" },
    ],
  },
  {
    brand: "Vintage Crest",
    detail: "Vintage fashion collaboration",
    period: "20 Aug 2024",
    analytics: { views: "32.5K", likes: "980" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7405270388193692961", platform: "TikTok" },
    ],
  },
  {
    brand: "Offshore Clothing",
    detail: "Fashion collaboration",
    period: "27 Jul 2024",
    analytics: { views: "17.1K", likes: "625" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7396362773879459104", platform: "TikTok" },
    ],
  },
  {
    brand: "Jean Paul Gaultier",
    detail: "Le Male fragrance gifting",
    period: "Sep 2025",
    analytics: { views: "2.8K", likes: "164" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7552940839467633923", platform: "TikTok" },
    ],
  },
  {
    brand: "KORA Works",
    detail: "Omar+ — Frozen · paid music promotion",
    period: "26 Nov 2025",
    analytics: { views: "7.7K", likes: "195" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7577072259290991894", platform: "TikTok" },
    ],
  },
  {
    brand: "Snoop",
    detail: "Budgeting app creator campaign promoted through TikTok One",
    brandUrl: "https://snoop.app/",
    campaignPartner: "Redpill",
    managedBy: [{ name: "Candyce", organisation: "Redpill", role: "Campaign management" }],
  },
  {
    brand: "Whatnot",
    detail: "Men's Fashion & Sneakers Creator Programme · shopping haul",
    period: "3 Sep 2026",
    brandUrl: "https://www.whatnot.com/",
    analytics: { views: "1.1K", likes: "37" },
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@fitswitharchie/video/7681338945694731552", platform: "TikTok" },
    ],
  },
];