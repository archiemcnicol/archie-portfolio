import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyImageLightbox } from "@/components/case-study-image-lightbox";
import { buildBreadcrumbSchema, serialiseJsonLd } from "@/lib/structured-data";
import { CAPCUT_CREATOR_PERFORMANCE, CAPCUT_OPERATIONS, CREATOROPS_PERFORMANCE } from "@/lib/performance-data";
import styles from "./capcut.module.css";

export const metadata: Metadata = {
  title: "CapCut UK Creator Operations & Community — Archie McNicol",
  description:
    "Professional experience across CapCut UK creator operations, AI and generative-product support, issue escalation, reporting and an agentic AI workflow built for creator operations.",
  alternates: { canonical: "/professional/capcut" },
};

const responsibilities = [
  ["Creator relationships & outreach", `Established relationships across the CapCut UK creator community, including creators working with AI and generative tools; approximately ${CAPCUT_OPERATIONS.referredCreatorsDisplay} creators referred into the ecosystem overall.`],
  ["AI & generative support", "Gather context around generation failures, feature access and product issues, then feed findings back internally."],
  ["Creator AI Agent rollout", "Configured and supported a CapCut AI Agent rollout in the UK creator community, then provided qualitative feedback on real creator usage."],
  ["Challenge operations", "Participation questions, winner communication, template requirements and grading."],
  ["Creator ↔ internal-team liaison", "Move policy, programme, payment and product information clearly between UK creators and international internal teams."],
  ["Reporting", "Weekly workload, activity, bugs and operational follow-ups."],
  ["Creator support", "Questions, programme guidance, clarifications and follow-up for UK creators."],
  ["Bug escalation", "Turn creator-reported product issues into reproducible internal context."],
  ["Payments & bonuses", "Payment and bonus status, programme requirements and escalations."],
  ["Community moderation", "Discord moderation, announcements and day-to-day community upkeep."],
  ["Multi-market systems", "Experience across UK, French and German creator-server systems."],
] as const;

const creatorPerformance = [
  [CAPCUT_CREATOR_PERFORMANCE.viewsDisplay, "CapCut views"],
  [CAPCUT_CREATOR_PERFORMANCE.templateUsesDisplay, "Template uses"],
  [CAPCUT_CREATOR_PERFORMANCE.exportsDisplay, "Exports"],
  [CAPCUT_CREATOR_PERFORMANCE.tiktokViewsViaTemplatesDisplay, "TikTok views via templates"],
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
              <div><span>Role</span><strong>Freelance Community Manager / creator operations</strong></div>
              <div><span>Experience</span><strong>3+ years</strong></div>
              <div><span>Primary market</span><strong>United Kingdom</strong></div>
              <div><span>International internal teams</span><strong>Cross-market operations</strong></div>
              <div><span>AI / systems</span><strong>Generative support · CreatorOps workflow</strong></div>
            </div>
          </div>
        </section>

        <section className={`${styles.intro} capcut-intro`}>
          <div className="wrap">
            <span>Creator ↔ internal team</span>
            <p>I support UK creators across programmes, challenges, product issues and AI/generative features, turning questions and evidence into actionable internal context and bringing decisions back clearly.</p>
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

        <section className={`${styles.agentic} capcut-agentic`} id="creatorops">
          <div className="wrap">
            <div className={styles.agenticHead}>
              <div>
                <span className={styles.sectionLabel}>Operational extension / agentic AI</span>
                <h2>Turn conversation into structured operational memory.</h2>
              </div>
              <p>
                I independently designed and built CreatorOps to turn high-volume Discord support into persistent, searchable cases,
                evidence-linked history and clear next actions. It has indexed {CREATOROPS_PERFORMANCE.completedCasesDisplay} completed
                case records, including {CREATOROPS_PERFORMANCE.recordsHandledByMeDisplay} records of support handled by me; Discord
                ingestion is read-only and outbound actions remain human-approved.
              </p>
            </div>

            <div className={styles.creatorOpsScale} aria-label="CreatorOps operational scale">
              <div><strong>{CREATOROPS_PERFORMANCE.completedCasesDisplay}</strong><span>Completed case records indexed</span></div>
              <div><strong>{CREATOROPS_PERFORMANCE.recordsHandledByMeDisplay}</strong><span>Records of support handled by me</span></div>
            </div>

            <div className={styles.creatorOpsEvidence}>
              <figure className={styles.creatorOpsDashboard}>
                <CaseStudyImageLightbox
                  alt="CreatorOps operations dashboard showing active cases, follow-ups, 2,839 completed cases and 1,216 support records handled."
                  buttonClassName={styles.creatorOpsDashboardButton}
                  height={480}
                  imageClassName={styles.creatorOpsDashboardImage}
                  src="/site/creatorops-overview-public.png"
                  width={840}
                />
                <figcaption>CreatorOps dashboard snapshot — operational case tracking and evidence-backed creator support.</figcaption>
              </figure>

              <aside className={styles.creatorOpsContext} aria-label="What CreatorOps does">
                <span className={styles.sectionLabel}>Live system snapshot</span>
                <h3>What CreatorOps actually does.</h3>
                <p>
                  CreatorOps is a working operations layer I built around high-volume Discord support. Instead of leaving creator
                  questions, bugs and follow-ups scattered across long message histories, it turns them into persistent cases with
                  evidence, status and a clear next action.
                </p>
                <div className={styles.creatorOpsContextPoints}>
                  <div>
                    <strong>Why I built it</strong>
                    <p>Repeated issues and unresolved follow-ups were difficult to see across fast-moving support conversations. The system gives that work durable operational memory.</p>
                  </div>
                  <div>
                    <strong>How it works</strong>
                    <p>Approved Discord channels are ingested read-only. New reports are reconciled against case history, classified and linked to the evidence needed for review or escalation.</p>
                  </div>
                  <div>
                    <strong>Human control</strong>
                    <p>CreatorOps can prepare monitoring, escalation and response work, but it cannot autonomously message creators. Human review remains authoritative and outbound actions stay approval-gated.</p>
                  </div>
                </div>
                <small>The dashboard is a point-in-time snapshot; the surrounding 2,800+ and 1,200+ figures are deliberately rounded.</small>
              </aside>
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

            <div className={styles.workspaceAccess}>
              <a href="https://creator-ops-agent-p3hi9y7v7-archiemcnicol002-8423.vercel.app" rel="noreferrer" target="_blank">
                Operational workspace — restricted access ↗
              </a>
              <p>The workspace contains private creator-support data, so public access is restricted. This case study shows its architecture, controls and anonymised operational scale.</p>
            </div>

            <div className={styles.agenticStack} aria-label="CreatorOps AI workflow stack and capabilities">
              <span>Railway</span>
              <span>Supabase</span>
              <span>Vercel / Next.js</span>
              <span>GitHub</span>
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
              <div><span>03</span><strong>Route</strong><p>Send it to the right internal contact with the context needed to act.</p></div>
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
