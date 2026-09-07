import type { PhotographySeriesSlug } from "@/lib/photography-final-taxonomy";

export type PhotographyDisplayPreference = {
  cover: number;
  hover?: number;
  coverPosition?: string;
  hoverPosition?: string;
};

// One-based project-image selections, matching the order shown inside each project gallery.
// These are deliberately presentation-only: taxonomy stays separate from cover curation.
export const PHOTOGRAPHY_DISPLAY: Partial<Record<PhotographySeriesSlug, PhotographyDisplayPreference>> = {
  "south-florida-2026-06-20": { cover: 16, hover: 5 },
  "new-england-2026-06-15": { cover: 1, hover: 2, coverPosition: "50% 42%", hoverPosition: "50% 44%" },
  "new-york-2026-06-10": { cover: 28, hover: 11 },
  "buckinghamshire-2026-04-29": { cover: 3, hover: 9 },
  "landscape-2026-04-18": { cover: 2, hover: 4 },
  "aerial-2026-03-04": { cover: 11, hover: 18 },
  "london-2026-02-25": { cover: 2, hover: 3 },
  "buckinghamshire-2026-02-07": { cover: 2, hover: 8 },
  "thailand-2025-12-25": { cover: 2, hover: 1 },
  "athens-2025-11-14": { cover: 4, hover: 5 },
  "transformation-series": { cover: 3, hover: 22 },
  "sicily-2025-08-28": { cover: 64, hover: 69 },
  "mediterranean-2025-07-15": { cover: 20, hover: 18, coverPosition: "50% 38%" },
  "coast-2025-07-01": { cover: 5, hover: 6 },
  "austria-2025-05-30": { cover: 1, hover: 18, hoverPosition: "50% 22%" },
  // The requested cover was image 29 before image 20 was moved to Glasgow.
  // It is therefore image 28 in the corrected London Architecture gallery.
  // Framing is biased lower to reduce the blue sky above the subject.
  "architecture-2025-02-22": { cover: 28, hover: 16, coverPosition: "50% 58%" },
  "paris-2025-04-11": { cover: 7, hover: 11 },
  "glasgow-2025-03-23": { cover: 2, hover: 6 },
  "tyrol-2025-02-16": { cover: 3, hover: 16 },
  "still-life-2025-01-06": { cover: 1, hover: 2 },
  "aerial-2024-09-19": { cover: 1, hover: 2 },
  "london-2024-08-04": { cover: 2, hover: 1 },
  "summer-2024-07-29": { cover: 1, hover: 2 },
  "heidelberg-2024-06-24": { cover: 1, hover: 2 },
  "strasbourg-2024-06-21": { cover: 6, hover: 4 },
  "cologne-2024-06-19": { cover: 1, hover: 3 },
  // Aprica cover is deliberately framed lower to cut excess blue sky.
  "aprica-italy": { cover: 13, hover: 7, coverPosition: "50% 58%" },
  "thailand-2023-12": { cover: 2, hover: 1 },
  "mexico-2023-08-28": { cover: 2, hover: 6 },
  "rome-2023-08-19": { cover: 4, hover: 3 },
  "pisa-2023-08-18": { cover: 2, hover: 1 },
  "ajaccio-2023-08-17": { cover: 1, hover: 2 },
  "portofino-2023-08-16": { cover: 13, hover: 1 },
  "valencia-2023-08-13": { cover: 1, hover: 3 },
  "barcelona-aerial": { cover: 6, hover: 4 },
  "london-2023-06-25": { cover: 1, hover: 1 },
  "costa-brava-2023-04-20": { cover: 11, hover: 5 },
  "iceland-2023-03-11": { cover: 1, hover: 10 },
  "thailand-2022-12": { cover: 7, hover: 8 },
  "edinburgh-2022-08-19": { cover: 5, hover: 3 },
  "flamborough-2022-08-19": { cover: 1, hover: 5 },
  "glenfinnan-2022-08-13": { cover: 9, hover: 4 },
  "loch-ness-2022-08": { cover: 5, hover: 1 },
  "highlands-2022-08": { cover: 14, hover: 1 },
  "lake-district-2022-08-09": { cover: 5, hover: 6 },
  "buckinghamshire-2022-07-07": { cover: 3, hover: 2 },
  "dublin-2022-06-11": { cover: 4, hover: 7 },
  "thailand-2021-12": { cover: 9, hover: 1 },
  "buckinghamshire-2021": { cover: 1, hover: 2 },
  "loch-lomond-2021-09-04": { cover: 1, hover: 2 },
  "amsterdam-2026-07-05": { cover: 1, hover: 1 },
};
