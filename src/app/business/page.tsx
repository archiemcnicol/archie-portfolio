import type { Metadata } from "next";
import Link from "next/link";
import { CREATOROPS_PERFORMANCE } from "@/lib/performance-data";
import styles from "./business.module.css";

export const metadata: Metadata = {
  title: "AI & Digital — Archie McNicol",
  description:
    "AI and digital systems built by Archie McNicol, focused on CreatorOps and the portfolio platform behind this website.",
  alternates: { canonical: "/business" },
};

const creatorOpsFlow = ["Discord", "Cases", "Evidence", "Human review"] as const;
const portfolioFlow = ["Content", "Structured data", "Build", "Deploy"] as const;

const creatorOpsStack = [
  "Railway",
  "Supabase",
  "Vercel / Next.js",
  "GitHub",
  "Knowledge retrieval",
  "Evidence-linked records",
] as const;

const portfolioStack = [
  "Next.js",
  "React",
  "Vercel",
  "Supabase",
  "Cloudinary",
  "Structured content",
] as const;

export default function BusinessPage() {
  return (
    <main className={`${styles.page} digital-page`}>
      <section className={`${styles.hero} digital-hero`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>AI &amp; Digital / built systems</div>
            <h1>AI &amp; Digital.</h1>
          </div>

          <div className={styles.heroSide}>
            <p>
              Systems I have designed and built around real work: CreatorOps for creator-support operations, and this portfolio for
              structured content, publishing and deployment.
            </p>
            <div className={styles.heroIndex} aria-label="AI and digital case studies">
              <span><b>01</b> CreatorOps</span>
              <span><b>02</b> Portfolio platform</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className="wrap">
          <span>Build what the work is missing</span>
          <p>Practical problems turned into working systems I can use, test and keep improving.</p>
        </div>
      </section>

      <section className={styles.creatorOps} aria-labelledby="creatorops-title">
        <div className="wrap">
          <div className={styles.caseHeader}>
            <div>
              <span className={styles.caseNumber}>01 / Operational AI</span>
              <h2 id="creatorops-title">CreatorOps.</h2>
            </div>
            <p>
              A working operations layer for high-volume creator support. CreatorOps turns long Discord conversations into persistent,
              searchable cases with evidence, status and clear next actions while keeping human review in control.
            </p>
          </div>

          <div className={styles.creatorOpsProof}>
            <div>
              <strong>{CREATOROPS_PERFORMANCE.completedCasesDisplay}</strong>
              <span>Completed case records indexed</span>
            </div>
            <div>
              <strong>{CREATOROPS_PERFORMANCE.recordsHandledByMeDisplay}</strong>
              <span>Records of support handled by me</span>
            </div>
            <div className={styles.proofStatement}>
              <span>Operating principle</span>
              <p>Read-only ingestion. Evidence-backed history. Human-approved outbound actions.</p>
            </div>
          </div>

          <div className={styles.systemGrid}>
            <div className={styles.systemDiagram} aria-label="CreatorOps workflow">
              <span className={styles.diagramLabel}>Operational flow</span>
              <div className={styles.flow}>
                {creatorOpsFlow.map((item, index) => (
                  <div className={styles.flowItem} key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                    {index < creatorOpsFlow.length - 1 ? <i aria-hidden="true">→</i> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.caseNotes}>
              <div>
                <span>Problem</span>
                <p>Important creator issues can disappear inside fast-moving support conversations and repeated questions.</p>
              </div>
              <div>
                <span>System</span>
                <p>CreatorOps reconciles new reports against history, links the underlying evidence and keeps a durable case record.</p>
              </div>
              <div>
                <span>Control</span>
                <p>The system can prepare monitoring, escalation and response work, but people remain authoritative at the decision point.</p>
              </div>
            </div>
          </div>

          <div className={styles.caseFooter}>
            <div className={styles.stack} aria-label="CreatorOps stack">
              {creatorOpsStack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <Link href="/professional/capcut#creatorops">View full CreatorOps case study ↗</Link>
          </div>
        </div>
      </section>

      <section className={styles.portfolio} aria-labelledby="portfolio-title">
        <div className="wrap">
          <div className={styles.caseHeader}>
            <div>
              <span className={styles.caseNumber}>02 / Web platform</span>
              <h2 id="portfolio-title">This portfolio.</h2>
            </div>
            <p>
              More than a set of pages. The site is a structured publishing system for professional experience, creator work,
              performance data and a large photography archive, with deployment and recovery workflows built around it.
            </p>
          </div>

          <div className={styles.portfolioBody}>
            <div className={styles.browserFrame} aria-hidden="true">
              <div className={styles.browserBar}>
                <span />
                <span />
                <span />
                <b>archiemcnicol.com</b>
              </div>
              <div className={styles.browserCanvas}>
                <div className={styles.browserTitle}>ARCHIE<br />MCNICOL.</div>
                <div className={styles.browserRail}>
                  <span>25K+</span>
                  <span>27.9M+</span>
                  <span>3+ yrs</span>
                </div>
                <div className={styles.browserBlocks}>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <div className={styles.portfolioDetails}>
              <div className={styles.detailIntro}>
                <span>What the system handles</span>
                <p>
                  Content is separated from presentation so projects, campaign evidence, professional case studies and photography can
                  stay maintainable instead of being hard-coded as one-off pages.
                </p>
              </div>

              <div className={styles.flowLight} aria-label="Portfolio publishing workflow">
                {portfolioFlow.map((item, index) => (
                  <div className={styles.flowLightItem} key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                    {index < portfolioFlow.length - 1 ? <i aria-hidden="true">→</i> : null}
                  </div>
                ))}
              </div>

              <div className={styles.webProof}>
                <div><strong>616</strong><span>Images in the public photography archive</span></div>
                <div><strong>Live</strong><span>Production deployment with release checks</span></div>
              </div>
            </div>
          </div>

          <div className={styles.caseFooterLight}>
            <div className={styles.stackLight} aria-label="Portfolio website stack">
              {portfolioStack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <Link href="/business/web">View portfolio build case study ↗</Link>
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div className={`wrap ${styles.closeGrid}`}>
          <span>AI &amp; Digital</span>
          <p>The common thread is simple: identify the repeated friction, structure it, then build something useful enough to become part of the workflow.</p>
          <Link href="/contact">Discuss a project ↗</Link>
        </div>
      </section>
    </main>
  );
}
