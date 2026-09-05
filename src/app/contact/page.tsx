import type { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_PROFILE } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Archie McNicol for creator campaigns, photography, commercial projects and professional opportunities.",
  alternates: { canonical: "/contact" },
};

const routes = [
  ["Brand campaign", "Creator campaigns, events, product integrations and short-form work.", "/creator"],
  ["Photography", "Travel, event, lifestyle and commercial photography.", "/photography"],
  ["Commercial / web", "Sites, digital projects and mixed creative briefs.", "/business"],
  ["Professional", "Community-management, creator-operations and wider role enquiries.", "/professional"],
] as const;

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>Contact / Buckinghamshire, UK</div><h1>Start with the right conversation.</h1></div>
          <p>Creator campaigns, photography, commercial projects and professional opportunities across the UK and remotely.</p>
        </div>
      </section>

      <section className={styles.emailBand}>
        <div className="wrap">
          <span>Email</span>
          <a href={`mailto:${PUBLIC_PROFILE.email}`}>{PUBLIC_PROFILE.email}<b>↗</b></a>
        </div>
      </section>

      <section className={styles.routes}>
        <div className="wrap">
          <div className={styles.routeHead}><span>Choose the relevant work</span><p>Useful context before getting in touch.</p></div>
          <div className={styles.routeList}>
            {routes.map(([title, copy, href], index) => (
              <Link href={href} key={href} className={styles.route}>
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{copy}</p><b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.socials}>
        <div className="wrap">
          <a href={PUBLIC_PROFILE.tiktok} rel="noreferrer" target="_blank">TikTok / @fitswitharchie ↗</a>
          <a href={PUBLIC_PROFILE.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a>
          <a href={PUBLIC_PROFILE.pexels} rel="noreferrer" target="_blank">Pexels ↗</a>
          <Link href="/cv">CV / background ↗</Link>
        </div>
      </section>
    </main>
  );
}
