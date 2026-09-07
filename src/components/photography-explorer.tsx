"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PortfolioArchive } from "@/components/portfolio-archive";
import type {
  CataloguePhoto,
  PhotographySeriesDefinition,
} from "@/lib/photography-final-taxonomy";
import styles from "./photography-explorer.module.css";

type SeriesCard = Pick<
  PhotographySeriesDefinition,
  "slug" | "title" | "kicker" | "location" | "description" | "sortDate"
> & {
  count: number;
  cover: Pick<CataloguePhoto, "src" | "width" | "height"> | null;
  hover: Pick<CataloguePhoto, "src" | "width" | "height"> | null;
  coverPosition?: string;
  hoverPosition?: string;
};

type FilterView = "aerial" | "architecture" | "landscape";
type ArchiveView = "all" | FilterView | null;

const FILTERS: Array<{
  key: FilterView;
  label: string;
  slug: string;
  matches: (photo: CataloguePhoto) => boolean;
}> = [
  {
    key: "aerial",
    label: "Aerial",
    slug: "aerial-drone",
    matches: (photo) => photo.styles.includes("Aerial / Drone"),
  },
  {
    key: "architecture",
    label: "Architecture",
    slug: "architecture",
    matches: (photo) =>
      photo.styles.includes("Architecture") || photo.styles.includes("Street / Urban"),
  },
  {
    key: "landscape",
    label: "Landscape",
    slug: "landscape-nature",
    matches: (photo) =>
      photo.styles.includes("Landscape / Nature") ||
      photo.styles.includes("Travel / Documentary") ||
      photo.styles.includes("Portrait / Lifestyle"),
  },
];

const FILTER_BY_KEY = new Map(FILTERS.map((filter) => [filter.key, filter]));
const VIEW_FROM_SLUG = new Map<string, FilterView>([
  ["aerial-drone", "aerial"],
  ["architecture", "architecture"],
  ["street-urban", "architecture"],
  ["landscape-nature", "landscape"],
  ["portrait-lifestyle", "landscape"],
  ["travel-documentary", "landscape"],
]);

export function PhotographyExplorer({
  photos,
  series,
}: {
  photos: CataloguePhoto[];
  series: SeriesCard[];
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [archiveView, setArchiveView] = useState<ArchiveView>(null);

  const visiblePhotos = useMemo(() => {
    if (archiveView === "all") return photos;
    if (!archiveView) return [];
    const filter = FILTER_BY_KEY.get(archiveView);
    return filter ? photos.filter(filter.matches) : [];
  }, [archiveView, photos]);

  const currentLabel = archiveView === "all"
    ? "Full archive"
    : archiveView
      ? FILTER_BY_KEY.get(archiveView)?.label ?? null
      : null;

  function writeUrl(view: ArchiveView) {
    const url = new URL(window.location.href);
    url.searchParams.delete("series");
    url.searchParams.delete("style");
    url.searchParams.delete("view");

    if (view === "all") url.searchParams.set("view", "all");
    else if (view) {
      const filter = FILTER_BY_KEY.get(view);
      if (filter) url.searchParams.set("style", filter.slug);
    }

    window.history.pushState({}, "", `${url.pathname}${url.search}`);
  }

  function chooseArchive(view: Exclude<ArchiveView, null>) {
    setArchiveView(view);
    setFilterOpen(false);
    writeUrl(view);
  }

  function showProjects() {
    setArchiveView(null);
    setFilterOpen(false);
    writeUrl(null);
  }

  useEffect(() => {
    const applyLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedStyle = params.get("style");
      const requestedView = params.get("view");
      const nextStyle = requestedStyle ? VIEW_FROM_SLUG.get(requestedStyle) ?? null : null;
      setArchiveView(nextStyle ?? (requestedView === "all" ? "all" : null));
      setFilterOpen(false);
    };

    applyLocation();
    window.addEventListener("popstate", applyLocation);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("popstate", applyLocation);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <button
            aria-current={!archiveView ? "page" : undefined}
            className={styles.projectsButton}
            onClick={showProjects}
            type="button"
          >
            Projects
          </button>

          <span className={styles.toolbarStatus}>
            {archiveView && currentLabel
              ? `${currentLabel} · ${visiblePhotos.length}`
              : `${series.length} shoots`}
          </span>

          <div className={styles.filterWrap}>
            <button
              aria-expanded={filterOpen}
              aria-haspopup="menu"
              className={styles.filterButton}
              onClick={() => setFilterOpen((current) => !current)}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="M3 5h14M6 10h8M8.5 15h3" />
              </svg>
              <span>Filter</span>
            </button>

            {filterOpen ? (
              <div className={styles.filterMenu} role="menu">
                <div className={styles.filterMenuHead}>
                  <span>Browse</span>
                  <button aria-label="Close filters" onClick={() => setFilterOpen(false)} type="button">×</button>
                </div>

                <button
                  aria-current={!archiveView ? "true" : undefined}
                  className={styles.filterOption}
                  onClick={showProjects}
                  role="menuitem"
                  type="button"
                >
                  <span>Projects</span>
                  <b>{series.length}</b>
                </button>

                <button
                  aria-current={archiveView === "all" ? "true" : undefined}
                  className={styles.filterOption}
                  onClick={() => chooseArchive("all")}
                  role="menuitem"
                  type="button"
                >
                  <span>Full archive</span>
                  <b>{photos.length}</b>
                </button>

                {FILTERS.map((filter) => {
                  const count = photos.filter(filter.matches).length;
                  return (
                    <button
                      aria-current={archiveView === filter.key ? "true" : undefined}
                      className={styles.filterOption}
                      key={filter.key}
                      onClick={() => chooseArchive(filter.key)}
                      role="menuitem"
                      type="button"
                    >
                      <span>{filter.label}</span>
                      <b>{count}</b>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section
        aria-label={archiveView && currentLabel ? currentLabel : "Photography projects"}
        className={styles.gallerySection}
        id="photography-grid"
      >
        {archiveView ? (
          visiblePhotos.length ? (
            <PortfolioArchive photos={visiblePhotos} />
          ) : (
            <p className={styles.empty}>No photographs match this filter yet.</p>
          )
        ) : (
          <div className={styles.seriesGrid}>
            {series.map((item, index) => {
              const projectName = item.title.split(" · ")[0];
              const hoverImage = item.hover ?? item.cover;

              return (
                <Link
                  aria-label={`View ${item.title} — ${item.count} ${item.count === 1 ? "image" : "images"}`}
                  className={styles.seriesCard}
                  href={`/photography/${item.slug}`}
                  key={item.slug}
                >
                  <span className={styles.seriesImage}>
                    {item.cover ? (
                      <Image
                        alt=""
                        className={styles.primaryImage}
                        fill
                        priority={index < 6}
                        sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        src={item.cover.src}
                        style={{ objectPosition: item.coverPosition ?? "50% 50%" }}
                      />
                    ) : null}
                    {hoverImage ? (
                      <Image
                        alt=""
                        className={styles.secondaryImage}
                        fill
                        sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        src={hoverImage.src}
                        style={{ objectPosition: item.hover ? item.hoverPosition ?? "50% 50%" : item.coverPosition ?? "50% 50%" }}
                      />
                    ) : null}
                    <span className={styles.seriesOverlay}>
                      <strong>{projectName}</strong>
                      <span className={styles.seriesDate}>{item.kicker}</span>
                      <span className={styles.seriesCount}>
                        {item.count} {item.count === 1 ? "image" : "images"}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
