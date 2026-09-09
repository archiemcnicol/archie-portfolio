import type { Metadata } from "next";
import { PhotographyExplorer } from "@/components/photography-explorer";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";
import {
  buildPhotographyCatalogue,
  PHOTOGRAPHY_SERIES,
} from "@/lib/photography-final-taxonomy";
import { PHOTOGRAPHY_DISPLAY } from "@/lib/photography-display";
import styles from "./photography.module.css";

export const metadata: Metadata = {
  title: "Photography — Archie McNicol",
  description:
    "Travel, aerial, architecture, event and lifestyle photography by Archie McNicol, organised into destination-led shoots with a filterable public archive.",
  alternates: { canonical: "/photography" },
};

const EXCLUDED_PHOTO_NAMES = new Set([
  "IMG_2473.jpg",
  "IMG_2469.jpg",
  "Screenshot_20200502-010759_Instagram-Enhanced.jpg",
]);

const RAW_PHOTOS = PORTFOLIO_ARCHIVE_PHOTOS.filter(
  (photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName),
);

const PHOTOS = buildPhotographyCatalogue(RAW_PHOTOS);

function oneBased<T>(items: T[], number?: number) {
  if (!number || number < 1) return undefined;
  return items[number - 1];
}

function assertDisplayIndex(
  slug: string,
  label: "cover" | "hover",
  requested: number | undefined,
  count: number,
) {
  if (!requested) return;
  if (requested > count) {
    throw new Error(
      `Photography display config for ${slug} requests ${label} image ${requested}, but the project only has ${count} photograph${count === 1 ? "" : "s"}.`,
    );
  }
}

const SERIES = PHOTOGRAPHY_SERIES.filter((series) => series.public)
  .map((series) => {
    const seriesPhotos = PHOTOS.filter((photo) => photo.seriesSlug === series.slug);
    const preference = PHOTOGRAPHY_DISPLAY[series.slug];

    assertDisplayIndex(series.slug, "cover", preference?.cover, seriesPhotos.length);
    assertDisplayIndex(series.slug, "hover", preference?.hover, seriesPhotos.length);

    const requestedCover = oneBased(seriesPhotos, preference?.cover);
    const configuredCover = series.coverId
      ? seriesPhotos.find((photo) => photo.id === series.coverId)
      : undefined;
    const cover = requestedCover ?? configuredCover ?? seriesPhotos[0] ?? null;
    const requestedHover = oneBased(seriesPhotos, preference?.hover);
    const fallbackHover = seriesPhotos.find((photo) => photo.id !== cover?.id) ?? cover;
    const hover = seriesPhotos.length <= 1
      ? cover
      : requestedHover ?? fallbackHover;

    return {
      slug: series.slug,
      title: series.title,
      kicker: series.kicker,
      location: series.location,
      description: series.description,
      sortDate: series.sortDate,
      count: seriesPhotos.length,
      cover: cover
        ? { src: cover.src, width: cover.width, height: cover.height }
        : null,
      hover: hover
        ? { src: hover.src, width: hover.width, height: hover.height }
        : null,
      coverPosition: preference?.coverPosition,
      hoverPosition: preference?.hoverPosition,
    };
  })
  .filter((series) => series.count > 0);

export default function PhotographyPage() {
  return (
    <main className={`${styles.page} photography-page`}>
      <h1 className={styles.visuallyHidden}>Photography by Archie McNicol</h1>
      <PhotographyExplorer photos={PHOTOS} series={SERIES} />
    </main>
  );
}
