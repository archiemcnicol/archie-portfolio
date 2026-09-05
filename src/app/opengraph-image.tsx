import { ImageResponse } from "next/og";

export const alt = "Archie McNicol — Creator, Photographer & Digital Creative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#111111",
          color: "#f5f1ea",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "58px 64px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            borderLeft: "6px solid #d8ff34",
            borderTop: "6px solid #d8ff34",
            height: 62,
            left: 42,
            position: "absolute",
            top: 42,
            width: 62,
          }}
        />
        <div
          style={{
            borderBottom: "6px solid #d8ff34",
            borderRight: "6px solid #d8ff34",
            bottom: 42,
            height: 62,
            position: "absolute",
            right: 42,
            width: 62,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.18em" }}>
            ARCHIE MCNICOL / PORTFOLIO
          </div>
          <div style={{ color: "#d8ff34", fontSize: 24, fontWeight: 700 }}>@fitswitharchie</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.98 }}>
            Creator. Photographer.
            <br />
            Digital creative.
          </div>
          <div style={{ color: "#c9c4bb", fontSize: 28, lineHeight: 1.35 }}>
            Brand work · Photography · Performance · Professional
          </div>
        </div>

        <div style={{ alignItems: "center", display: "flex", fontSize: 22, justifyContent: "space-between" }}>
          <span>Buckinghamshire · United Kingdom</span>
          <span style={{ color: "#d8ff34", fontWeight: 700 }}>ARCHIE MCNICOL</span>
        </div>
      </div>
    ),
    size,
  );
}
