import type { Metadata } from "next";
import Link from "next/link";
import { AFFILIATE_PERFORMANCE } from "@/lib/performance-data";
import styles from "./affiliate.module.css";

export const metadata: Metadata = {
  title: "Commerce Performance — Archie McNicol",
  description:
    "A public overview of creator-led commerce performance by Archie McNicol, covering registrations, verified activations, recorded parcels and tracked freight.",
  alternates: { canonical: "/affiliate" },
};

const platforms = AFFILIATE_PERFORMANCE.platforms;
const totals = AFFILIATE_PERFORMANCE.totals;
const maxRegistrations = Math.max(...platforms.map((platform) => platform.registrations));

export default function AffiliatePage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} performance-hero`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className={styles.kicker}>Commerce / performance</div>
            <h1>Performance beyond the post.</h1>
          </div>
          <div className={styles.heroSide}>
            <p>Creator-led commerce measured through registrations, verified activations and, where evidenced, parcel and freight activity.</p>
            <a href="#overview">View public record ↓</a>
          </div>
        </div>
      </section>

      <section
        className={`wrap ${styles.metricRail} performance-metrics`}
        id="overview"
        aria-label="Lifetime commerce performance summary"
      >
        <div>
          <span>Total registrations</span>
          <strong>{totals.registrations.toLocaleString("en-GB")}</strong>
          <small>ACBuy · USFans · Sugargoo</small>
        </div>
        <div>
          <span>Verified activated users</span>
          <strong>{totals.verifiedActivatedUsersDisplay}</strong>
          <small>ACBuy + USFans · Sugargoo unavailable</small>
        </div>
        <div>
          <span>Recorded parcels</span>
          <strong>{totals.recordedParcelsDisplay}</strong>
          <small>Available ACBuy data</small>
        </div>
        <div>
          <span>Tracked freight</span>
          <strong>{totals.trackedFreightYuanDisplay}</strong>
          <small>{totals.trackedFreightUsdDisplay} · available ACBuy data</small>
        </div>
      </section>

      <section className={`${styles.dashboard} performance-dashboard`} aria-labelledby="platform-performance">
        <div className="wrap">
          <header className={styles.dashboardHead}>
            <div>
              <span>Public record / platform data</span>
              <h2 id="platform-performance">Comparable where the data allows.</h2>
            </div>
            <p>
              Registration totals can be compared across all three platforms. Activation coverage is available for ACBuy and USFans;
              Sugargoo activation data is unavailable and is not treated as zero. Parcel and freight figures are evidenced through ACBuy.
            </p>
          </header>

          <div className={styles.chart} aria-label="Affiliate registrations by platform with activation coverage">
            {platforms.map((platform) => (
              <article className={styles.month} key={platform.id}>
                <div className={styles.barStage}>
                  <div
                    className={styles.registrationBar}
                    style={{ height: `${Math.max(8, platform.registrations / maxRegistrations * 100)}%` }}
                  >
                    <span>{platform.registrations.toLocaleString("en-GB")}</span>
                  </div>
                </div>
                <strong>{platform.name}</strong>
                <small>{platform.registrations.toLocaleString("en-GB")} registrations</small>
                <div className={styles.platformDetails}>
                  <span>Activated users <b>{platform.activatedUsers?.toLocaleString("en-GB") ?? "Data unavailable"}</b></span>
                  <span>Activation rate <b>{platform.activationRateDisplay}</b></span>
                  {platform.recordedParcels !== null ? (
                    <span>Recorded parcels <b>{platform.recordedParcels.toLocaleString("en-GB")}</b></span>
                  ) : null}
                  {platform.trackedFreightYuan !== null ? (
                    <span>Tracked freight <b>¥{platform.trackedFreightYuan.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></span>
                  ) : null}
                  {platform.trackedFreightUsdApprox !== null ? (
                    <span>Approx. freight USD <b>≈ ${platform.trackedFreightUsdApprox.toLocaleString("en-GB")} USD</b></span>
                  ) : null}
                  <span>Registration data captured <b>{platform.registrationDataCaptured}</b></span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.legend}>
            <span><i className={styles.legendRegistration} /> Registrations</span>
            <span>Activation rates shown only where comparable data exists</span>
          </div>
        </div>
      </section>

      <section className={`${styles.partnerships} performance-private`}>
        <div className="wrap">
          <header className={styles.partnershipsHead}>
            <div>
              <span>Dataset boundaries</span>
              <h2>Traffic, registrations and activations stay separate.</h2>
            </div>
            <div>
              <p>
                Link traffic, affiliate registrations, verified activations, parcels and freight come from different measurement sources.
                They are not presented as one artificial conversion funnel.
              </p>
              <Link className={styles.privateAccessLink} href="/contact">Request details ↗</Link>
            </div>
          </header>
        </div>
      </section>
    </main>
  );
}
