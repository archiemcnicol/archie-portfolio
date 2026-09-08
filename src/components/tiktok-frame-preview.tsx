"use client";

import { useEffect, useMemo, useRef } from "react";

// Preferred cover moments taken from the user's supplied TikTok references.
// Nike: holding the stacked Nike boxes with "2 Fits, With 2 Shoes ft Nike" on screen.
// Superdry: opening talking frame with "SO SUPERDRY HAS JUST" on screen.
const PREFERRED_SEEK_POSITIONS: Record<string, number> = {
  "7592280935027035414": 1.05,
  "7415251227971259680": 2.0,
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
  const targetTime = PREFERRED_SEEK_POSITIONS[videoId] ?? seekTo;
  const src = useMemo(
    () =>
      `https://www.tiktok.com/player/v1/${videoId}?controls=0&progress_bar=0&play_button=0&volume_control=0&fullscreen_button=0&timestamp=${targetTime}&loop=0&autoplay=0&music_info=0&description=0&rel=0&native_context_menu=0`,
    [targetTime, videoId],
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let retryOne: number | undefined;
    let retryTwo: number | undefined;
    let retryThree: number | undefined;
    let retryFour: number | undefined;

    const sendPreviewPosition = () => {
      frame.contentWindow?.postMessage(
        { type: "seekTo", value: targetTime, "x-tiktok-player": true },
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
      retryOne = window.setTimeout(sendPreviewPosition, 180);
      retryTwo = window.setTimeout(sendPreviewPosition, 450);
      retryThree = window.setTimeout(sendPreviewPosition, 900);
      retryFour = window.setTimeout(sendPreviewPosition, 1600);
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (retryOne) window.clearTimeout(retryOne);
      if (retryTwo) window.clearTimeout(retryTwo);
      if (retryThree) window.clearTimeout(retryThree);
      if (retryFour) window.clearTimeout(retryFour);
    };
  }, [targetTime]);

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
