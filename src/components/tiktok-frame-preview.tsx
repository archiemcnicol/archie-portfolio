"use client";

import { useEffect, useMemo, useRef } from "react";

// Exact user-approved 9:16 cover frames. These are ordinary JPEGs served from the same
// jsDelivr-backed GitHub path used by the photography archive, pinned to the immutable
// commit that contains the verified binaries. This avoids TikTok timing, Vercel public
// asset delivery, Next image optimisation and the earlier broken WebP copies.
const STATIC_FRAME_PREVIEWS: Record<string, string> = {
  "7592280935027035414":
    "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@5e16b3d84fbfebe494a3d03a2a4078356ab8580a/public/brand-work/nike-preferred-cover-final-20260908.jpg",
  "7415251227971259680":
    "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@5e16b3d84fbfebe494a3d03a2a4078356ab8580a/public/brand-work/superdry-preferred-cover-final-20260908.jpg",
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
          objectFit: "contain",
          objectPosition: "center",
          pointerEvents: "none",
          position: "absolute",
          width: "100%",
          zIndex: 0,
        }}
      />
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
