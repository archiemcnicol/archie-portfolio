"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CataloguePhoto } from "@/lib/photography-taxonomy";
import {
  PORTFOLIO_CARD_WIDTHS,
  PORTFOLIO_VIEWER_WIDTHS,
  portfolioResponsiveSrc,
  portfolioResponsiveSrcSet,
} from "@/lib/portfolio-image-src";
import styles from "./portfolio-archive.module.css";

const DESKTOP_GAP = 14;
const MOBILE_GAP = 10;
const INITIAL_VISIBLE_PHOTOS = 48;
const LOAD_MORE_BATCH = 48;

type PortfolioPhoto = CataloguePhoto;

type PortfolioArchiveProps = {
  photos: PortfolioPhoto[];
};

type IndexedPhoto = {
  photo: PortfolioPhoto;
  index: number;
};

type ArchiveRow = {
  items: IndexedPhoto[];
  height: number;
};

function aspectRatio(photo: PortfolioPhoto) {
  return Math.max(0.45, Math.min(2.5, photo.width / photo.height));
}

function rowHeight(items: IndexedPhoto[], width: number, gap: number) {
  const availableWidth = Math.max(1, width - gap * Math.max(0, items.length - 1));
  const totalRatio = items.reduce((sum, item) => sum + aspectRatio(item.photo), 0);
  return availableWidth / Math.max(totalRatio, 0.01);
}

function buildJustifiedRows(items: IndexedPhoto[], width: number): ArchiveRow[] {
  if (!items.length) return [];

  const gap = width <= 600 ? MOBILE_GAP : DESKTOP_GAP;

  if (width <= 600) {
    return items.map((item) => ({
      items: [item],
      height: width / aspectRatio(item.photo),
    }));
  }

  const targetHeight = width >= 1200 ? 250 : width >= 900 ? 235 : 220;
  const rows: IndexedPhoto[][] = [];
  let current: IndexedPhoto[] = [];

  for (const item of items) {
    current.push(item);

    if (current.length >= 2 && rowHeight(current, width, gap) <= targetHeight) {
      rows.push(current);
      current = [];
    }
  }

  if (current.length) rows.push(current);

  if (rows.length > 1) {
    const lastIndex = rows.length - 1;
    const last = rows[lastIndex];
    const previous = rows[lastIndex - 1];

    while (rowHeight(last, width, gap) > targetHeight * 1.35 && previous.length > 2) {
      const moved = previous.pop();
      if (!moved) break;
      last.unshift(moved);
    }

    if (rowHeight(last, width, gap) > targetHeight * 1.65) {
      rows.splice(lastIndex - 1, 2, [...previous, ...last]);
    }
  }

  return rows.map((row) => ({
    items: row,
    height: rowHeight(row, width, gap),
  }));
}

export function PortfolioArchive({ photos }: PortfolioArchiveProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [galleryWidth, setGalleryWidth] = useState(1200);
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_VISIBLE_PHOTOS, photos.length),
  );
  const galleryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const indexedPhotos = useMemo(
    () => photos.slice(0, visibleCount).map((photo, index) => ({ photo, index })),
    [photos, visibleCount],
  );

  const rows = useMemo(
    () => buildJustifiedRows(indexedPhotos, galleryWidth),
    [galleryWidth, indexedPhotos],
  );

  function openPhoto(index: number, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setActiveIndex(index);
  }

  function closePhoto() {
    setActiveIndex(null);
  }

  useEffect(() => {
    setVisibleCount(Math.min(INITIAL_VISIBLE_PHOTOS, photos.length));
  }, [photos]);

  useEffect(() => {
    if (activeIndex !== null && activeIndex >= photos.length) setActiveIndex(null);
  }, [activeIndex, photos.length]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const updateWidth = () => {
      const nextWidth = Math.round(gallery.getBoundingClientRect().width);
      if (nextWidth > 0) setGalleryWidth(nextWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(gallery);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visibleCount >= photos.length) return;
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisibleCount((current) =>
          Math.min(photos.length, current + LOAD_MORE_BATCH),
        );
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [photos.length, visibleCount]);

  useEffect(() => {
    if (activeIndex === null || photos.length < 2) return;

    const nextPhoto = photos[(activeIndex + 1) % photos.length];
    const preload = new window.Image();
    preload.decoding = "async";
    preload.sizes = "100vw";
    preload.srcset = portfolioResponsiveSrcSet(
      nextPhoto.src,
      PORTFOLIO_VIEWER_WIDTHS,
      "best",
    );
    preload.src = portfolioResponsiveSrc(nextPhoto.src, 2560, "best");
  }, [activeIndex, photos]);

  useEffect(() => {
    if (activeIndex === null) {
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePhoto();
        return;
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length,
        );
        return;
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        viewerRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, photos.length]);

  return (
    <>
      <div className={styles.archiveGrid} ref={galleryRef}>
        {rows.map((row, rowIndex) => (
          <div
            className={styles.archiveRow}
            key={`${row.items[0]?.photo.id ?? rowIndex}-${rowIndex}`}
            style={{ height: `${Math.max(90, row.height)}px` }}
          >
            {row.items.map(({ photo, index }) => (
              <figure
                className={`${styles.archiveCard} archive-card`}
                key={photo.id}
                style={{ flexGrow: aspectRatio(photo), flexBasis: 0 }}
              >
                <button
                  aria-label={`Open ${photo.title}`}
                  className={`${styles.archiveCardButton} archive-card-button`}
                  onClick={(event) => openPhoto(index, event.currentTarget)}
                  type="button"
                >
                  <img
                    alt={photo.title}
                    className={styles.archiveCardImage}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    height={photo.height}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                    src={portfolioResponsiveSrc(photo.src, 1280, "good")}
                    srcSet={portfolioResponsiveSrcSet(photo.src, PORTFOLIO_CARD_WIDTHS, "good")}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    width={photo.width}
                  />
                  <span className={styles.archiveCardMeta}>{photo.title}</span>
                </button>
              </figure>
            ))}
          </div>
        ))}
        {visibleCount < photos.length ? (
          <div aria-hidden="true" className={styles.loadMoreSentinel} ref={loadMoreRef} />
        ) : null}
      </div>

      {activePhoto && activeIndex !== null ? (
        <div
          aria-label={`${activePhoto.title}. Photograph ${activeIndex + 1} of ${photos.length}`}
          aria-modal="true"
          className="archive-viewer"
          ref={viewerRef}
          role="dialog"
        >
          <button
            aria-label="Close photograph"
            className="archive-viewer-close"
            onClick={closePhoto}
            ref={closeButtonRef}
            type="button"
          >
            Close
          </button>
          <button
            aria-label="Previous photograph"
            className="archive-viewer-nav archive-viewer-prev"
            onClick={() => setActiveIndex((activeIndex - 1 + photos.length) % photos.length)}
            type="button"
          >
            ←
          </button>
          <div className="archive-viewer-image">
            <img
              alt={activePhoto.title}
              decoding="async"
              fetchPriority="high"
              height={activePhoto.height}
              sizes="100vw"
              src={portfolioResponsiveSrc(activePhoto.src, 3200, "best")}
              srcSet={portfolioResponsiveSrcSet(activePhoto.src, PORTFOLIO_VIEWER_WIDTHS, "best")}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              width={activePhoto.width}
            />
          </div>
          <button
            aria-label="Next photograph"
            className="archive-viewer-nav archive-viewer-next"
            onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}
            type="button"
          >
            →
          </button>
          <div className="archive-viewer-meta">
            <span>{activePhoto.title}</span>
            <span>{activePhoto.seriesTitle} · {String(activeIndex + 1).padStart(3, "0")} / {photos.length}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
