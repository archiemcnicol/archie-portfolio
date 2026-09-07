"use client";

import { useEffect, useMemo, useRef } from "react";

// Curated cover positions for videos that appear in more than one place on the site.
// Keeping these here means homepage and Brand Work previews cannot drift apart.
const PREVIEW_SEEK_OVERRIDES: Record<string, number> = {
  // Nike — move past the first close frame so both shoeboxes are visible.
  "7592280935027035414": 1.3,
  // Superdry — wait for the opening zoom to pull back to the centred on-screen frame.
  "7415251227971259680": 2.6,
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
  const effectiveSeekTo = PREVIEW_SEEK_OVERRIDES[videoId] ?? seekTo;
  const src = useMemo(
    () =>
      `https://www.tiktok.com/player/v1/${videoId}?controls=0&progress_bar=0&play_button=0&volume_control=0&fullscreen_button=0&timestamp=0&loop=0&autoplay=0&music_info=0&description=0&rel=0&native_context_menu=0`,
    [videoId],
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let retryOne: number | undefined;
    let retryTwo: number | undefined;
    let retryThree: number | undefined;

    const sendPreviewPosition = () => {
      frame.contentWindow?.postMessage(
        { type: "seekTo", value: effectiveSeekTo, "x-tiktok-player": true },
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
  }, [effectiveSeekTo]);

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
