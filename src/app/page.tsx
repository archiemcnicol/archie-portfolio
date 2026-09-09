import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TikTokFramePreview } from "@/components/tiktok-frame-preview";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";
import {
  buildPhotographyCatalogue,
  type PhotographySeriesSlug,
} from "@/lib/photography-final-taxonomy";
import { PHOTOGRAPHY_DISPLAY } from "@/lib/photography-display";
import { portfolioImageSrc } from "@/lib/portfolio-image-src";
import styles from "./home.module.css";
import refine from "./home-refinement.module.css";

export const metadata: Metadata = {
  title: "Archie McNicol — Creator, Photographer & Digital Creative",
  description:
    "Portfolio of Archie McNicol: creator work, photography, community operations, performance and digital projects.",
  alternates: { canonical: "/" },
};

const TRAVEL_PORTRAIT =
  "https://res.cloudinary.com/i1xhlvd6/image/upload/c_scale,w_1000/e_sharpen/q_auto:best/v1788834592/archie-greece.webp";

const EXCLUDED_PHOTO_NAMES = new Set([
  "IMG_2473.jpg",
  "IMG_2469.jpg",
  "Screenshot_20200502-010759_Instagram-Enhanced.jpg",
]);

const HOME_ARCHIVE = buildPhotographyCatalogue(
  PORTFOLIO_ARCHIVE_PHOTOS.filter((photo) => !EXCLUDED_PHOTO_NAMES.has(photo.originalName)),
);

function selectedProjectCover(slug: PhotographySeriesSlug) {
  const photos = HOME_ARCHIVE.filter((photo) => photo.seriesSlug === slug);
  const preference = PHOTOGRAPHY_DISPLAY[slug];
  const photo = (preference?.cover ? photos[preference.cover - 1] : undefined) ?? photos[0];
  return photo ? { ...photo, position: preference?.coverPosition } : undefined;
}

const HERO_PHOTOGRAPHY = selectedProjectCover("new-york-2026-06-10");
const PHOTOGRAPHY_ROUTE_IMAGE =
  HOME_ARCHIVE.find((photo) => photo.id === "1CLNkTDJhvrkD-L1ZgdXYQlxPw8DKEdiS") ??
  selectedProjectCover("sicily-2025-08-28");

function coverStyle(position?: string) {
  return position ? { objectPosition: position } : undefined;
}

function RouteIcon({ type }: { type: "creator" | "photography" | "professional" | "performance" | "digital" }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.6 };

  if (type === "photography") {
    return <svg aria-hidden="true" viewBox="0 0 32 32"><path {...common} d="M7 10.5h4l1.4-2.5h7.2l1.4-2.5h7.2l1.4 2.5h4a2 2 0 0 1 2 2V24a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V12.5a2 2 0 0 1 2-2Z"/><circle {...common} cx="16" cy="18" r="5"/></svg>;
  }
  if (type === "professional") {
    return <svg aria-hidden="true" viewBox="0 0 32 32"><circle {...common} cx="11" cy="11" r="4"/><circle {...common} cx="22" cy="13" r="3"/><path {...common} d="M4.5 25c.7-5 3.2-7.5 7.5-7.5S18.8 20 19.5 25M19 19c4.4.1 7 2.1 7.7 6"/></svg>;
  }
  if (type === "performance") {
    return <svg aria-hidden="true" viewBox="0 0 32 32"><path {...common} d="M6 25V15M13 25V10M20 25V18M27 25V6"/><path {...common} d="m5 12 7-5 7 6 8-9"/></svg>;
  }
  if (type === "digital") {
    return <svg aria-hidden="true" viewBox="0 0 32 32"><path {...common} d="m12 9-7 7 7 7M20 9l7 7-7 7M18 6l-4 20"/></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 32 32"><rect {...common} x="5" y="7" width="22" height="18" rx="2"/><path {...common} d="m13 12 8 4-8 4v-8Z"/></svg>;
}

export default function Home() {
  return (
    <main className={`${styles.home} home-page`}>
      <section className={`${styles.hero} ${refine.hero}`}>
        <div className={`${styles.heroInner} ${refine.heroInner} home-hero-inner`}>
          <div className={styles.heroMeta}>
            <span>Archie McNicol / Portfolio</span>
            <span>Creator · Photographer · Community</span>
            <span>United Kingdom</span>
          </div>

          <h1 className={styles.name}>
            <span>Archie</span>
            <span>McNicol.</span>
          </h1>

          <div className={`${styles.heroCollage} home-hero-collage`} aria-label="Selected visual work">
            <Link
              className={`${styles.imageCard} ${styles.cardLandscape} home-hero-card home-hero-landscape`}
              href="/photography/new-york-2026-06-10"
            >
              {HERO_PHOTOGRAPHY ? (
                <Image
                  alt="Selected New York photograph from Archie McNicol's photography portfolio"
                  fill
                  priority
                  sizes="(max-width: 760px) 44vw, 25vw"
                  src={portfolioImageSrc(HERO_PHOTOGRAPHY.src)}
                  style={coverStyle(HERO_PHOTOGRAPHY.position)}
                />
              ) : null}
              <span className={styles.imageLabel}><b>Photography</b><b>New York · Jun 2026</b></span>
            </Link>

            <Link className={`${styles.imageCard} ${styles.cardPortrait} home-hero-card home-hero-portrait`} href="/about">
              <Image
                alt="Archie McNicol while travelling"
                fill
                priority
                sizes="(max-width: 760px) 52vw, (max-width: 1050px) 54vw, 24vw"
                src={TRAVEL_PORTRAIT}
                unoptimized
              />
              <span className={styles.imageLabel}><b>Personal / travel</b><b>About →</b></span>
            </Link>

            <Link className={`${styles.imageCard} ${styles.cardCampaign} home-hero-card home-hero-campaign`} href="/creator">
              <TikTokFramePreview
                className={refine.campaignFrame}
                seekTo={1.05}
                title="Nike creator work preview"
                videoId="7592280935027035414"
              />
              <span className={styles.imageLabel}><b>Brand work</b><b>Nike</b></span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.proof} ${refine.proof}`} aria-label="Portfolio highlights">
        <div className={`${styles.proofGrid} ${refine.proofGrid}`}>
          <div><strong>25K+</strong><span>Social community</span></div>
          <div><strong>20M+</strong><span>Creator views</span></div>
          <div><strong>3+ yrs</strong><span>Community operations</span></div>
          <div><strong>A*</strong><span>Photography · 2026</span></div>
        </div>
      </section>

      <section className={refine.routeIntro} aria-label="Explore the portfolio">
        <div className={`${styles.sectionWrap} ${refine.routeIntroInner}`}>
          <div className={refine.heroActions}>
            <Link className={styles.heroAction} href="#selected-work">Explore the work ↓</Link>
            <Link className={`${styles.heroAction} ${refine.secondaryHeroAction}`} href="/contact">Work with me →</Link>
            <Link className={`${styles.heroAction} ${refine.secondaryHeroAction}`} href="/about">About Archie →</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.chapters} ${refine.chapters}`} id="selected-work">
        <div className={styles.sectionWrap}>
          <div className={`${styles.chapterGrid} ${refine.chapterGrid}`}>
            <Link className={`${styles.chapter} ${refine.chapterEditorialDark} ${refine.compactChapter}`} href="/creator">
              <div className={`${refine.compactMedia} ${refine.tiktokMedia}`} aria-hidden="true">
                <TikTokFramePreview className={refine.routeTikTok} seekTo={1.05} title="Nike creator campaign preview" videoId="7592280935027035414" />
              </div>
              <div className={styles.chapterTop}><span>01 / Brand work</span><span>Campaigns · Creator content</span></div>
              <span className={refine.routeIcon}><RouteIcon type="creator" /></span>
              <div className={styles.chapterBottom}><h3>Creator &amp; brand work.</h3><p>Campaigns, collaborations and results.</p><span className={styles.chapterArrow}>↗</span></div>
            </Link>

            <Link className={`${styles.chapter} ${refine.chapterEditorialDark} ${refine.compactChapter} home-route-photo-card`} href="/photography">
              <div className={`${refine.compactMedia} home-route-photo-media`} aria-hidden="true">
                {PHOTOGRAPHY_ROUTE_IMAGE ? <Image alt="" fill sizes="(max-width: 760px) 100vw, 30vw" src={portfolioImageSrc(PHOTOGRAPHY_ROUTE_IMAGE.src)} /> : null}
              </div>
              <div className={styles.chapterTop}><span>02 / Photography</span><span>Projects · Dates · Archive</span></div>
              <span className={refine.routeIcon}><RouteIcon type="photography" /></span>
              <div className={styles.chapterBottom}><h3>Photography.</h3><p>Projects and full archive.</p><span className={styles.chapterArrow}>↗</span></div>
            </Link>

            <Link className={`${styles.chapter} ${refine.chapterEditorialDark} ${refine.compactChapter}`} href="/professional">
              <div className={styles.chapterTop}><span>03 / Professional</span><span>Community · Operations</span></div>
              <span className={refine.routeIcon}><RouteIcon type="professional" /></span>
              <div className={styles.chapterBottom}><h3>Behind the content.</h3><p>Creator operations and UK ↔ Shanghai communication.</p><span className={styles.chapterArrow}>↗</span></div>
            </Link>

            <Link className={`${styles.chapter} ${refine.chapterEditorialDark} ${refine.compactChapter}`} href="/affiliate">
              <div className={styles.chapterTop}><span>04 / Performance</span><span>Commerce · Outcomes</span></div>
              <span className={refine.routeIcon}><RouteIcon type="performance" /></span>
              <div className={styles.chapterBottom}><h3>Beyond views.</h3><p>Users, parcels and freight.</p><span className={styles.chapterArrow}>↗</span></div>
            </Link>

            <Link className={`${styles.chapter} ${refine.chapterEditorialDark} ${refine.compactChapter}`} href="/business">
              <div className={styles.chapterTop}><span>05 / Digital</span><span>Web · Systems</span></div>
              <span className={refine.routeIcon}><RouteIcon type="digital" /></span>
              <div className={styles.chapterBottom}><h3>Digital projects.</h3><p>Web builds and content systems.</p><span className={styles.chapterArrow}>↗</span></div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
