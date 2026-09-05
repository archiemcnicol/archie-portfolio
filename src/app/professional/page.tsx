import type { Metadata } from "next";
import Link from "next/link";
import styles from "./professional.module.css";

export const metadata: Metadata = {
  title: "Professional Experience",
  description: "Professional experience of Archie McNicol across creator community management, content production, performance partnerships, photography and digital work.",
  alternates: { canonical: "/professional" },
};

const roles = [
  ["01", "CapCut UK", "2023 — present", "Creator community management, challenge operations, payments, reporting, moderation and issue escalation.", "/professional/capcut"],
  ["02", "Content creator", "2024 — present", "@fitswitharchie, campaign production, client delivery and a 25K+ fashion and lifestyle community.", "/creator"],
  ["03", "Performance partnerships", "2024 — 2026", "Affiliate work tracked beyond reach into registration, activation, parcel and freight behaviour.", "/affiliate"],
  ["04", "Photography", "2018 — present", "Photography developed from an early creative interest around 2018 into travel, aerial, event and lifestyle work across a 600+ image public archive.", "/photography"],
  ["05", "Digital projects", "2026 — present", "Web builds, portfolio systems, analytics workflows and content infrastructure.", "/business"],
  ["06", "Full background", "CV / timeline", "Education, chronology, independent projects, working areas and the connections between each part of the portfolio.", "/cv"],
] as const;

export default function ProfessionalPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Professional / experience</div>
            <h1>Work that sits behind the work.</h1>
          </div>
          <p>
            Creator-facing operations, content production and commercial projects built alongside
            the public portfolio. Open each area for the fuller version.
          </p>
        </div>
      </section>

      <section className={styles.roleIndex}>
        <div className="wrap">
          <div className={styles.indexHead}><span>Experience index</span><span>Open a chapter</span></div>
          <div className={styles.roles}>
            {roles.map(([number, title, period, copy, href]) => (
              <Link href={href} className={styles.role} key={href}>
                <span>{number}</span>
                <div><strong>{title}</strong><small>{period}</small></div>
                <p>{copy}</p>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bridge}>
        <div className="wrap">
          <span>How it connects</span>
          <p>
            Photography built the visual foundation; community management built the operational side;
            creator work built the audience and client side; affiliate work added performance
            measurement; digital work connected the systems around it. The point is the combination,
            not a set of unrelated job titles.
          </p>
          <Link href="/cv">View the complete timeline →</Link>
        </div>
      </section>
    </main>
  );
}
