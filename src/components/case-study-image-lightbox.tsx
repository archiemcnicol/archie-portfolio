"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CaseStudyImageLightboxProps = {
  alt: string;
  buttonClassName?: string;
  height: number;
  imageClassName?: string;
  src: string;
  width: number;
};

export function CaseStudyImageLightbox({
  alt,
  buttonClassName,
  height,
  imageClassName,
  src,
  width,
}: CaseStudyImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
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
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        aria-label="Open larger CreatorOps dashboard snapshot"
        className={buttonClassName}
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <Image
          alt={alt}
          className={imageClassName}
          height={height}
          sizes="(max-width: 620px) calc(100vw - 24px), (max-width: 900px) 88vw, 960px"
          src={src}
          unoptimized
          width={width}
        />
      </button>

      {open ? (
        <div
          aria-label="CreatorOps dashboard snapshot"
          aria-modal="true"
          className="archive-viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          ref={viewerRef}
          role="dialog"
        >
          <button
            aria-label="Close CreatorOps dashboard snapshot"
            className="archive-viewer-close"
            onClick={() => setOpen(false)}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
          <div className="archive-viewer-image">
            <Image
              alt={alt}
              fill
              priority
              sizes="100vw"
              src={src}
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
