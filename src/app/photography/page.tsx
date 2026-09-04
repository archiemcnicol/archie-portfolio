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

const HIGH_RES_LOCAL_IDS = new Set([
  "18dAyt42f15vfiQdYb9H_Kzi1o9riwfT3",
  "1Gg6cdrLJfcAx5BrYsgry1tg2yUSnTMUF",
  "1KGzec0HOOtk-xtuIyINwesk0gkhWuZOy",
  "1P59hxLoR2K7r8vPW-sSFbbsvpnIsxdHg",
  "1RI29B5lcwkhPV5hhN6OFfJVdvyPhWThr",
  "1Vaxigbjr4n_2lOuIzDpxe2EsIlwj3Ywz",
  "1WeExibYtRiTUO7ToFtKmMvxaCdsf5uKJ",
  "1XbmIFrLTgb5JExjJ-5CcQZaIyZ6Zcfu9",
  "1XxJlFluopAC9ldRXalU_AKnELlxYX_zj",
  "1YdZ_0FQ92NIfhnwjYeW-Mv-3RYxdCuIA",
  "1a4XCo1YrNopaS3h1tXpUEodERRrVqePp",
  "1bQygrUEYMOakrH-yTWtGEJHUJWNkk8Tx",
  "1eBragPkQDz_ZkDM3qtE2VRfusjF2T415",
  "1j9AC3EfIQNiMsMUXLoYyl1r9aQqYdm3u",
  "1qf6tSQBBhLUXJ4CdAQ_NSMJSvD4sO2Zl",
  "1wbTdGCRcmHMtQ2MNhnFf1-c2REc0-WO7",
]);

const PHOTOS = PORTFOLIO_ARCHIVE_PHOTOS.map((photo) =>
  HIGH_RES_LOCAL_IDS.has(photo.id)
    ? {
        ...photo,
        src: `/portfolio/archive/${photo.id}.webp`,
        width: 1120,
        height: 630,
      }
    : photo,
).filter((photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName));

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
