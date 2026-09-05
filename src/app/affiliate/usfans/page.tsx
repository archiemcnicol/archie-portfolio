import type { Metadata } from "next";
import Link from "next/link";
import { USFANS } from "@/lib/affiliate-work";
import styles from "../detail.module.css";

export const metadata: Metadata = {
  title: "USFans Performance Case Study",
  description: "USFans affiliate case study comparing verified registrations with dashboard and scraper activation records.",
  alternates: { canonical: "/affiliate/usfans" },
};

export default function UsfansPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>Affiliate case study / 02</div><h1>USFans</h1></div>
          <div className={styles.heroSide}>
            <div><span>Campaign window</span><strong>{USFANS.period}</strong></div>
            <div><span>Registrations</span><strong>{USFANS.registrations}</strong></div>
            <div><span>Important note</span><strong>Two activation sources were preserved</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.summary}>
        <div className="wrap">
          <span>Case summary</span>
          <p>
            USFans is the cleaner example of why performance reporting needs source context. The
            registration total is stable, but the campaign retained two different activation counts:
            one from the dashboard and one from the scraper export.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.metrics}`}>
        <div><span>Registrations</span><strong>{USFANS.registrations}</strong><small>Verified total</small></div>
        <div><span>Dashboard activations</span><strong>{USFANS.dashboardActivations}</strong><small>{USFANS.dashboardRate}% conversion</small></div>
        <div><span>Scraper activations</span><strong>{USFANS.scraperActivations}</strong><small>{USFANS.scraperRate}% conversion</small></div>
        <div><span>Duration</span><strong>2 mo</strong><small>14 Mar — 14 May 2025</small></div>
      </section>

      <section className={styles.compare}>
        <div className={`wrap ${styles.compareGrid}`}>
          <h2>The discrepancy is part of the result.</h2>
          <div className={styles.compareList}>
            <div><span>Dashboard</span><strong>{USFANS.dashboardActivations}</strong><p>Activation rate: {USFANS.dashboardRate}% of verified registrations.</p></div>
            <div><span>Scraper export</span><strong>{USFANS.scraperActivations}</strong><p>Activation rate: {USFANS.scraperRate}% of verified registrations.</p></div>
            <div><span>Difference</span><strong>{USFANS.scraperActivations - USFANS.dashboardActivations}</strong><p>Users separating the two recorded activation definitions.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.callout}>
        <div className={`wrap ${styles.calloutGrid}`}>
          <h2>Clean reporting beats a cleaner-looking number.</h2>
          <p>
            The case study does not choose whichever activation figure looks strongest. It keeps the
            provenance visible, because conversion analysis is only useful when the measurement
            definition is clear.
          </p>
        </div>
      </section>

      <section className={styles.links}>
        <div className="wrap">
          <Link href="/affiliate">← Performance dashboard</Link>
          <Link href="/affiliate/acbuy">ACBuy case study ↗</Link>
          <Link href="/contact">Partnership enquiry ↗</Link>
        </div>
      </section>
    </main>
  );
}
