import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, serialiseJsonLd } from "@/lib/structured-data";
import styles from "./capcut.module.css";

export const metadata: Metadata = {
  title: "CapCut UK Community Management — Archie McNicol",
  description:
    "Professional experience across CapCut UK creator operations, AI and generative-product support, issue escalation, reporting and an agentic AI workflow built for creator operations.",
  alternates: { canonical: "/professional/capcut" },
};

const responsibilities = [
  ["Creator support", "Questions, programme guidance, clarifications and follow-up for UK creators."],
  ["Community moderation", "Discord moderation, announcements and day-to-day community upkeep."],
  ["Challenge operations", "Participation questions, winner communication, template requirements and grading."],
  ["Payments & bonuses", "Payment and bonus status, programme requirements and escalations."],
  ["Bug escalation", "Turn creator-reported product issues into reproducible internal context."],
  ["AI & generative support", "Gather context around generation failures, feature access and product issues, then feed findings back internally."],
  ["Creator AI Agent rollout", "Configured and supported a CapCut AI Agent rollout in the UK creator community, then provided qualitative feedback on real creator usage."],
  ["Reporting", "Weekly workload, activity, bugs and operational follow-ups."],
  ["Multi-market systems", "Experience across UK, French and German creator-server systems."],
  ["UK ↔ Shanghai liaison", "Move policy, programme, payment and product information clearly between UK creators and the Shanghai internal team."],
] as const;

const creatorPerformance = [
  ["15.5M+", "CapCut views"],
  ["1.97M", "Template uses"],
  ["1.16M", "Exports"],
  ["150M+", "TikTok views via templates"],
] as const;

const agenticSteps = [
  ["01", "Ingest", "Read-only Discord activity enters the workflow without giving the system outbound control."],
  ["02", "Resolve", "Creator conversations are extracted into cases, reconciled against history and checked for duplicates or recurrence."],
  ["03", "Decide", "Issue type, priority, status and next action are classified while relevant knowledge and similar cases are retrieved."],
  ["04", "Govern", "The system can prepare monitoring, escalation or response work, but human review stays authoritative and outbound actions remain approval-gated."],
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
              <div><span>AI / systems</span><strong>Generative support · CreatorOps workflow</strong></div>
            </div>
          </div>
        </section>

        <section className={`${styles.intro} capcut-intro`}>
          <div className="wrap">
            <span>UK ↔ Shanghai</span>
            <p>I turn creator questions and issues into actionable internal context, then bring decisions back clearly.</p>
          </div>
        </section>

        <section className={`${styles.performance} capcut-performance`}>
          <div className="wrap">
            <div className={styles.performanceHead}>
              <span className={styles.sectionLabel}>Creator-side perspective</span>
              <p>
                I also work from inside the creator experience itself. That gives the operational role a direct view of the workflows,
                creative decisions and product behaviours that affect adoption and continued participation.
              </p>
            </div>
            <div className={styles.performanceGrid}>
              {creatorPerformance.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
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

        <section className={`${styles.agentic} capcut-agentic`}>
          <div className="wrap">
            <div className={styles.agenticHead}>
              <div>
                <span className={styles.sectionLabel}>Operational extension / agentic AI</span>
                <h2>Turn conversation into structured operational memory.</h2>
              </div>
              <p>
                Alongside the day-to-day creator role, I designed and built a fully operational, tool-using CreatorOps AI system.
                It converts high-volume creator conversations into searchable cases, evidence-linked history and clear next actions
                without handing decision authority to the model.
              </p>
            </div>

            <div className={styles.agenticSteps}>
              {agenticSteps.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </article>
              ))}
            </div>

            <div className={styles.agenticStack} aria-label="CreatorOps AI workflow stack and capabilities">
              <span>Railway</span>
              <span>Supabase</span>
              <span>Vercel</span>
              <span>Persistent case history</span>
              <span>Evidence-linked records</span>
              <span>Knowledge retrieval</span>
              <span>Autonomous QA</span>
              <span>Weekly reporting</span>
            </div>
          </div>
        </section>

        <section className={`${styles.workflow} capcut-workflow`}>
          <div className="wrap">
            <div className={styles.sectionLabel}>Human operating loop</div>
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
