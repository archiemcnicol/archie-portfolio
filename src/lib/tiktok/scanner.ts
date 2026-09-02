export type TikTokVideoRow = {
  Date?: string;
  Link?: string;
  Likes?: string;
  WhoCanView?: string;
  ContentDisclosure?: string;
  AIGeneratedContent?: string;
  Sound?: string;
  Location?: string;
  Title?: string;
  AddYoursText?: string;
  AlternateText?: string;
  CoverImage?: string;
  NumberOfCollections?: string;
};

export type TikTokExport = {
  Post?: {
    Posts?: {
      VideoList?: TikTokVideoRow[];
    };
  };
};

export type BrandRule = {
  brand: string;
  aliases: string[];
};

export type ScanMatch = {
  brand: string | null;
  confidence: number;
  reasons: string[];
};

export type CampaignScanMatch = {
  id: string;
  brand: string;
  campaign: string;
  status: "confirmed" | "candidate" | "needs-review" | "excluded";
  confidence: number;
  summary: string;
  tiktokUrl?: string;
};

export type ScannedTikTokPost = {
  sourceIndex: number;
  date: string;
  likes: number | null;
  disclosure: string;
  sound: string;
  visibility: string;
  mediaUrl: string;
  coverUrl: string;
  matches: ScanMatch[];
  campaignMatches: CampaignScanMatch[];
  promotionalConfidence: number;
  reasons: string[];
};

const PROMO_TERMS = [
  "#ad",
  "#gifted",
  "paid partnership",
  "paid promotion",
  "sponsored",
  "affiliate",
  "gifted by",
  "in partnership with",
];

function clean(value?: string) {
  if (!value || value === "N/A") return "";
  return value.trim();
}

function haystack(row: TikTokVideoRow) {
  return [row.Title, row.AlternateText, row.Sound, row.ContentDisclosure]
    .map(clean)
    .join(" ")
    .toLowerCase();
}

export function getTikTokVideos(payload: TikTokExport): TikTokVideoRow[] {
  const videos = payload?.Post?.Posts?.VideoList;
  if (!Array.isArray(videos)) {
    throw new Error("This JSON does not contain Post → Posts → VideoList.");
  }
  return videos;
}

export function scanTikTokExport(
  payload: TikTokExport,
  brandRules: BrandRule[],
  campaignRules: Array<{
    id: string;
    brand: string;
    campaign: string;
    status: CampaignScanMatch["status"];
    confidence: number;
    postDates: string[];
    soundAliases?: string[];
    tiktokUrl?: string;
    summary: string;
  }> = [],
): ScannedTikTokPost[] {
  return getTikTokVideos(payload).map((row, sourceIndex) => {
    const text = haystack(row);
    const disclosure = clean(row.ContentDisclosure);
    const reasons: string[] = [];
    let promotionalConfidence = 0;

    if (disclosure) {
      promotionalConfidence = Math.max(promotionalConfidence, 95);
      reasons.push(`TikTok disclosure: ${disclosure}`);
    }

    for (const term of PROMO_TERMS) {
      if (text.includes(term)) {
        promotionalConfidence = Math.max(promotionalConfidence, 85);
        reasons.push(`Promotion term detected: ${term}`);
      }
    }

    const matches: ScanMatch[] = [];

    for (const rule of brandRules) {
      const matchedAliases = rule.aliases.filter((alias) =>
        text.includes(alias.toLowerCase()),
      );

      if (matchedAliases.length) {
        const confidence = disclosure ? 95 : 78;
        matches.push({
          brand: rule.brand,
          confidence,
          reasons: [`Matched metadata: ${matchedAliases.join(", ")}`],
        });
        promotionalConfidence = Math.max(promotionalConfidence, confidence);
      }
    }

    const postDate = clean(row.Date).slice(0, 10);
    const sound = clean(row.Sound).toLowerCase();
    const campaignMatches = campaignRules
      .filter((rule) => {
        const dateMatches = rule.postDates.includes(postDate);
        const soundMatches = rule.soundAliases?.some((alias) =>
          sound.includes(alias.toLowerCase()),
        );
        return dateMatches && (rule.soundAliases?.length ? soundMatches : true);
      })
      .map((rule) => ({
        id: rule.id,
        brand: rule.brand,
        campaign: rule.campaign,
        status: rule.status,
        confidence: rule.confidence,
        summary: rule.summary,
        tiktokUrl: rule.tiktokUrl,
      }));

    for (const campaign of campaignMatches) {
      if (campaign.status !== "excluded") {
        promotionalConfidence = Math.max(
          promotionalConfidence,
          campaign.confidence,
        );
      }
    }

    return {
      sourceIndex,
      date: clean(row.Date),
      likes: /^\d+$/.test(clean(row.Likes)) ? Number(row.Likes) : null,
      disclosure,
      sound: clean(row.Sound),
      visibility: clean(row.WhoCanView),
      mediaUrl: clean(row.Link),
      coverUrl: clean(row.CoverImage),
      matches,
      campaignMatches,
      promotionalConfidence,
      reasons,
    };
  });
}

export function promotionalCandidates(posts: ScannedTikTokPost[]) {
  return posts
    .filter(
      (post) =>
        post.promotionalConfidence > 0 ||
        post.matches.length > 0 ||
        post.campaignMatches.length > 0,
    )
    .sort((a, b) => {
      if (b.promotionalConfidence !== a.promotionalConfidence) {
        return b.promotionalConfidence - a.promotionalConfidence;
      }
      return b.date.localeCompare(a.date);
    });
}
