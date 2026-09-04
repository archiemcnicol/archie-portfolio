import { PortfolioArchive } from "@/components/portfolio-archive";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";

export const metadata = {
  title: "Photography — Archie McNicol",
  description: "Photography by Archie McNicol.",
};

const EXCLUDED_PHOTO_NAMES = new Set([
  "IMG_2473.jpg",
  "IMG_2469.jpg",
  "Screenshot_20200502-010759_Instagram-Enhanced.jpg",
]);

const PHOTOS = [
  ...PORTFOLIO_ARCHIVE_PHOTOS,
].filter((photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName));

export default function PhotographyPage() {
  return (
    <main style={{ background: "#111", color: "#f5f1ea" }}>
      <section
        style={{
          borderBottom: "1px solid rgba(245, 241, 234, 0.16)",
          padding: "34px 20px 30px",
        }}
      >
        <div style={{ margin: "0 auto", maxWidth: 1440 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".14em",
              marginBottom: 10,
              opacity: 0.58,
              textTransform: "uppercase",
            }}
          >
            Photography
          </div>
          <h1
            style={{
              fontSize: "clamp(38px, 5vw, 72px)",
              letterSpacing: "-.055em",
              lineHeight: 0.94,
              margin: 0,
            }}
          >
            Entire Photography Portfolio
          </h1>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".08em",
              marginTop: 14,
              opacity: 0.58,
              textTransform: "uppercase",
            }}
          >
            {PHOTOS.length} photographs
          </div>
        </div>
      </section>

      <section style={{ padding: 14 }}>
        <PortfolioArchive photos={PHOTOS} />
      </section>
    </main>
  );
}
