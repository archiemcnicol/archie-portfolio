import type { ArchivePhoto } from "@/lib/portfolio-archive";
import {
  buildPhotographyCatalogue as buildMetadataCatalogue,
  PHOTOGRAPHY_SERIES as METADATA_SERIES,
  PHOTO_STYLES,
} from "@/lib/photography-taxonomy";
import type {
  CataloguePhoto,
  PhotographySeriesDefinition,
  PhotographySeriesSlug,
  PhotographyStyle,
} from "@/lib/photography-series";

export { PHOTO_STYLES };
export type {
  CataloguePhoto,
  PhotographySeriesDefinition,
  PhotographySeriesSlug,
  PhotographyStyle,
} from "@/lib/photography-series";

// Final recovery pass for archive files whose original GPS/capture metadata was stripped
// by exports. These assignments use the surviving filename date/camera sequence together
// with direct visual continuity against the already verified destination projects.
const NORMALISED_SERIES: PhotographySeriesDefinition[] = METADATA_SERIES.map((series) => {
  if (series.slug === "architecture-2025-02-22") {
    return {
      ...series,
      title: "London Architecture · February–May 2025",
      description:
        "A combined London architecture study from February through May 2025, bringing the related shoots together without describing the full series as monochrome.",
    };
  }

  if (series.slug === "lake-district-2022-08-09") {
    return {
      ...series,
      title: "Ambleside & Lake District · August 2022",
      kicker: "Aug 2022",
      description:
        "Lake District landscape and waterside photography around Ambleside and the central lakes, combining GPS-verified aerials with two matching Canon photographs whose camera clock metadata was lost.",
    };
  }

  if (series.slug === "loch-lomond-2021-09-04") {
    return {
      ...series,
      title: "Loch Lomond · 2021",
      kicker: "2021",
      description:
        "Early landscape and aerial work around Loch Lomond, combining a GPS-verified frame with a matching loch-side landscape recovered from an exported file.",
    };
  }

  if (series.slug === "thailand-2021-12") {
    return {
      ...series,
      title: "Thailand · December 2021",
      kicker: "Dec 2021",
      description:
        "An early Thailand island and aerial series reconstructed from dated DJI originals and a matching exported coastal frame.",
      sortDate: "2021-12-27",
    };
  }

  return series;
});

const FINAL_SERIES: PhotographySeriesDefinition[] = [
  {
    slug: "amsterdam-2026-07-05",
    title: "Amsterdam · 5 July 2026",
    kicker: "5 Jul 2026",
    location: "Amsterdam, Netherlands",
    description:
      "A waterfront cityscape across the IJ, centred on the A’DAM Tower and EYE Filmmuseum, recovered from the final unclassified Canon frame.",
    coverId: "1HbIuIkSBk51oep9EVjAst-lNYJA0cfJ2",
    sortDate: "2026-07-05",
    public: true,
  },
  {
    slug: "buckinghamshire-2021",
    title: "Buckinghamshire · 2021",
    kicker: "2021",
    location: "Buckinghamshire, UK",
    description:
      "Early local landscape and aerial work across the Buckinghamshire countryside, recovered from exported files with incomplete camera metadata.",
    coverId: "1yX_fc8g7V1U8IpkeKsRL2vWF4rux89da",
    sortDate: "2021-11-20",
    public: true,
  },
  {
    slug: "loch-ness-2022-08",
    title: "Loch Ness · August 2022",
    kicker: "Aug 2022",
    location: "Loch Ness, Scotland",
    description:
      "A six-frame loch-side sequence separated from the Glenfinnan project after the original trip was reviewed image by image.",
    sortDate: "2022-08-13",
    public: true,
  },
];

export const PHOTOGRAPHY_SERIES = [...NORMALISED_SERIES, ...FINAL_SERIES].sort(
  (a, b) => b.sortDate.localeCompare(a.sortDate),
);

const SERIES_TITLES = new Map(
  PHOTOGRAPHY_SERIES.map((series) => [series.slug, series.title]),
);

const FINAL_PHOTO_SERIES = new Map<string, PhotographySeriesSlug>([
  ["1IGkZOAymhhwDh2t8pNvfek1g9U-a7DhP", "lake-district-2022-08-09"],
  ["1Fgp8yAUiaJJyFX2cHB1d1_zbUMl8SoiA", "lake-district-2022-08-09"],
  ["1op3Ox87eoGo_VMuDLk-67OujZHZ-PhSk", "thailand-2021-12"],
  ["1uhy5l72eYYJQOaUjycRNLk8WNIo7NbSF", "loch-lomond-2021-09-04"],
  ["1R2UC69kVkCLNxZCI1todgKpRWy93DDBY", "buckinghamshire-2021"],
  ["1yX_fc8g7V1U8IpkeKsRL2vWF4rux89da", "buckinghamshire-2021"],
  ["1HbIuIkSBk51oep9EVjAst-lNYJA0cfJ2", "amsterdam-2026-07-05"],
]);

const FINAL_STYLE_HINTS: Partial<Record<PhotographySeriesSlug, PhotographyStyle[]>> = {
  "lake-district-2022-08-09": ["Landscape / Nature", "Travel / Documentary"],
  "loch-ness-2022-08": ["Landscape / Nature", "Travel / Documentary"],
  "loch-lomond-2021-09-04": ["Landscape / Nature", "Travel / Documentary"],
  "thailand-2021-12": ["Landscape / Nature", "Travel / Documentary"],
  "buckinghamshire-2021": ["Landscape / Nature"],
  "amsterdam-2026-07-05": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "ajaccio-2023-08-17": ["Architecture", "Landscape / Nature", "Travel / Documentary"],
  "costa-brava-2023-04-20": ["Landscape / Nature", "Travel / Documentary"],
  "edinburgh-2022-08-19": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "glasgow-2025-03-23": ["Architecture", "Street / Urban", "Travel / Documentary"],
};

function correctedSequenceSeries(
  seriesSlug: PhotographySeriesSlug,
  sequence: number,
): PhotographySeriesSlug {
  if (seriesSlug === "portofino-2023-08-16" && sequence === 16) {
    return "ajaccio-2023-08-17";
  }

  if (seriesSlug === "iceland-2023-03-11" && sequence >= 22 && sequence <= 24) {
    return "costa-brava-2023-04-20";
  }

  if (seriesSlug === "glenfinnan-2022-08-13") {
    if (sequence >= 14 && sequence <= 19) return "loch-ness-2022-08";
    if (sequence >= 20 && sequence <= 24) return "edinburgh-2022-08-19";
  }

  // The explicitly identified Glasgow frame was still inside the combined London architecture
  // project after the first metadata pass. Keep the correction sequence-based so the user's
  // project numbering remains stable.
  if (seriesSlug === "architecture-2025-02-22" && sequence === 20) {
    return "glasgow-2025-03-23";
  }

  return seriesSlug;
}

export function buildPhotographyCatalogue(photos: ArchivePhoto[]): CataloguePhoto[] {
  const sourceSequenceBySeries = new Map<PhotographySeriesSlug, number>();
  const finalSequenceBySeries = new Map<PhotographySeriesSlug, number>();

  const prelim = buildMetadataCatalogue(photos).map((photo, index) => {
    const source = photos[index];
    const idOverride = source ? FINAL_PHOTO_SERIES.get(source.id) : undefined;
    const sourceSeriesSlug = idOverride ?? photo.seriesSlug;
    const sourceSequence = (sourceSequenceBySeries.get(sourceSeriesSlug) ?? 0) + 1;
    sourceSequenceBySeries.set(sourceSeriesSlug, sourceSequence);

    return {
      photo,
      seriesSlug: correctedSequenceSeries(sourceSeriesSlug, sourceSequence),
    };
  });

  return prelim.map(({ photo, seriesSlug }) => {
    const seriesTitle = SERIES_TITLES.get(seriesSlug) ?? photo.seriesTitle;
    const sequence = (finalSequenceBySeries.get(seriesSlug) ?? 0) + 1;
    finalSequenceBySeries.set(seriesSlug, sequence);

    const hints = FINAL_STYLE_HINTS[seriesSlug] ?? [];
    const styles = Array.from(new Set<PhotographyStyle>([...photo.styles, ...hints]));

    return {
      ...photo,
      seriesSlug,
      seriesTitle,
      styles,
      title: `${seriesTitle} / ${String(sequence).padStart(3, "0")}`,
    };
  });
}
