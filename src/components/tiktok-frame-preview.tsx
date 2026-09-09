"use client";

import { useEffect, useMemo, useRef } from "react";
import { NIKE_APPROVED_COVER } from "@/lib/nike-cover-data";
import { SUPERDRY_APPROVED_COVER } from "@/lib/superdry-cover-data";

// User-approved static covers for Nike and Superdry. Other campaigns continue to use
// TikTok's live player. The static versions deliberately include a lightweight TikTok
// attribution layer so they retain the same platform identity as the live previews.
const STATIC_FRAME_PREVIEWS: Record<string, string> = {
  "7592280935027035414": NIKE_APPROVED_COVER,
  "7415251227971259680": SUPERDRY_APPROVED_COVER,
};

export function TikTokFramePreview({
  videoId,
  seekTo = 0.8,
  className,
  title = "TikTok video preview",
}: {
  videoId: string;
  seekTo?: number;
  className?: string;
  title?: string;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const staticFrame = STATIC_FRAME_PREVIEWS[videoId];
  const src = useMemo(
    () =>
      `https://www.tiktok.com/player/v1/${videoId}?controls=0&progress_bar=0&play_button=0&volume_control=0&fullscreen_button=0&timestamp=${seekTo}&loop=0&autoplay=0&music_info=0&description=0&rel=0&native_context_menu=0`,
    [seekTo, videoId],
  );

  useEffect(() => {
    if (staticFrame) return;

    const frame = frameRef.current;
    if (!frame) return;

    let retryOne: number | undefined;
    let retryTwo: number | undefined;
    let retryThree: number | undefined;

    const sendPreviewPosition = () => {
      frame.contentWindow?.postMessage(
        { type: "seekTo", value: seekTo, "x-tiktok-player": true },
        "*",
      );
      frame.contentWindow?.postMessage(
        { type: "pause", value: undefined, "x-tiktok-player": true },
        "*",
      );
    };

    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow) return;
      const payload = event.data as { type?: string; "x-tiktok-player"?: boolean } | null;
      if (!payload?.["x-tiktok-player"] || payload.type !== "onPlayerReady") return;

      sendPreviewPosition();
      retryOne = window.setTimeout(sendPreviewPosition, 220);
      retryTwo = window.setTimeout(sendPreviewPosition, 650);
      retryThree = window.setTimeout(sendPreviewPosition, 1200);
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (retryOne) window.clearTimeout(retryOne);
      if (retryTwo) window.clearTimeout(retryTwo);
      if (retryThree) window.clearTimeout(retryThree);
    };
  }, [seekTo, staticFrame]);

  if (staticFrame) {
    return (
      <>
        <img
          alt=""
          aria-hidden="true"
          className={className}
          decoding="async"
          loading="eager"
          src={staticFrame}
          style={{
            background: "#080808",
            display: "block",
            height: "100%",
            inset: 0,
            objectFit: "cover",
            objectPosition: "center center",
            pointerEvents: "none",
            position: "absolute",
            width: "100%",
            zIndex: 0,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            alignItems: "center",
            display: "flex",
            gap: "clamp(5px, 1vw, 8px)",
            left: "clamp(8px, 2.6vw, 14px)",
            pointerEvents: "none",
            position: "absolute",
            top: "clamp(8px, 2.6vw, 14px)",
            zIndex: 2,
          }}
        >
          <span
            style={{
              alignItems: "center",
              background: "rgba(20,20,20,.82)",
              border: "1px solid rgba(255,255,255,.68)",
              borderRadius: "999px",
              color: "#fff",
              display: "inline-flex",
              fontSize: "clamp(8px, 1.6vw, 11px)",
              fontWeight: 800,
              height: "clamp(24px, 4.6vw, 34px)",
              justifyContent: "center",
              letterSpacing: "-.02em",
              textShadow: "0 1px 3px rgba(0,0,0,.8)",
              width: "clamp(24px, 4.6vw, 34px)",
            }}
          >
            AM
          </span>

          <span
            style={{
              color: "#fff",
              display: "grid",
              lineHeight: 1.08,
              textShadow: "0 1px 4px rgba(0,0,0,.95)",
            }}
          >
            <strong style={{ fontSize: "clamp(9px, 1.9vw, 13px)", fontWeight: 700 }}>
              Archie McNicol
            </strong>
            <span style={{ fontSize: "clamp(8px, 1.55vw, 11px)", opacity: .92 }}>
              @fitswitharchie
            </span>
          </span>
        </div>

        <span
          aria-hidden="true"
          style={{
            alignItems: "center",
            color: "#fff",
            display: "inline-flex",
            fontSize: "clamp(9px, 1.8vw, 13px)",
            fontWeight: 700,
            gap: "4px",
            pointerEvents: "none",
            position: "absolute",
            right: "clamp(8px, 2.6vw, 14px)",
            textShadow: "0 1px 4px rgba(0,0,0,.95)",
            top: "clamp(10px, 2.8vw, 15px)",
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: "1.22em" }}>♪</span>
          TikTok
        </span>
      </>
    );
  }

  return (
    <iframe
      allow="fullscreen"
      aria-hidden="true"
      className={className}
      loading="lazy"
      ref={frameRef}
      src={src}
      style={{
        border: 0,
        display: "block",
        height: "100%",
        pointerEvents: "none",
        width: "100%",
      }}
      tabIndex={-1}
      title={title}
    />
  );
}
