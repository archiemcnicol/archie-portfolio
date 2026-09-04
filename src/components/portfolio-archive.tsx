"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ArchivePhoto } from "@/lib/portfolio-archive";
import styles from "./portfolio-archive.module.css";

const DESKTOP_GAP = 14;
const MOBILE_GAP = 10;

type PortfolioArchiveProps = {
  photos: ArchivePhoto[];
};

type IndexedPhoto = {
  photo: ArchivePhoto;
  index: number;
};

type ArchiveRow = {
  items: IndexedPhoto[];
  height: number;
};

function aspectRatio(photo: ArchivePhoto) {
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

    while (
      rowHeight(last, width, gap) > targetHeight * 1.35 &&
      previous.length > 2
    ) {
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const indexedPhotos = useMemo(
    () => photos.map((photo, index) => ({ photo, index })),
    [photos],
  );

  const rows = useMemo(
    () => buildJustifiedRows(indexedPhotos, galleryWidth),
    [galleryWidth, indexedPhotos],
  );

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
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
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
                  aria-label={`Open photograph ${index + 1}`}
                  className={`${styles.archiveCardButton} archive-card-button`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <Image
                    alt={`Portfolio photograph ${index + 1}`}
                    className={styles.archiveCardImage}
                    height={photo.height}
                    loading="lazy"
                    sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                    src={photo.src}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    width={photo.width}
                  />
                </button>
              </figure>
            ))}
          </div>
        ))}
      </div>

      {activePhoto && activeIndex !== null ? (
        <div
          aria-label={`Photograph ${activeIndex + 1} of ${photos.length}`}
          aria-modal="true"
          className="archive-viewer"
          role="dialog"
        >
          <button
            aria-label="Close photograph"
            className="archive-viewer-close"
            onClick={() => setActiveIndex(null)}
            type="button"
          >
            Close
          </button>
          <button
            aria-label="Previous photograph"
            className="archive-viewer-nav archive-viewer-prev"
            onClick={() =>
              setActiveIndex((activeIndex - 1 + photos.length) % photos.length)
            }
            type="button"
          >
            ←
          </button>
          <div className="archive-viewer-image">
            <Image
              alt={`Portfolio photograph ${activeIndex + 1}`}
              fill
              priority
              sizes="100vw"
              src={activePhoto.src}
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
            <span>{String(activeIndex + 1).padStart(3, "0")} / {photos.length}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
