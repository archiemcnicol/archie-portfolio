import type { ArchivePhoto } from "@/lib/portfolio-archive";
import {
  PHOTOGRAPHY_SERIES,
  type CataloguePhoto,
  type PhotographySeriesSlug,
  type PhotographyStyle,
} from "@/lib/photography-series";

const SERIES_BY_SLUG = new Map(PHOTOGRAPHY_SERIES.map((series) => [series.slug, series]));

function classicDjiNumber(name: string) {
  const match = name.match(/^DJI_(\d{4})(?:[-.]|$)/i);
  return match ? Number(match[1]) : null;
}

function sonySequenceNumber(name: string) {
  const match = name.match(/^DSC0?(\d{4,5})\.jpe?g$/i);
  return match ? Number(match[1]) : null;
}

function photoExportNumber(name: string) {
  const match = name.match(/^Photo(\d{5})\.jpe?g$/i);
  return match ? Number(match[1]) : null;
}

function timestampDate(name: string) {
  const dji = name.match(/^DJI_(20\d{2})(\d{2})(\d{2})/i);
  if (dji) return `${dji[1]}-${dji[2]}-${dji[3]}`;
  const simple = name.match(/^(20\d{2})(\d{2})(\d{2})[_-]/);
  if (simple) return `${simple[1]}-${simple[2]}-${simple[3]}`;
  return null;
}

function dateBetween(date: string | null, start: string, end = start) {
  return date !== null && date >= start && date <= end;
}

// These are the pre-correction boundaries used by the previous live site. They are intentionally
// retained so user instructions such as “South Devon #1” or “London 16 March #9” remain stable.
function firstSonyProject(n: number): PhotographySeriesSlug {
  if (n <= 100) return "strasbourg-2024-06-21";
  if (n >= 600 && n < 800) return "summer-2024-07-29";
  if (n >= 800 && n < 1100) return "london-2024-08-04";
  if (n >= 3500 && n < 3850) return "still-life-2025-01-06";
  if (n >= 3850 && n < 3937) return "zurich-2025-02-14";
  if (n >= 3937 && n < 4450) return "tyrol-2025-02-16";
  if (n >= 4450 && n < 4850) return "architecture-2025-02-22";
  if (n >= 4850 && n < 5400) return "urban-2025-03-16";
  if (n >= 5400 && n < 6200) return "glasgow-2025-03-23";
  if (n >= 6200 && n < 7100) return "paris-2025-04-11";
  if (n >= 7100 && n < 8200) return "london-2025-05-03";
  if (n >= 8200 && n < 8700) return "austria-2025-05-30";
  if (n >= 8700) return "coast-2025-07-01";
  return "open-archive";
}

function secondSonyProject(n: number): PhotographySeriesSlug {
  if (n < 600) return "mediterranean-2025-07-15";
  if (n >= 900 && n < 3500) return "sicily-2025-08-28";
  if (n >= 4000 && n < 4550) return "athens-2025-11-14";
  if (n >= 4550 && n < 5200) return "thailand-2025-12-25";
  if (n >= 5800 && n < 6200) return "london-2026-02-25";
  if (n >= 6200 && n < 6500) return "landscape-2026-04-18";
  if (n >= 6500 && n < 7300) return "new-york-2026-06-10";
  return "open-archive";
}

function baseSeriesSlugForPhoto(photo: ArchivePhoto, sonyGeneration: number): PhotographySeriesSlug {
  const name = photo.originalName;
  const dji = classicDjiNumber(name);
  const sony = sonySequenceNumber(name);
  const stamped = timestampDate(name);

  if (sony !== null) return sonyGeneration === 0 ? firstSonyProject(sony) : secondSonyProject(sony);

  if (dateBetween(stamped, "2024-09-19")) return "aerial-2024-09-19";
  if (dateBetween(stamped, "2025-02-14")) return "zurich-2025-02-14";
  if (dateBetween(stamped, "2025-02-16", "2025-02-18")) return "tyrol-2025-02-16";
  if (dateBetween(stamped, "2025-04-11", "2025-04-14")) return "paris-2025-04-11";
  if (dateBetween(stamped, "2025-05-30")) return "austria-2025-05-30";
  if (dateBetween(stamped, "2025-06-30", "2025-07-03")) return "coast-2025-07-01";
  if (dateBetween(stamped, "2025-07-15", "2025-07-20")) return "mediterranean-2025-07-15";
  if (dateBetween(stamped, "2025-08-14")) return "buckinghamshire-2025-08-14";
  if (dateBetween(stamped, "2025-08-28", "2025-09-03")) return "sicily-2025-08-28";
  if (dateBetween(stamped, "2025-10-08")) return "buckinghamshire-2025-10-08";
  if (dateBetween(stamped, "2025-10-15")) return "buckinghamshire-2025-10-15";
  if (dateBetween(stamped, "2025-10-21")) return "buckinghamshire-2025-10-21";
  if (dateBetween(stamped, "2025-11-06")) return "buckinghamshire-2025-11-06";
  if (dateBetween(stamped, "2025-11-14", "2025-11-15")) return "athens-2025-11-14";
  if (dateBetween(stamped, "2025-12-16", "2025-12-25")) return "thailand-2025-12-25";
  if (dateBetween(stamped, "2026-02-07")) return "buckinghamshire-2026-02-07";
  if (dateBetween(stamped, "2026-02-21")) return "buckinghamshire-2026-02-21";
  if (dateBetween(stamped, "2026-03-03", "2026-03-06")) return "aerial-2026-03-04";
  if (dateBetween(stamped, "2026-04-18")) return "landscape-2026-04-18";
  if (dateBetween(stamped, "2026-04-29")) return "buckinghamshire-2026-04-29";
  if (dateBetween(stamped, "2026-06-10", "2026-06-13")) return "new-york-2026-06-10";
  if (dateBetween(stamped, "2026-06-15", "2026-06-17")) return "new-england-2026-06-15";
  if (dateBetween(stamped, "2026-06-20", "2026-06-25")) return "south-florida-2026-06-20";

  if (dji !== null) {
    if (dji >= 423 && dji <= 471) return "glenfinnan-2022-08-13";
    if (dji >= 472 && dji <= 489) return "highlands-2022-08";
    if (dji >= 490 && dji <= 502) return "edinburgh-2022-08-19";
    if (dji >= 544 && dji <= 585) return "flamborough-2022-08-19";
  }

  if (/Photo_\d+_DJI_|_DJI_\d+_/i.test(name)) return "early-aerial-archive";
  return "open-archive";
}

const TRANSFORMATION_BASE_SERIES = new Set([
  "buckinghamshire-2025-10-08",
  "buckinghamshire-2025-10-15",
  "buckinghamshire-2025-10-21",
  "buckinghamshire-2025-11-06",
]);

function correctedSeriesSlug(
  photo: ArchivePhoto,
  baseSlug: PhotographySeriesSlug,
  legacySequence: number,
): PhotographySeriesSlug {
  const exportNumber = photoExportNumber(photo.originalName);

  // EXIF audit: Photo00020 through Photo00143 spans the same Buckinghamshire site across
  // 8, 15, 21 and 25 October and 6 November 2025. Generic export names previously hid these.
  if (exportNumber !== null && exportNumber >= 20 && exportNumber <= 143) {
    return "transformation-series";
  }

  if (baseSlug === "buckinghamshire-2026-02-21") return "buckinghamshire-2026-04-29";
  if (baseSlug === "buckinghamshire-2025-08-14") return "buckinghamshire-2026-02-07";
  if (TRANSFORMATION_BASE_SERIES.has(baseSlug)) return "transformation-series";

  if (baseSlug === "coast-2025-07-01" && legacySequence === 1) return "austria-2025-05-30";

  if (baseSlug === "urban-2025-03-16" && legacySequence === 9) return "glasgow-2025-03-23";
  if (
    baseSlug === "architecture-2025-02-22" ||
    baseSlug === "urban-2025-03-16" ||
    baseSlug === "london-2025-05-03"
  ) {
    return "architecture-2025-02-22";
  }

  if (baseSlug === "zurich-2025-02-14") return "tyrol-2025-02-16";

  if (baseSlug === "aerial-2024-09-19" && legacySequence === 3) {
    return "buckinghamshire-2026-02-07";
  }

  if (baseSlug === "highlands-2022-08" && (legacySequence === 6 || legacySequence === 7)) {
    return "barcelona-aerial";
  }
  if (baseSlug === "edinburgh-2022-08-19" && legacySequence === 7) {
    return "barcelona-aerial";
  }

  if (baseSlug === "early-aerial-archive") {
    if (legacySequence <= 9) return "thailand-2021-12";
    if (legacySequence <= 21) return "preca-italy";
    return "open-archive";
  }

  return baseSlug;
}

const ARCHITECTURE_SERIES = new Set<PhotographySeriesSlug>([
  "strasbourg-2024-06-21",
  "london-2024-08-04",
  "architecture-2025-02-22",
  "glasgow-2025-03-23",
  "paris-2025-04-11",
  "austria-2025-05-30",
  "sicily-2025-08-28",
  "athens-2025-11-14",
  "london-2026-02-25",
  "new-york-2026-06-10",
]);

const STREET_SERIES = new Set<PhotographySeriesSlug>([
  "london-2024-08-04",
  "architecture-2025-02-22",
  "glasgow-2025-03-23",
  "paris-2025-04-11",
  "austria-2025-05-30",
  "sicily-2025-08-28",
  "athens-2025-11-14",
  "thailand-2025-12-25",
  "london-2026-02-25",
  "new-york-2026-06-10",
  "new-england-2026-06-15",
  "south-florida-2026-06-20",
]);

const LANDSCAPE_SERIES = new Set<PhotographySeriesSlug>([
  "glenfinnan-2022-08-13",
  "highlands-2022-08",
  "edinburgh-2022-08-19",
  "flamborough-2022-08-19",
  "barcelona-aerial",
  "thailand-2021-12",
  "preca-italy",
  "summer-2024-07-29",
  "aerial-2024-09-19",
  "tyrol-2025-02-16",
  "austria-2025-05-30",
  "coast-2025-07-01",
  "mediterranean-2025-07-15",
  "buckinghamshire-2026-02-07",
  "transformation-series",
  "sicily-2025-08-28",
  "athens-2025-11-14",
  "thailand-2025-12-25",
  "aerial-2026-03-04",
  "landscape-2026-04-18",
  "buckinghamshire-2026-04-29",
  "new-england-2026-06-15",
  "south-florida-2026-06-20",
]);

function stylesForPhoto(photo: ArchivePhoto, seriesSlug: PhotographySeriesSlug): PhotographyStyle[] {
  const styles = new Set<PhotographyStyle>();
  const name = photo.originalName;
  const isDrone = /^DJI_/i.test(name) || /_DJI_/i.test(name) || /^Photo\d{5}\.jpe?g$/i.test(name);
  const isPortrait = photo.height / Math.max(photo.width, 1) >= 1.18;

  if (isDrone) styles.add("Aerial / Drone");
  if (ARCHITECTURE_SERIES.has(seriesSlug)) styles.add("Architecture");
  if (STREET_SERIES.has(seriesSlug)) styles.add("Street / Urban");
  if (LANDSCAPE_SERIES.has(seriesSlug)) styles.add("Landscape / Nature");
  if (seriesSlug === "still-life-2025-01-06") styles.add("Portrait / Lifestyle");
  if (seriesSlug !== "still-life-2025-01-06") styles.add("Travel / Documentary");
  if (!isDrone && isPortrait && seriesSlug === "open-archive") styles.add("Portrait / Lifestyle");
  if (!styles.size) styles.add(isPortrait ? "Portrait / Lifestyle" : "Travel / Documentary");
  return [...styles];
}

export function buildPhotographyCatalogue(photos: ArchivePhoto[]): CataloguePhoto[] {
  const finalCounters = new Map<PhotographySeriesSlug, number>();
  const baseCounters = new Map<PhotographySeriesSlug, number>();
  let sonyGeneration = 0;
  let previousSony: number | null = null;

  return photos.map((photo) => {
    const sony = sonySequenceNumber(photo.originalName);
    if (sony !== null && previousSony !== null && previousSony > 8000 && sony < 1000) sonyGeneration += 1;
    if (sony !== null) previousSony = sony;

    const baseSlug = baseSeriesSlugForPhoto(photo, sonyGeneration);
    const legacySequence = (baseCounters.get(baseSlug) ?? 0) + 1;
    baseCounters.set(baseSlug, legacySequence);

    const seriesSlug = correctedSeriesSlug(photo, baseSlug, legacySequence);
    const series = SERIES_BY_SLUG.get(seriesSlug) ?? SERIES_BY_SLUG.get("open-archive")!;
    const sequence = (finalCounters.get(seriesSlug) ?? 0) + 1;
    finalCounters.set(seriesSlug, sequence);

    return {
      id: photo.id,
      src: photo.src,
      width: photo.width,
      height: photo.height,
      title: `${series.title} / ${String(sequence).padStart(3, "0")}`,
      seriesSlug,
      seriesTitle: series.title,
      styles: stylesForPhoto(photo, seriesSlug),
    };
  });
}
