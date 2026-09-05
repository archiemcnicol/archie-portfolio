import type { Metadata } from "next";
import Link from "next/link";
import styles from "./capcut.module.css";

export const metadata: Metadata = {
  title: "CapCut UK Community Management",
  description: "Detailed professional experience from more than three years supporting the CapCut UK creator community and creator-facing operations.",
  alternates: { canonical: "/professional/capcut" },
};

const responsibilities = [
  ["Creator support", "Front-line communication with creators: questions, programme guidance, clarifications, support follow-up and making central-team information understandable."],
  ["Community moderation", "Day-to-day Discord moderation, announcements and community upkeep so creator spaces stay useful rather than becoming passive noticeboards."],
  ["Challenge operations", "Supporting recurring creator challenges, participation questions, winner communication, template requirements, grading and changing programme structures."],
  ["Payments & bonuses", "Creator-facing payment and bonus administration, including status communication, checking programme requirements and escalating delayed or unclear runs."],
  ["Bug escalation", "Collecting creator-reported product problems, getting enough reproduction context to make them actionable and routing them to the relevant team for review."],
  ["Reporting", "Weekly workload and activity reporting, including quantified creator interactions, support themes, challenge work, bugs and operational follow-ups."],
  ["Multi-market systems", "Experience with community systems spanning UK, French and German creator servers, while the main creator-facing responsibility remains the UK community."],
  ["Team liaison", "Acting as a bridge between UK creators and central teams so policy, programme, payment and product information moves in both directions clearly."],
] as const;

export default function CapCutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Professional / CapCut UK</div>
            <h1>Community is an operations job.</h1>
          </div>
          <div className={styles.heroMeta}>
            <div><span>Role</span><strong>Community Manager / creator operations</strong></div>
            <div><span>Experience</span><strong>3+ years</strong></div>
            <div><span>Primary market</span><strong>United Kingdom</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="wrap">
          <span>What sits behind the title</span>
          <p>
            The role is creator-facing, but the useful work happens between people and systems:
            understanding the creator problem, translating it into something the central team can
            act on, then closing the loop without leaving the creator guessing.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.responsibilities}`}>
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

      <section className={styles.workflow}>
        <div className="wrap">
          <div className={styles.sectionLabel}>Typical operating loop</div>
          <div className={styles.steps}>
            <div><span>01</span><strong>Listen</strong><p>Creator question, payment issue, challenge query or product problem arrives.</p></div>
            <div><span>02</span><strong>Clarify</strong><p>Get enough context to separate a one-off question from something that needs escalation.</p></div>
            <div><span>03</span><strong>Route</strong><p>Pass the issue or information to the right central contact, keeping the creator side understandable.</p></div>
            <div><span>04</span><strong>Close</strong><p>Return with the update, log the workload and carry forward anything still unresolved.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.links}>
        <div className="wrap">
          <Link href="/professional">← Professional index</Link>
          <Link href="/cv">Full CV / timeline ↗</Link>
          <Link href="/contact">Professional enquiry ↗</Link>
        </div>
      </section>
    </main>
  );
}
