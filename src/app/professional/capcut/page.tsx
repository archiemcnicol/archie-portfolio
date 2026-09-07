import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, serialiseJsonLd } from "@/lib/structured-data";
import styles from "./capcut.module.css";

export const metadata: Metadata = {
  title: "CapCut UK Community Management — Archie McNicol",
  description: "Detailed professional experience from more than three years supporting the CapCut UK creator community and coordinating with the internal team in Shanghai, China.",
  alternates: { canonical: "/professional/capcut" },
};

const responsibilities = [
  ["Creator support", "Questions, programme guidance, clarifications and follow-up for UK creators."],
  ["Community moderation", "Discord moderation, announcements and day-to-day community upkeep."],
  ["Challenge operations", "Participation questions, winner communication, template requirements and grading."],
  ["Payments & bonuses", "Payment and bonus status, programme requirements and escalations."],
  ["Bug escalation", "Turn creator-reported product issues into reproducible internal context."],
  ["Reporting", "Weekly workload, activity, bugs and operational follow-ups."],
  ["Multi-market systems", "Experience across UK, French and German creator-server systems."],
  ["UK ↔ Shanghai liaison", "Move policy, programme, payment and product information clearly between UK creators and the Shanghai internal team."],
] as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Professional Experience", path: "/professional" },
  { name: "CapCut UK Community Management", path: "/professional/capcut" },
]);

export default function CapCutPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbSchema) }}
        type="application/ld+json"
      />
      <main className={`${styles.page} capcut-page`}>
        <section className={`${styles.hero} capcut-hero`}>
          <div className={`wrap ${styles.heroGrid}`}>
            <div>
              <div className={styles.kicker}>Professional / CapCut UK</div>
              <h1>Community is an operations job.</h1>
            </div>
            <div className={styles.heroMeta}>
              <div><span>Role</span><strong>Community Manager / creator operations</strong></div>
              <div><span>Experience</span><strong>3+ years</strong></div>
              <div><span>Primary market</span><strong>United Kingdom</strong></div>
              <div><span>Internal team</span><strong>Shanghai, China</strong></div>
            </div>
          </div>
        </section>

        <section className={`${styles.intro} capcut-intro`}>
          <div className="wrap">
            <span>UK ↔ Shanghai</span>
            <p>I turn creator questions and issues into actionable internal context, then bring decisions back clearly.</p>
          </div>
        </section>

        <section className={`wrap ${styles.responsibilities} capcut-responsibilities`}>
          <div className={styles.sectionLabel}>Core responsibilities</div>
          <div className={styles.responsibilityList}>
            {responsibilities.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.workflow} capcut-workflow`}>
          <div className="wrap">
            <div className={styles.sectionLabel}>Operating loop</div>
            <div className={styles.steps}>
              <div><span>01</span><strong>Listen</strong><p>Question, payment issue, challenge query or product problem.</p></div>
              <div><span>02</span><strong>Clarify</strong><p>Get enough context to decide whether it needs escalation.</p></div>
              <div><span>03</span><strong>Route</strong><p>Send it to the right internal contact in Shanghai.</p></div>
              <div><span>04</span><strong>Close</strong><p>Return the update, log the work and carry forward anything unresolved.</p></div>
            </div>
          </div>
        </section>

        <section className={styles.links}>
          <div className="wrap">
            <Link href="/professional">← Professional</Link>
            <Link href="/about#background">Full background ↗</Link>
            <Link href="/contact">Professional enquiry ↗</Link>
          </div>
        </section>
      </main>
    </>
  );
}
