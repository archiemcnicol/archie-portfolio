import type { Metadata } from "next";
import Link from "next/link";
import styles from "./business.module.css";

export const metadata: Metadata = {
  title: "Business & Commercial Work — Archie McNicol",
  description: "Commercial web, photography, content and digital systems work by Archie McNicol.",
  alternates: { canonical: "/business" },
};

const services = [
  ["01", "Web & landing pages", "Responsive sites, portfolios and campaign pages.", "/business/web", "Build"],
  ["02", "Commercial photography", "People, products, spaces and events for web and social.", "/photography", "Shoot"],
  ["03", "Short-form content", "Concept, filming, edit and delivery for TikTok and Reels.", "/creator", "Create"],
  ["04", "Performance systems", "Sign-ups, parcels and freight tracked beyond reach.", "/affiliate", "Measure"],
  ["05", "Creator operations", "Creator support, reporting and community operations.", "/professional", "Operate"],
] as const;

export default function BusinessPage() {
  return (
    <main className={`${styles.page} digital-page`}>
      <section className={`${styles.hero} digital-hero`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>Business / commercial</div><h1>Useful creative, built to work.</h1></div>
          <div className={styles.heroSide}>
            <p>Web, photography, content and creator operations for commercial projects.</p>
            <Link href="/contact">Discuss a project →</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.serviceSection} digital-services`}>
        <div className="wrap">
          <div className={styles.serviceHead}><span>Capabilities</span></div>
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
