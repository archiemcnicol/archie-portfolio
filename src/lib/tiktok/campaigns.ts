import type { BrandRule } from "@/lib/tiktok/scanner";

export type CampaignEvidenceStatus =
  | "confirmed"
  | "candidate"
  | "needs-review"
  | "excluded";

export type CampaignEvidenceRule = {
  id: string;
  brand: string;
  campaign: string;
  status: CampaignEvidenceStatus;
  confidence: number;
  postDates: string[];
  soundAliases?: string[];
  summary: string;
};

export type CampaignAuditLead = {
  brand: string;
  campaign: string;
  status: "campaign-confirmed" | "relationship-confirmed" | "candidate";
  summary: string;
  nextCheck: string;
};

export const KNOWN_BRAND_RULES: BrandRule[] = [
  { brand: "Superdry", aliases: ["superdry", "socialhit", "social hit"] },
  { brand: "Nike", aliases: ["nike", "snkrs", "superawesome"] },
  { brand: "Lyle & Scott", aliases: ["lyle & scott", "lyle and scott", "lyleandscott"] },
  { brand: "Moschino", aliases: ["moschino", "moschino toy"] },
  { brand: "BOSS", aliases: ["boss bottled", "hugoboss", "hugo boss", "bossrecognizeboss"] },
  { brand: "Jean Paul Gaultier", aliases: ["jean paul gaultier", "jeanpaulgaultier", "le male"] },
  { brand: "SUGARGOO", aliases: ["sugargoo"] },
  { brand: "NOTION MGMT", aliases: ["notion mgmt", "killowen", "creator core"] },
  { brand: "KORA Works", aliases: ["kora works", "kora.works", "omarplus", "omar+"] },
  { brand: "Tilt / Redpill", aliases: ["tilt", "redpill"] },
  { brand: "Firmoo", aliases: ["firmoo"] },
  { brand: "ACBuy", aliases: ["acbuy"] },
  { brand: "USFans", aliases: ["usfans", "us fans"] },
  { brand: "All Points East", aliases: ["all points east", "allpointseast"] },
];

export const CAMPAIGN_EVIDENCE_RULES: CampaignEvidenceRule[] = [
  {
    id: "sugargoo-2024-candidate",
    brand: "SUGARGOO",
    campaign: "2024 influencer relationship",
    status: "candidate",
    confidence: 78,
    postDates: ["2024-03-26"],
    summary:
      "TikTok marks this as Branded Content and the date closely precedes the formal SUGARGOO agreement. The exact post-level confirmation is still missing.",
  },
  {
    id: "superdry-august-2024-a",
    brand: "Superdry",
    campaign: "August 2024 TikTok campaign — post one",
    status: "confirmed",
    confidence: 100,
    postDates: ["2024-09-16"],
    summary: "Exact posting date and live TikTok link are confirmed in the Superdry email thread.",
  },
  {
    id: "superdry-august-2024-b",
    brand: "Superdry",
    campaign: "August 2024 TikTok campaign — post two",
    status: "confirmed",
    confidence: 100,
    postDates: ["2024-09-21"],
    summary: "The second exact campaign TikTok link is confirmed in the same Superdry thread.",
  },
  {
    id: "superdry-ski-2025",
    brand: "Superdry",
    campaign: "Superdry Ski",
    status: "needs-review",
    confidence: 66,
    postDates: ["2025-02-15", "2025-02-16", "2025-02-18"],
    summary:
      "The gifted ski campaign is confirmed, but the exact deliverable among the three public trip posts has not been isolated.",
  },
  {
    id: "notion-pick-your-poison",
    brand: "NOTION MGMT",
    campaign: "KiLLOWEN — Pick Your Poison",
    status: "confirmed",
    confidence: 99,
    postDates: ["2025-03-10"],
    soundAliases: ["pick your poison - killowen"],
    summary: "Exact public sound match, campaign approval trail and matching NOTION payment evidence.",
  },
  {
    id: "notion-chemical-fashion-drafts",
    brand: "NOTION MGMT",
    campaign: "Charlotte Plank — Chemical Fashion",
    status: "excluded",
    confidence: 45,
    postDates: ["2025-03-15", "2025-03-16"],
    soundAliases: ["chemical fashion - charlotte plank"],
    summary: "Both exact-sound posts are private Only You records, so they are not counted as completed public work.",
  },
  {
    id: "moschino-toy-2025",
    brand: "Moschino",
    campaign: "Moschino Toy",
    status: "confirmed",
    confidence: 100,
    postDates: ["2025-06-23"],
    summary: "Exact live link, timestamp and completed campaign email trail via Buttermilk.",
  },
  {
    id: "notion-all-2-u",
    brand: "NOTION MGMT",
    campaign: "KiLLOWEN — ALL 2 U",
    status: "confirmed",
    confidence: 99,
    postDates: ["2025-06-26"],
    soundAliases: ["all 2 u - killowen"],
    summary: "Exact public sound match immediately after the brief, supported by Creator Core payment evidence.",
  },
  {
    id: "boss-bottled-beyond",
    brand: "BOSS",
    campaign: "BOSS Bottled Beyond PR gifting",
    status: "confirmed",
    confidence: 100,
    postDates: ["2025-10-04"],
    summary:
      "The supplied BOSS live link resolves to the 4 October TikTok. Campaign requirements and completion are confirmed in prior records.",
  },
  {
    id: "boss-bottled-november-lead",
    brand: "BOSS",
    campaign: "BOSS Bottled — 14 November audit lead",
    status: "candidate",
    confidence: 82,
    postDates: ["2025-11-14"],
    summary:
      "Archie directly identified BOSS Bottled against 14 November 2025. It remains separate from the confirmed 4 October live link until the second trail is reconciled.",
  },
  {
    id: "kora-frozen",
    brand: "KORA Works",
    campaign: "Omar+ — Frozen",
    status: "confirmed",
    confidence: 100,
    postDates: ["2025-11-26"],
    soundAliases: ["frozen - omarplus"],
    summary: "Exact public sound match, £50 invoice the next day and matching KORA Works payment.",
  },
  {
    id: "nike-superawesome",
    brand: "Nike",
    campaign: "Nike x SuperAwesome gifting",
    status: "confirmed",
    confidence: 100,
    postDates: ["2026-01-07"],
    summary: "Exact supplied live link and TikTok's own Branded Content disclosure confirm the post.",
  },
];

export const CAMPAIGN_AUDIT_LEADS: CampaignAuditLead[] = [
  {
    brand: "Jean Paul Gaultier",
    campaign: "Le Male gifting",
    status: "campaign-confirmed",
    summary:
      "The 29 September 2025 follow-up confirms the gifting and says the content had already been shared the previous week.",
    nextCheck: "Resolve the exact public post between 22 and 28 September; do not attach the private 29 September record by assumption.",
  },
  {
    brand: "Lyle & Scott",
    campaign: "Historic creator collaboration",
    status: "relationship-confirmed",
    summary: "Prior records confirm genuine collaboration history, but not the exact TikTok or deliverable.",
    nextCheck: "Recover the post-level URL or dated content proof.",
  },
  {
    brand: "Tilt / Redpill",
    campaign: "Paid creator campaign",
    status: "campaign-confirmed",
    summary: "A £350 agreement and matching £350 payment confirm completed commercial work.",
    nextCheck: "Identify the exact deliverable and TikTok.",
  },
  {
    brand: "Firmoo",
    campaign: "Eyewear creator work",
    status: "relationship-confirmed",
    summary: "Creation and payment correspondence goes beyond an unaccepted offer.",
    nextCheck: "Isolate the exact content and final payment status.",
  },
  {
    brand: "All Points East",
    campaign: "Tyler, The Creator promotional content",
    status: "campaign-confirmed",
    summary: "Two promotional pieces were completed in August 2026 in exchange for event tickets.",
    nextCheck: "Add the August posts from a newer TikTok export or their live links.",
  },
];

