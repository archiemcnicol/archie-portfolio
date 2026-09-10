"use client";

import { useEffect, useMemo, useRef } from "react";

// Retained production-quality static covers for Nike and Superdry. Other campaigns continue
// to use TikTok's live player. These are the only dedicated static preview assets kept in
// Cloudinary alongside the current profile avatar.
const STATIC_FRAME_PREVIEWS: Record<string, string> = {
  "7592280935027035414": "https://res.cloudinary.com/i1xhlvd6/image/upload/v1789016503/nike-approved-1080.webp",
  "7415251227971259680": "https://res.cloudinary.com/i1xhlvd6/image/upload/v1789016515/superdry-approved-1080.webp",
};

const TIKTOK_PROFILE_AVATAR =
  "https://res.cloudinary.com/i1xhlvd6/image/upload/v1789012088/tiktok-profile-avatar-centred-zoomout-v9.jpg";

function HeartIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6a5.5 5.5 0 0 0 1-8.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.2 9.2 0 0 1-3.8-.9L3 20.5l1.6-4.7A8.4 8.4 0 1 1 21 11.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="M6 4.8c0-1 .8-1.8 1.8-1.8h8.4c1 0 1.8.8 1.8 1.8V21l-6-3.8L6 21V4.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="M14.5 5 20 10.5 14.5 16v-3.4c-5.8 0-9.2 2.1-11 6.4.7-7 4-10.2 11-10.2V5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

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
            transform: "scale(1.13)",
            transformOrigin: "center center",
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
              border: "1px solid rgba(255,255,255,.82)",
              borderRadius: "999px",
              display: "block",
              flex: "0 0 auto",
              height: "clamp(24px, 4.6vw, 34px)",
              overflow: "hidden",
              width: "clamp(24px, 4.6vw, 34px)",
            }}
          >
            <img
              alt=""
              src={TIKTOK_PROFILE_AVATAR}
              style={{
                display: "block",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                transform: "scale(1.03)",
                transformOrigin: "center center",
                width: "100%",
              }}
            />
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

        <div
          aria-hidden="true"
          style={{
            bottom: "clamp(42px, 9vw, 66px)",
            color: "#fff",
            display: "grid",
            gap: "clamp(8px, 1.8vw, 12px)",
            justifyItems: "center",
            pointerEvents: "none",
            position: "absolute",
            right: "clamp(8px, 2.5vw, 14px)",
            textShadow: "0 1px 4px rgba(0,0,0,.95)",
            zIndex: 2,
          }}
        >
          {[<HeartIcon key="heart" />, <CommentIcon key="comment" />, <BookmarkIcon key="bookmark" />, <ShareIcon key="share" />].map((icon, index) => (
            <span
              key={index}
              style={{
                alignItems: "center",
                background: "rgba(20,20,20,.34)",
                borderRadius: "999px",
                display: "inline-flex",
                height: "clamp(25px, 4.8vw, 34px)",
                justifyContent: "center",
                width: "clamp(25px, 4.8vw, 34px)",
              }}
            >
              {icon}
            </span>
          ))}
        </div>
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
