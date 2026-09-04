import { PortfolioArchive } from "@/components/portfolio-archive";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";
import { PORTFOLIO_FINAL_PHOTOS } from "@/lib/portfolio-final";

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
  ...PORTFOLIO_FINAL_PHOTOS,
].filter((photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName));

export default function PhotographyPage() {
  return (
    <main className="photography-scroll-page">
      <PortfolioArchive photos={PHOTOS} />
    </main>
  );
}
