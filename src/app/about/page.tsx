import type { Metadata } from "next";
import Link from "next/link";
import {
  BACKGROUND_MILESTONES,
  EDUCATION,
  EXPERIENCE,
  PROFILE_STATS,
  SELECTED_CLIENTS,
  TOOLKIT,
} from "@/lib/profile-data";
import { PUBLIC_PROFILE } from "@/lib/site";
import styles from "./about.module.css";
import cvStyles from "../cv/cv.module.css";
import refresh from "./about-refresh.module.css";

export const metadata: Metadata = {
  title: "About — Archie McNicol",
  description:
    "About Archie McNicol — background, experience, education and creative work across content, community management, photography, performance and digital projects.",
  alternates: { canonical: "/about" },
};

const chapters = [
  ["01", "Creator work", "Campaigns, collaborations and results.", "/creator"],
  ["02", "Professional", "Creator operations and UK ↔ Shanghai communication.", "/professional"],
  ["03", "Performance", "Registrations, parcels and freight.", "/affiliate"],
  ["04", "Photography", "Projects and full archive.", "/photography"],
  ["05", "Digital", "Web builds and content systems.", "/business"],
] as const;

type AboutTimelineItem = {
  period: string;
  title: string;
  role: string;
  summary: string;
  href?: string;
  highlights?: readonly string[];
};

function experience(title: string): AboutTimelineItem {
  const item = EXPERIENCE.find((entry) => entry.title === title);
  if (!item) throw new Error(`Missing About experience item: ${title}`);
  return item;
}

function milestone(title: string, role: string, highlights: readonly string[]): AboutTimelineItem {
  const item = BACKGROUND_MILESTONES.find((entry) => entry.title === title);
  if (!item) throw new Error(`Missing About milestone: ${title}`);
  return {
    period: item.period,
    title: item.title,
    role,
    summary: item.copy,
    highlights,
  };
}

const ABOUT_TIMELINE: AboutTimelineItem[] = [
  experience("Photography"),
  milestone("Fashion / e-commerce", "Independent fashion project", ["Branding", "E-commerce", "Customer communication"]),
  experience("CapCut UK"),
  experience("@fitswitharchie"),
  experience("Performance partnerships"),
  milestone("Full-time creative focus", "Post A-level transition", ["Creator work", "Photography", "Community", "Digital"]),
  experience("Digital projects"),
];

export default function AboutPage() {
  return (
    <main className={`${styles.page} about-page`}>
      <section className={`${styles.hero} about-hero`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>About / Archie McNicol</div>
            <h1>The full picture, in one place.</h1>
          </div>
          <div className={styles.heroSide}>
            <p>UK creator, photographer and community manager working across campaigns, creator operations and digital projects.</p>
            <a className={styles.inlineLink} href="#background">Background &amp; experience ↓</a>
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

      <div className={refresh.background} id="background">
        <section className={`wrap ${cvStyles.cvSection} about-experience-section ${refresh.mergedTimeline}`}>
          <div className={cvStyles.sectionLabel}>Background / experience</div>
          <div className={cvStyles.timeline}>
            {ABOUT_TIMELINE.map((item, index) => {
              const content = (
                <>
                  <span className={cvStyles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <div className={cvStyles.when}>{item.period}</div>
                  <div className={cvStyles.role}>
                    <h2>{item.title}</h2>
                    <strong>{item.role}</strong>
                  </div>
                  <div className={cvStyles.detail}>
                    <p>{item.summary}</p>
                    {item.highlights?.length ? (
                      <div className={cvStyles.tags}>
                        {item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                      </div>
                    ) : null}
                    {item.title === "@fitswitharchie" ? (
                      <div className={refresh.partnerLine}>
                        <span>Selected clients / partners</span>
                        <div className={refresh.partnerNames}>
                          {SELECTED_CLIENTS.map((client) => <span key={client}>{client}</span>)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {item.href ? <b className={cvStyles.arrow}>↗</b> : <span className={refresh.timelineMarker} aria-hidden="true">—</span>}
                </>
              );

              return item.href ? (
                <Link className={cvStyles.timelineRow} href={item.href} key={`${item.period}-${item.title}`}>
                  {content}
                </Link>
              ) : (
                <article className={`${cvStyles.timelineRow} ${refresh.timelineStatic}`} key={`${item.period}-${item.title}`}>
                  {content}
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <section className={`${cvStyles.education} about-education`}>
        <div className={`wrap ${cvStyles.educationGrid}`}>
          <div>
            <div className={cvStyles.sectionLabel}>Education</div>
            <div className={cvStyles.educationDate}>{EDUCATION.period}</div>
          </div>
          <div>
            <h2>{EDUCATION.title}</h2>
            <div className={cvStyles.subjects}>
              {EDUCATION.subjects.map((subject) => <span key={subject}>{subject}</span>)}
            </div>
            <p>{EDUCATION.summary}</p>
          </div>
        </div>
      </section>

      <section className={`${cvStyles.toolkitSection} about-toolkit`}>
        <div className="wrap">
          <div className={cvStyles.sectionLabel}>Toolkit / practical experience</div>
          <div className={cvStyles.toolkitGrid}>
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

      <section className={`${styles.chapters} about-chapters`}>
        <div className="wrap">
          <div className={styles.chapterHeading}><span>Explore the work</span></div>
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

      <section className={refresh.socialSection}>
        <div className={`wrap ${refresh.socialGrid}`}>
          <a href={PUBLIC_PROFILE.instagram} rel="noreferrer" target="_blank">Instagram ↗</a>
          <a href={PUBLIC_PROFILE.tiktok} rel="noreferrer" target="_blank">TikTok ↗</a>
          <a href={PUBLIC_PROFILE.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a>
          <a href={PUBLIC_PROFILE.pexels} rel="noreferrer" target="_blank">Pexels ↗</a>
          <Link href="/contact">Contact ↗</Link>
        </div>
      </section>
    </main>
  );
}
