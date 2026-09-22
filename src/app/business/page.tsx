import type { Metadata } from "next";
import Link from "next/link";
import styles from "./business.module.css";

export const metadata: Metadata = {
  title: "AI & Digital — Archie McNicol",
  description: "AI and digital systems work by Archie McNicol, led by the CreatorOps agentic AI workflow and portfolio web systems.",
  alternates: { canonical: "/business" },
};

const services = [
  ["01", "CreatorOps", "Operational agentic AI for creator support, case management, evidence and reporting.", "/professional/capcut#creatorops", "Case study"],
  ["02", "Portfolio website", "Next.js portfolio, structured content systems and deployment workflows.", "/business/web", "Case study"],
  ["03", "Performance systems", "Registrations, verified activations, parcels and freight tracked beyond reach.", "/affiliate", "Measure"],
  ["04", "Short-form content", "Concept, filming, edit and delivery for TikTok and Reels.", "/creator", "Create"],
  ["05", "Photography", "Lifestyle, fashion, travel and event work for web and social.", "/photography", "Shoot"],
] as const;

export default function BusinessPage() {
  return (
    <main className={`${styles.page} digital-page`}>
      <section className={`${styles.hero} digital-hero`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>AI &amp; Digital / systems</div><h1>Build the system around the work.</h1></div>
          <div className={styles.heroSide}>
            <p>CreatorOps, web systems and digital projects built around practical creator and content workflows.</p>
            <Link href="/contact">Discuss a project →</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.serviceSection} digital-services`}>
        <div className="wrap">
          <div className={styles.serviceHead}><span>Case studies / capabilities</span></div>
          <div className={styles.services}>
            {services.map(([number, title, copy, href, verb]) => (
              <Link href={href} className={styles.service} key={href}>
                <span>{number}</span>
                <strong>{verb}</strong>
                <h2>{title}</h2>
                <p>{copy}</p>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
