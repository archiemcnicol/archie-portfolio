import type { Metadata } from "next";
import Link from "next/link";
import { BACKGROUND_MILESTONES, EDUCATION, EXPERIENCE, TOOLKIT } from "@/lib/profile-data";
import { PUBLIC_PROFILE } from "@/lib/site";
import styles from "./cv.module.css";

export const metadata: Metadata = {
  title: "Background & CV",
  description: "CV-style background and experience timeline for Archie McNicol across content creation, community management, photography, affiliate work and digital projects.",
  alternates: { canonical: "/cv" },
};

const disciplines = [
  ["Creator production", "Concepts, styling, presenting, filming, editing and campaign delivery for TikTok and Instagram."],
  ["Community operations", "Creator support, moderation, challenge operations, payments, reporting, issue escalation and central-team communication."],
  ["Photography", "Travel, aerial, event and lifestyle capture, editing, curation and portfolio presentation, developed from an interest that began around 2018."],
  ["Performance", "Registration, activation, parcel and freight reporting for creator-led affiliate and commerce partnerships."],
  ["Digital", "Web builds, asset systems, analytics workflows and practical publishing infrastructure."],
] as const;

const selectedClients = [
  "Nike",
  "BOSS",
  "Moschino",
  "Superdry",
  "Lyle & Scott",
  "DAVIDOFF",
  "Jean Paul Gaultier",
  "Whatnot",
  "Sketch.co / All Points East",
];

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
            <div><span>Focus</span><strong>Creator · Community · Photography · Digital</strong></div>
            <div><span>Contact</span><a href={`mailto:${PUBLIC_PROFILE.email}`}>{PUBLIC_PROFILE.email} ↗</a></div>
          </aside>
        </div>
      </section>

      <section className={styles.profileBand}>
        <div className="wrap">
          <span>Profile</span>
          <p>
            A creator, community manager and photographer whose work developed across several lanes
            rather than one traditional career path. Photography started first, around 2018; creator
            community operations, short-form content, performance partnerships and digital projects
            were then built around the same mix of creativity, audience understanding and practical delivery.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.backgroundSection}`}>
        <div className={styles.sectionLabel}>Background / chronology</div>
        <div className={styles.backgroundTimeline}>
          {BACKGROUND_MILESTONES.map((item, index) => (
            <article key={`${item.period}-${item.title}`}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.when}>{item.period}</div>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.cvSection}`}>
        <div className={styles.sectionLabel}>Current / recent experience</div>
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

      <section className={styles.toolkitSection}>
        <div className="wrap">
          <div className={styles.sectionLabel}>Toolkit / practical experience</div>
          <div className={styles.toolkitGrid}>
            {TOOLKIT.map((group, index) => (
              <article key={group.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <div>{group.items.map((item) => <small key={item}>{item}</small>)}</div>
              </article>
            ))}
          </div>
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
