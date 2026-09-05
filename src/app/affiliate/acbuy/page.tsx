import type { Metadata } from "next";
import Link from "next/link";
import { ACBUY_MONTHLY, ACBUY_TOTALS } from "@/lib/affiliate-work";
import styles from "../detail.module.css";

export const metadata: Metadata = {
  title: "ACBuy Performance Case Study",
  description: "ACBuy affiliate performance case study with 2025 monthly registrations, activations, parcels and tracked freight.",
  alternates: { canonical: "/affiliate/acbuy" },
};

export default function AcbuyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>Affiliate case study / 01</div><h1>ACBuy</h1></div>
          <div className={styles.heroSide}>
            <div><span>Data window</span><strong>Jan — Dec 2025</strong></div>
            <div><span>Relationship</span><strong>Long-running creator / affiliate partnership</strong></div>
            <div><span>Measurement</span><strong>Registration → activation → parcel → freight</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.summary}>
        <div className="wrap">
          <span>Case summary</span>
          <p>
            The ACBuy record is useful because it keeps going after the social post. The 2025
            dashboard period preserves the acquisition funnel month by month and shows how creator-led
            traffic translated into activated users, shipped parcels and freight activity.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.metrics}`}>
        <div><span>Registrations</span><strong>{ACBUY_TOTALS.registrations.toLocaleString("en-GB")}</strong><small>2025</small></div>
        <div><span>Activations</span><strong>{ACBUY_TOTALS.activations}</strong><small>{ACBUY_TOTALS.activationRate}% registration conversion</small></div>
        <div><span>Parcels</span><strong>{ACBUY_TOTALS.parcels.toLocaleString("en-GB")}</strong><small>Tracked shipments</small></div>
        <div><span>Freight</span><strong>${Math.round(ACBUY_TOTALS.freight / 1000)}K</strong><small>${ACBUY_TOTALS.freight.toLocaleString("en-US", { maximumFractionDigits: 0 })} tracked</small></div>
      </section>

      <section className={styles.dataSection}>
        <div className="wrap">
          <div className={styles.sectionHeading}>
            <div className={styles.sectionLabel}>Monthly record</div>
            <p>Source period kept intact rather than blended with later cumulative extracts.</p>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}><span>Month</span><span>Registrations</span><span>Activations</span><span>Parcels</span><span>Freight</span></div>
            {ACBUY_MONTHLY.map((month) => (
              <div className={styles.tableRow} key={month.month}>
                <strong>{month.month}</strong>
                <span>{month.registrations.toLocaleString("en-GB")}</span>
                <span>{month.activations.toLocaleString("en-GB")}</span>
                <span>{month.parcels.toLocaleString("en-GB")}</span>
                <span>${month.freight.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.callout}>
        <div className={`wrap ${styles.calloutGrid}`}>
          <h2>August was the peak acquisition month.</h2>
          <p>
            1,878 registrations, 191 activations, 310 parcels and $29,912 in tracked freight. The
            value of the monthly view is seeing that growth pattern instead of reducing a year of work
            to one lifetime total.
          </p>
        </div>
      </section>

      <section className={styles.links}>
        <div className="wrap">
          <Link href="/affiliate">← Performance dashboard</Link>
          <Link href="/affiliate/usfans">USFans comparison ↗</Link>
          <Link href="/contact">Partnership enquiry ↗</Link>
        </div>
      </section>
    </main>
  );
}
