export const GENERAL_CREATOR_PERFORMANCE = {
  audience: 25_000,
  audienceDisplay: "25K+",
  verifiedVisibleVideoViews: 27_900_000,
  verifiedVisibleVideoViewsDisplay: "27.9M+",
} as const;

export const LINKTREE_PERFORMANCE = {
  lifetimeViews: 101_900,
  lifetimeViewsDisplay: "101.9K",
  lifetimeClicks: 94_720,
  lifetimeClicksDisplay: "94.72K",
  clickThroughRate: 92.9,
  clickThroughRateDisplay: "92.9%",
} as const;

export const AFFILIATE_PERFORMANCE = {
  totals: {
    registrations: 11_771,
    verifiedActivatedUsers: 1_399,
    verifiedActivatedUsersDisplay: "1,399+",
    recordedParcels: 2_589,
    recordedParcelsDisplay: "2,589+",
    trackedFreightYuan: 1_224_520.48,
    trackedFreightYuanDisplay: "¥1.22M+",
    trackedFreightUsdApprox: 211_816,
    trackedFreightUsdDisplay: "≈ $211.8K USD",
  },
  platforms: [
    {
      id: "acbuy",
      name: "ACBuy",
      registrations: 10_117,
      activatedUsers: 1_216,
      activationRate: 12.0,
      activationRateDisplay: "12.0%",
      recordedParcels: 2_589,
      trackedFreightYuan: 1_224_520.48,
      trackedFreightUsdApprox: 211_816,
      registrationDataCaptured: "28 Jan 2025 – 12 Jun 2026",
    },
    {
      id: "usfans",
      name: "USFans",
      registrations: 579,
      activatedUsers: 183,
      activationRate: 31.6,
      activationRateDisplay: "31.6%",
      recordedParcels: null,
      trackedFreightYuan: null,
      trackedFreightUsdApprox: null,
      registrationDataCaptured: "14 Mar 2026 – 21 Jul 2026",
    },
    {
      id: "sugargoo",
      name: "Sugargoo",
      registrations: 1_075,
      activatedUsers: null,
      activationRate: null,
      activationRateDisplay: "N/A",
      recordedParcels: null,
      trackedFreightYuan: null,
      trackedFreightUsdApprox: null,
      registrationDataCaptured: "5 Mar 2024 – 8 May 2024",
    },
  ],
} as const;

export const CAPCUT_CREATOR_PERFORMANCE = {
  viewsDisplay: "15.5M+",
  templateUsesDisplay: "1.97M",
  exportsDisplay: "1.16M",
  tiktokViewsViaTemplatesDisplay: "150M+",
} as const;

export const CREATOROPS_PERFORMANCE = {
  completedCasesDisplay: "2,800+",
  recordsHandledByMeDisplay: "1,200+",
} as const;
