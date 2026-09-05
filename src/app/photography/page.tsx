import type { Metadata } from "next";
import { PortfolioArchive } from "@/components/portfolio-archive";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";

export const metadata: Metadata = {
  title: "Photography — Archie McNicol",
  description: "Travel, aerial, event and lifestyle photography by Archie McNicol, whose photography journey began around 2018 and developed through 2019–20.",
  alternates: { canonical: "/photography" },
};

const EXCLUDED_PHOTO_NAMES = new Set([
  "IMG_2473.jpg",
  "IMG_2469.jpg",
  "Screenshot_20200502-010759_Instagram-Enhanced.jpg",
]);

// Keep filenames server-side. The client gallery only receives fields it actually renders.
const PHOTOS = PORTFOLIO_ARCHIVE_PHOTOS
  .filter((photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName))
  .map(({ id, src, width, height }) => ({ id, src, width, height }));

export default function PhotographyPage() {
  return (
    <main style={{ background: "#111", color: "#f5f1ea" }}>
      <section className="photo-archive-hero">
        <div className="wrap photo-archive-hero-grid">
          <div>
            <div className="photo-archive-kicker">Photography / since 2018</div>
            <h1>Entire photography portfolio.</h1>
          </div>
          <div className="photo-archive-side">
            <p>
              Photography started as an early creative interest around 2018, developed through
              2019–20 and has grown into travel, aerial, event and lifestyle work across the UK and
              internationally.
            </p>
            <div className="photo-archive-count">{PHOTOS.length} photographs in the public archive</div>
          </div>
        </div>
      </section>

      <section className="photo-archive-gallery">
        <div className="wrap">
          <PortfolioArchive photos={PHOTOS} />
        </div>
      </section>
    </main>
  );
}
