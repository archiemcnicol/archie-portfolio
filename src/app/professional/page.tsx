import type { Metadata } from "next";
import Link from "next/link";
import styles from "./professional.module.css";

export const metadata: Metadata = {
  title: "Professional Experience — Archie McNicol",
  description:
    "Professional operating experience from Archie McNicol, centred on creator-community management, cross-border communication and creator operations between the UK and Shanghai, China.",
  alternates: { canonical: "/professional" },
};

const operatingAreas = [
  {
    label: "Creator communication",
    title: "Make updates usable.",
    copy: "Questions, programme guidance, payment updates and policy changes.",
  },
  {
    label: "Programme operations",
    title: "Keep programmes moving.",
    copy: "Challenges, participation rules, winners and payment processes.",
  },
  {
    label: "Issue routing",
    title: "Escalate with context.",
    copy: "Turn bugs and creator issues into clear internal context.",
  },
  {
    label: "Reporting & follow-through",
    title: "Close the loop.",
    copy: "Weekly reporting, handovers and unresolved follow-ups.",
  },
] as const;

export default function ProfessionalPage() {
  return (
    <main className={`${styles.page} professional-page`}>
      <section className={`${styles.hero} professional-hero`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Professional / operating experience</div>
            <h1>People on one side. Systems on the other.</h1>
          </div>
          <div className={styles.heroSide}>
            <p>Creator operations between UK communities and internal teams, with clear handovers and follow-through.</p>
            <Link href="/about#background">Full chronology →</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.caseStudy} professional-case-study`}>
        <div className={`wrap ${styles.caseGrid}`}>
          <div className={styles.caseLead}>
            <span>Primary case study</span>
            <strong>CapCut UK</strong>
            <small>2023 — present</small>
          </div>

          <div className={styles.caseBody}>
            <div className={styles.caseMeta}>
              <div><span>Role</span><strong>Community manager / creator operations</strong></div>
              <div><span>Experience</span><strong>3+ years</strong></div>
              <div><span>Market</span><strong>United Kingdom</strong></div>
              <div><span>Internal team</span><strong>Shanghai, China</strong></div>
            </div>

            <p>
              I manage the creator-facing layer between the UK community and the internal team in Shanghai across support,
              challenges, payments, reporting and issue escalation.
            </p>

            <Link className={styles.caseLink} href="/professional/capcut">Open the CapCut case study ↗</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.operating} professional-operating`}>
        <div className="wrap">
          <div className={styles.sectionHead}><span>Repeated responsibilities</span></div>
          <div className={styles.operatingGrid}>
            {operatingAreas.map((area) => (
              <article key={area.label}>
                <span>{area.label}</span>
                <h2>{area.title}</h2>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.bridge} professional-bridge`}>
        <div className={`wrap ${styles.bridgeInner}`}>
          <div className={styles.bridgeLabel}>Cross-border communication</div>
          <div className={styles.flow} aria-label="UK to Shanghai communication flow">
            <div><span>01</span><strong>UK creators</strong><small>Questions · feedback · issues</small></div>
            <b>→</b>
            <div><span>02</span><strong>Clarify & route</strong><small>Context · priority · ownership</small></div>
            <b>→</b>
            <div><span>03</span><strong>Shanghai internal team</strong><small>Review · decision · action</small></div>
            <b>→</b>
            <div><span>04</span><strong>Close the loop</strong><small>Creator update · follow-through</small></div>
          </div>
          <p>I add the context each side needs before the message moves.</p>
        </div>
      </section>

      <section className={styles.next}>
        <div className="wrap">
          <span>Continue elsewhere</span>
          <div className={styles.nextLinks}>
            <Link href="/about#background"><strong>About</strong><small>Chronology & education</small><b>↗</b></Link>
            <Link href="/creator"><strong>Brand work</strong><small>Campaigns & content</small><b>↗</b></Link>
            <Link href="/affiliate"><strong>Performance</strong><small>Commerce outcomes</small><b>↗</b></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
