export const ACBUY_MONTHLY = [
  { month: "Jan", registrations: 65, activations: 10, parcels: 44, freight: 2366.77 },
  { month: "Feb", registrations: 455, activations: 51, parcels: 166, freight: 11089.4 },
  { month: "Mar", registrations: 599, activations: 61, parcels: 154, freight: 8960.04 },
  { month: "Apr", registrations: 283, activations: 29, parcels: 63, freight: 3737.71 },
  { month: "May", registrations: 209, activations: 27, parcels: 38, freight: 1649.4 },
  { month: "Jun", registrations: 334, activations: 35, parcels: 77, freight: 6148.81 },
  { month: "Jul", registrations: 1311, activations: 164, parcels: 273, freight: 23915.87 },
  { month: "Aug", registrations: 1878, activations: 191, parcels: 310, freight: 29912.13 },
  { month: "Sep", registrations: 1266, activations: 129, parcels: 231, freight: 25346.2 },
  { month: "Oct", registrations: 1292, activations: 132, parcels: 226, freight: 21968.52 },
  { month: "Nov", registrations: 1157, activations: 108, parcels: 214, freight: 24692.36 },
  { month: "Dec", registrations: 574, activations: 60, parcels: 116, freight: 13271.17 },
] as const;

export const ACBUY_TOTALS = {
  registrations: 9423,
  activations: 997,
  parcels: 1912,
  freight: 173058.38,
  activationRate: 10.6,
} as const;

export const USFANS = {
  period: "14 Mar — 14 May 2025",
  registrations: 579,
  dashboardActivations: 65,
  scraperActivations: 183,
  dashboardRate: 11.2,
  scraperRate: 31.6,
} as const;

export const AFFILIATE_ARCHIVE = [
  {
    name: "ACBuy",
    period: "2025 — Jan 2026",
    description: "Long-running affiliate partnership with registration, activation, parcel and freight reporting.",
    href: "/affiliate/acbuy",
  },
  {
    name: "USFans",
    period: "14 Mar — 14 May 2025",
    description: "Two-month campaign with both dashboard and scraper activation records preserved for comparison.",
    href: "/affiliate/usfans",
  },
  {
    name: "Showview",
    period: "From 5 May 2024 · 2 months",
    description: "Earlier affiliate partnership retained as part of the performance-work timeline.",
    href: null,
  },
] as const;
