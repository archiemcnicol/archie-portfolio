"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ArchivePhoto } from "@/lib/portfolio-archive";

const PAGE_SIZE = 36;

type PortfolioArchiveProps = {
  photos: ArchivePhoto[];
};

export function PortfolioArchive({ photos }: PortfolioArchiveProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visiblePhotos = photos.slice(0, visibleCount);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

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
      <div className="archive-grid">
        {visiblePhotos.map((photo, index) => (
          <figure className="archive-card" key={photo.id}>
            <button
              aria-label={`Open photograph ${index + 1}: ${photo.originalName}`}
              className="archive-card-button"
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt={`Portfolio photograph ${index + 1}`}
                height={photo.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                src={photo.src}
                width={photo.width}
              />
            </button>
          </figure>
        ))}
      </div>

      <div className="archive-controls">
        <span>
          Showing {visiblePhotos.length} of {photos.length}
        </span>
        {visibleCount < photos.length ? (
          <button
            className="photo-button"
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, photos.length))}
            type="button"
          >
            Load {Math.min(PAGE_SIZE, photos.length - visibleCount)} more
          </button>
        ) : null}
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
            <span>{activePhoto.originalName}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
