import type { Metadata } from "next";
import Link from "next/link";
import { ACBUY_MONTHLY, ACBUY_TOTALS, AFFILIATE_ARCHIVE, USFANS } from "@/lib/affiliate-work";
import styles from "./affiliate.module.css";

export const metadata: Metadata = {
  title: "Affiliate & Performance Partnerships",
  description: "Creator-led affiliate and performance partnership analytics by Archie McNicol, including ACBuy and USFans conversion data.",
  alternates: { canonical: "/affiliate" },
};

const maxRegistrations = Math.max(...ACBUY_MONTHLY.map((month) => month.registrations));

export default function AffiliatePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Affiliate / performance</div>
            <h1>Reach is only the first number.</h1>
          </div>
          <div className={styles.heroSide}>
            <p>
              Creator-led acquisition tracked into registrations, activations, parcels and freight —
              with the source differences kept visible rather than smoothing them away.
            </p>
            <Link href="/affiliate/acbuy">Open ACBuy case study →</Link>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.metricRail}`} aria-label="ACBuy 2025 summary">
        <div><span>Registrations</span><strong>{ACBUY_TOTALS.registrations.toLocaleString("en-GB")}</strong><small>2025 dashboard period</small></div>
        <div><span>Activations</span><strong>{ACBUY_TOTALS.activations.toLocaleString("en-GB")}</strong><small>{ACBUY_TOTALS.activationRate}% of registrations</small></div>
        <div><span>Parcels</span><strong>{ACBUY_TOTALS.parcels.toLocaleString("en-GB")}</strong><small>Tracked downstream</small></div>
        <div><span>Freight</span><strong>${Math.round(ACBUY_TOTALS.freight / 1000)}K</strong><small>Tracked 2025 freight</small></div>
      </section>

      <section className={styles.dashboard}>
        <div className="wrap">
          <header className={styles.dashboardHead}>
            <div><span>ACBuy / 2025</span><h2>Monthly acquisition.</h2></div>
            <p>Registrations are shown as the tall bar; activations sit inside each month so the conversion relationship stays visible.</p>
          </header>

          <div className={styles.chart} aria-label="ACBuy monthly registrations and activations in 2025">
            {ACBUY_MONTHLY.map((month) => (
              <div className={styles.month} key={month.month}>
                <div className={styles.barStage}>
                  <div className={styles.registrationBar} style={{ height: `${Math.max(5, month.registrations / maxRegistrations * 100)}%` }}>
                    <span>{month.registrations.toLocaleString("en-GB")}</span>
                    <div className={styles.activationBar} style={{ height: `${Math.max(4, month.activations / month.registrations * 100)}%` }} />
                  </div>
                </div>
                <strong>{month.month}</strong>
                <small>{month.activations} activated</small>
              </div>
            ))}
          </div>

          <div className={styles.legend}>
            <span><i className={styles.legendRegistration} /> Registrations</span>
            <span><i className={styles.legendActivation} /> Activation share</span>
          </div>
        </div>
      </section>

      <section className={styles.funnelSection}>
        <div className={`wrap ${styles.funnelGrid}`}>
          <div className={styles.funnelIntro}>
            <span>2025 funnel</span>
            <h2>Views were never the end point.</h2>
            <p>The useful performance record follows the user beyond content into partner-side behaviour.</p>
          </div>
          <div className={styles.funnel}>
            <div><span>01</span><strong>9,423</strong><p>Registrations</p><i style={{ width: "100%" }} /></div>
            <div><span>02</span><strong>997</strong><p>Activated users</p><i style={{ width: "61%" }} /></div>
            <div><span>03</span><strong>1,912</strong><p>Parcels shipped</p><i style={{ width: "42%" }} /></div>
            <div><span>04</span><strong>$173K</strong><p>Tracked freight</p><i style={{ width: "28%" }} /></div>
          </div>
        </div>
      </section>

      <section className={styles.usfans}>
        <div className={`wrap ${styles.usfansGrid}`}>
          <div>
            <div className={styles.kickerDark}>USFans / {USFANS.period}</div>
            <h2>One campaign. Two activation records.</h2>
            <p>
              The dashboard and scraper did not agree. Instead of hiding that, the case study keeps
              both definitions visible — which is much more useful when comparing conversion data.
            </p>
            <Link href="/affiliate/usfans">Open USFans case study →</Link>
          </div>
          <div className={styles.usfansNumbers}>
            <div><span>Registrations</span><strong>{USFANS.registrations}</strong><small>Verified registrations</small></div>
            <div><span>Dashboard activations</span><strong>{USFANS.dashboardActivations}</strong><small>{USFANS.dashboardRate}% conversion</small></div>
            <div className={styles.usfansEmphasis}><span>Scraper activations</span><strong>{USFANS.scraperActivations}</strong><small>{USFANS.scraperRate}% conversion</small></div>
          </div>
        </div>
      </section>

      <section className={styles.archive}>
        <div className="wrap">
          <div className={styles.archiveHead}><span>Partnership archive</span><p>Performance projects kept in chronological context rather than collapsed into one lifetime number.</p></div>
          <div className={styles.archiveRows}>
            {AFFILIATE_ARCHIVE.map((item, index) => {
              const content = (
                <>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.name}</strong>
                  <small>{item.period}</small>
                  <p>{item.description}</p>
                  <b>{item.href ? "↗" : "—"}</b>
                </>
              );
              return item.href ? <Link href={item.href} className={styles.archiveRow} key={item.name}>{content}</Link> : <div className={styles.archiveRow} key={item.name}>{content}</div>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
