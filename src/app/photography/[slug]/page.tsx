import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PortfolioArchive } from "@/components/portfolio-archive";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";
import {
  buildPhotographyCatalogue,
  PHOTOGRAPHY_SERIES,
} from "@/lib/photography-final-taxonomy";
import { buildBreadcrumbSchema, serialiseJsonLd } from "@/lib/structured-data";
import styles from "./project.module.css";

const EXCLUDED_PHOTO_NAMES = new Set([
  "IMG_2473.jpg",
  "IMG_2469.jpg",
  "Screenshot_20200502-010759_Instagram-Enhanced.jpg",
]);

const PROJECT_ALIASES: Record<string, string> = {
  "buckinghamshire-2026-02-21": "buckinghamshire-2026-04-29",
  "buckinghamshire-2025-08-14": "buckinghamshire-2026-02-07",
  "buckinghamshire-2025-11-06": "transformation-series",
  "buckinghamshire-2025-10-21": "transformation-series",
  "buckinghamshire-2025-10-15": "transformation-series",
  "buckinghamshire-2025-10-08": "transformation-series",
  "london-2025-05-03": "architecture-2025-02-22",
  "urban-2025-03-16": "architecture-2025-02-22",
  "zurich-2025-02-14": "tyrol-2025-02-16",
  "preca-italy": "aprica-italy",
};

const RAW_PHOTOS = PORTFOLIO_ARCHIVE_PHOTOS.filter(
  (photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName),
);

const PHOTOS = buildPhotographyCatalogue(RAW_PHOTOS);
const PUBLIC_SERIES = PHOTOGRAPHY_SERIES.filter((series) => series.public).filter((series) =>
  PHOTOS.some((photo) => photo.seriesSlug === series.slug),
);

function resolveSlug(slug: string) {
  return PROJECT_ALIASES[slug] ?? slug;
}

function getSeries(slug: string) {
  const resolvedSlug = resolveSlug(slug);
  return PUBLIC_SERIES.find((series) => series.slug === resolvedSlug) ?? null;
}

export function generateStaticParams() {
  return [
    ...PUBLIC_SERIES.map((series) => ({ slug: series.slug })),
    ...Object.keys(PROJECT_ALIASES).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeries(slug);

  if (!series) return {};

  return {
    title: `${series.title} — Photography — Archie McNicol`,
    description: series.description,
    alternates: { canonical: `/photography/${series.slug}` },
  };
}

export default async function PhotographyProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = resolveSlug(slug);
  if (resolvedSlug !== slug) redirect(`/photography/${resolvedSlug}`);

  const series = getSeries(slug);
  if (!series) notFound();

  const projectPhotos = PHOTOS.filter((photo) => photo.seriesSlug === series.slug);
  if (!projectPhotos.length) notFound();

  const index = PUBLIC_SERIES.findIndex((item) => item.slug === series.slug);
  const previous = index > 0 ? PUBLIC_SERIES[index - 1] : null;
  const next = index >= 0 && index < PUBLIC_SERIES.length - 1 ? PUBLIC_SERIES[index + 1] : null;
  const displayTitle = series.title.split(" · ")[0];
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Photography", path: "/photography" },
    { name: displayTitle, path: `/photography/${series.slug}` },
  ]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbSchema) }}
        type="application/ld+json"
      />
      <main className={styles.page}>
        <section className={styles.intro}>
          <div className={styles.introInner}>
            <Link className={styles.backLink} href="/photography">← Photography</Link>
            <div className={styles.identity}>
              <h1>{displayTitle}</h1>
              <p>{series.kicker} · {series.location}</p>
            </div>
            <span className={styles.photoCount}>{projectPhotos.length} photos</span>
          </div>
        </section>

        <section className={styles.gallery} aria-label={`${displayTitle} photographs`}>
          <PortfolioArchive photos={projectPhotos} />
        </section>

        <nav className={styles.projectNav} aria-label="Photography projects">
          <div>
            {previous ? (
              <Link href={`/photography/${previous.slug}`}>
                <small>Previous</small>
                <strong>← {previous.title.split(" · ")[0]}</strong>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/photography/${next.slug}`}>
                <small>Next</small>
                <strong>{next.title.split(" · ")[0]} →</strong>
              </Link>
            ) : (
              <Link href="/photography">
                <small>Back to</small>
                <strong>Photography →</strong>
              </Link>
            )}
          </div>
        </nav>
      </main>
    </>
  );
}
