"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ArchivePhoto } from "@/lib/portfolio-archive";
import styles from "./portfolio-archive.module.css";

const DESKTOP_GAP = 14;
const MOBILE_GAP = 10;
const FINAL_PACK_URL = "/portfolio/archive/final-16-avif.pack";

const FINAL_PACK_INDEX: Record<string, { offset: number; length: number }> = {
  "18dAyt42f15vfiQdYb9H_Kzi1o9riwfT3": { offset: 0, length: 10612 },
  "1Gg6cdrLJfcAx5BrYsgry1tg2yUSnTMUF": { offset: 10612, length: 22451 },
  "1KGzec0HOOtk-xtuIyINwesk0gkhWuZOy": { offset: 33063, length: 25787 },
  "1P59hxLoR2K7r8vPW-sSFbbsvpnIsxdHg": { offset: 58850, length: 21527 },
  "1RI29B5lcwkhPV5hhN6OFfJVdvyPhWThr": { offset: 80377, length: 22230 },
  "1Vaxigbjr4n_2lOuIzDpxe2EsIlwj3Ywz": { offset: 102607, length: 29569 },
  "1WeExibYtRiTUO7ToFtKmMvxaCdsf5uKJ": { offset: 132176, length: 21739 },
  "1XbmIFrLTgb5JExjJ-5CcQZaIyZ6Zcfu9": { offset: 153915, length: 26794 },
  "1XxJlFluopAC9ldRXalU_AKnELlxYX_zj": { offset: 180709, length: 19835 },
  "1YdZ_0FQ92NIfhnwjYeW-Mv-3RYxdCuIA": { offset: 200544, length: 15726 },
  "1a4XCo1YrNopaS3h1tXpUEodERRrVqePp": { offset: 216270, length: 17842 },
  "1bQygrUEYMOakrH-yTWtGEJHUJWNkk8Tx": { offset: 234112, length: 31329 },
  "1eBragPkQDz_ZkDM3qtE2VRfusjF2T415": { offset: 265441, length: 24461 },
  "1j9AC3EfIQNiMsMUXLoYyl1r9aQqYdm3u": { offset: 289902, length: 15069 },
  "1qf6tSQBBhLUXJ4CdAQ_NSMJSvD4sO2Zl": { offset: 304971, length: 20407 },
  "1wbTdGCRcmHMtQ2MNhnFf1-c2REc0-WO7": { offset: 325378, length: 29295 },
};

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
  const [packedImageUrls, setPackedImageUrls] = useState<Record<string, string>>({});
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
    const controller = new AbortController();
    const createdUrls: string[] = [];

    async function loadPackedImages() {
      try {
        const response = await fetch(FINAL_PACK_URL, {
          cache: "force-cache",
          signal: controller.signal,
        });

        if (!response.ok) return;

        const pack = await response.arrayBuffer();
        const urls: Record<string, string> = {};

        for (const [id, entry] of Object.entries(FINAL_PACK_INDEX)) {
          if (entry.offset + entry.length > pack.byteLength) continue;

          const imageBytes = pack.slice(entry.offset, entry.offset + entry.length);
          const url = URL.createObjectURL(new Blob([imageBytes], { type: "image/avif" }));
          createdUrls.push(url);
          urls[id] = url;
        }

        if (!controller.signal.aborted) {
          setPackedImageUrls(urls);
        }
      } catch {
        // The regular archive remains usable even if the final pack cannot load.
      }
    }

    void loadPackedImages();

    return () => {
      controller.abort();
      for (const url of createdUrls) URL.revokeObjectURL(url);
    };
  }, []);

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

  const activePackedSrc =
    activePhoto && FINAL_PACK_INDEX[activePhoto.id]
      ? packedImageUrls[activePhoto.id] ?? null
      : null;

  return (
    <>
      <div className={styles.archiveGrid} ref={galleryRef}>
        {rows.map((row, rowIndex) => (
          <div
            className={styles.archiveRow}
            key={`${row.items[0]?.photo.id ?? rowIndex}-${rowIndex}`}
            style={{ height: `${Math.max(90, row.height)}px` }}
          >
            {row.items.map(({ photo, index }) => {
              const isPacked = Boolean(FINAL_PACK_INDEX[photo.id]);
              const packedSrc = isPacked ? packedImageUrls[photo.id] ?? null : null;

              return (
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
                    {isPacked ? (
                      packedSrc ? (
                        <img
                          alt={`Portfolio photograph ${index + 1}`}
                          className={styles.archiveCardImage}
                          decoding="async"
                          loading="lazy"
                          src={packedSrc}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className={styles.archiveCardPlaceholder}
                        />
                      )
                    ) : (
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
                    )}
                  </button>
                </figure>
              );
            })}
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
            {FINAL_PACK_INDEX[activePhoto.id] ? (
              activePackedSrc ? (
                <img
                  alt={`Portfolio photograph ${activeIndex + 1}`}
                  className={styles.archiveViewerPackedImage}
                  src={activePackedSrc}
                />
              ) : null
            ) : (
              <Image
                alt={`Portfolio photograph ${activeIndex + 1}`}
                fill
                priority
                sizes="100vw"
                src={activePhoto.src}
              />
            )}
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
