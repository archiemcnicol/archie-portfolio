import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE_STATS } from "@/lib/profile-data";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "About Archie McNicol — creator, photographer, community manager and digital creative based in Buckinghamshire, UK.",
  alternates: { canonical: "/about" },
};

const chapters = [
  ["01", "Background", "The CV-style timeline: education, work, creator growth and the projects that shaped the portfolio.", "/cv"],
  ["02", "Creator work", "Campaigns, collaborations, creative execution and public performance across @fitswitharchie.", "/creator"],
  ["03", "Professional", "Community management, creator operations and the work behind the public-facing creative output.", "/professional"],
  ["04", "Performance", "Affiliate partnerships measured through registrations, activations, parcels and downstream conversion.", "/affiliate"],
  ["05", "Photography", "The complete public photography archive across travel, aerial, event and lifestyle work.", "/photography"],
  ["06", "Digital", "Web builds, content systems and commercial projects that connect creative work with useful infrastructure.", "/business"],
] as const;

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>About / Archie McNicol</div>
            <h1>More than one lane.</h1>
          </div>
          <div className={styles.heroSide}>
            <p>
              A Buckinghamshire-based creator, photographer and community manager working across
              short-form content, creator operations, performance partnerships and digital projects.
            </p>
            <Link className={styles.inlineLink} href="/cv">Open full background →</Link>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.statRail}`} aria-label="Profile overview">
        {PROFILE_STATS.map(([value, label]) => (
          <div className={styles.stat} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className={styles.statement}>
        <div className="wrap">
          <p>
            The useful version of the story is not a short biography. The creator work, CapCut
            community role, affiliate projects, photography and web work all developed alongside
            each other, and each one has its own evidence, history and outcomes.
          </p>
        </div>
      </section>

      <section className={styles.chapters}>
        <div className="wrap">
          <div className={styles.chapterHeading}>
            <span>Explore the work</span>
            <p>Each chapter opens into the fuller version rather than stopping at a summary card.</p>
          </div>
          <div className={styles.chapterList}>
            {chapters.map(([number, title, copy, href]) => (
              <Link className={styles.chapter} href={href} key={href}>
                <span className={styles.chapterNumber}>{number}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
