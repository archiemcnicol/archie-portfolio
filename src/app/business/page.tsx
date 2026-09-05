import type { Metadata } from "next";
import Link from "next/link";
import styles from "./business.module.css";

export const metadata: Metadata = {
  title: "Business & Commercial Work",
  description: "Commercial web, photography, content and digital systems work by Archie McNicol.",
  alternates: { canonical: "/business" },
};

const services = [
  ["01", "Web & landing pages", "Responsive sites, portfolio systems and campaign pages built around clear information and practical publishing.", "/business/web", "Build"],
  ["02", "Commercial photography", "People, products, spaces, hospitality and events captured for websites, launches and ongoing social use.", "/photography", "Shoot"],
  ["03", "Short-form content", "Creator-native social content from concept and filming through edit, revisions and delivery.", "/creator", "Create"],
  ["04", "Performance systems", "Campaign thinking that follows the user beyond reach into registrations, activations and downstream behaviour.", "/affiliate", "Measure"],
  ["05", "Creator operations", "Community, reporting and creator-support experience for projects that need an operational layer as well as creative output.", "/professional", "Operate"],
] as const;

export default function BusinessPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>Business / commercial</div><h1>Useful creative, not disconnected deliverables.</h1></div>
          <div className={styles.heroSide}>
            <p>For projects that need more than one discipline: web, photography, content, measurement or the systems around them.</p>
            <Link href="/contact">Discuss a project →</Link>
          </div>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="wrap">
          <div className={styles.serviceHead}><span>Capabilities</span><p>Each line opens into the most relevant work, case study or specialist page.</p></div>
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

      <section className={styles.mix}>
        <div className="wrap">
          <span>Why the mix matters</span>
          <p>
            A website is stronger when the imagery was made for it. A campaign is easier to improve
            when the reporting is understood. A creator project is easier to run when the operations
            behind it are organised. The commercial offer is the overlap.
          </p>
        </div>
      </section>
    </main>
  );
}
