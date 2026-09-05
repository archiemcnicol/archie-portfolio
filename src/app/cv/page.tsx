import type { Metadata } from "next";
import Link from "next/link";
import { EDUCATION, EXPERIENCE } from "@/lib/profile-data";
import { PUBLIC_PROFILE } from "@/lib/site";
import styles from "./cv.module.css";

export const metadata: Metadata = {
  title: "Background & CV",
  description: "CV-style background and experience timeline for Archie McNicol across content creation, community management, photography, affiliate work and digital projects.",
  alternates: { canonical: "/cv" },
};

const disciplines = [
  ["Creator production", "Concepts, styling, presenting, filming, editing and campaign delivery for short-form platforms."],
  ["Community operations", "Creator support, challenge operations, payments, reporting, issue escalation and central-team communication."],
  ["Photography", "Travel, aerial, event and lifestyle capture, editing, curation and portfolio presentation."],
  ["Performance", "Registration, activation, parcel and freight reporting for creator-led affiliate partnerships."],
  ["Digital", "Next.js, Vercel, GitHub, Supabase and practical content/asset systems."],
] as const;

const selectedClients = ["Nike", "BOSS", "Moschino", "Superdry", "Lyle & Scott", "DAVIDOFF", "Whatnot", "Sketch.co / All Points East"];

export default function CvPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Background / CV</div>
            <h1>Archie<br />McNicol</h1>
          </div>
          <aside className={styles.heroMeta}>
            <div><span>Based</span><strong>{PUBLIC_PROFILE.location}</strong></div>
            <div><span>Focus</span><strong>Creator · Photography · Community · Digital</strong></div>
            <div><span>Contact</span><a href={`mailto:${PUBLIC_PROFILE.email}`}>{PUBLIC_PROFILE.email} ↗</a></div>
          </aside>
        </div>
      </section>

      <section className={styles.profileBand}>
        <div className="wrap">
          <span>Profile</span>
          <p>
            A creator and operator who has built public-facing content work alongside more than three
            years of creator-community experience. The portfolio now connects brand campaigns,
            photography, performance partnerships and digital builds rather than treating them as
            separate careers.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.cvSection}`}>
        <div className={styles.sectionLabel}>Experience</div>
        <div className={styles.timeline}>
          {EXPERIENCE.map((item, index) => (
            <Link className={styles.timelineRow} href={item.href} key={item.title}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.when}>{item.period}</div>
              <div className={styles.role}>
                <h2>{item.title}</h2>
                <strong>{item.role}</strong>
              </div>
              <div className={styles.detail}>
                <p>{item.summary}</p>
                <div className={styles.tags}>{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
              </div>
              <b className={styles.arrow}>↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.education}>
        <div className={`wrap ${styles.educationGrid}`}>
          <div>
            <div className={styles.sectionLabel}>Education</div>
            <div className={styles.educationDate}>{EDUCATION.period}</div>
          </div>
          <div>
            <h2>{EDUCATION.title}</h2>
            <div className={styles.subjects}>{EDUCATION.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div>
            <p>{EDUCATION.summary}</p>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.disciplines}`}>
        <div className={styles.sectionLabel}>Working areas</div>
        <div className={styles.disciplineList}>
          {disciplines.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.clientBand}>
        <div className="wrap">
          <div className={styles.sectionLabel}>Selected clients / partners</div>
          <div className={styles.clientNames}>{selectedClients.map((client) => <span key={client}>{client}</span>)}</div>
          <Link href="/creator">Open full brand-work archive →</Link>
        </div>
      </section>

      <section className={styles.links}>
        <div className="wrap">
          <a href={PUBLIC_PROFILE.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a>
          <a href={PUBLIC_PROFILE.tiktok} rel="noreferrer" target="_blank">TikTok ↗</a>
          <a href={PUBLIC_PROFILE.pexels} rel="noreferrer" target="_blank">Pexels ↗</a>
          <Link href="/contact">Contact ↗</Link>
        </div>
      </section>
    </main>
  );
}
