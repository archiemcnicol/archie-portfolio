import type { Metadata } from "next";
import Link from "next/link";
import {
  COMMERCE_LIFETIME_PUBLIC,
  COMMERCE_MONTHLY_PUBLIC,
} from "@/lib/affiliate-public";
import styles from "./affiliate.module.css";

export const metadata: Metadata = {
  title: "Commerce Performance — Archie McNicol",
  description:
    "A public overview of creator-led commerce performance by Archie McNicol, covering registrations, verified activations, recorded parcels and tracked freight while keeping partner-level reporting private.",
  alternates: { canonical: "/affiliate" },
};

const maxRegistrations = Math.max(...COMMERCE_MONTHLY_PUBLIC.map((month) => month.registrations));

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
            <p>Creator-led commerce tracked from registration through recorded parcel and freight activity.</p>
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
          <strong>{COMMERCE_LIFETIME_PUBLIC.registrationsDisplay}</strong>
          <small>Consolidated public total</small>
        </div>
        <div>
          <span>Verified activated users</span>
          <strong>{COMMERCE_LIFETIME_PUBLIC.verifiedActivatedUsersDisplay}</strong>
          <small>Comparable verified records</small>
        </div>
        <div>
          <span>Recorded parcels</span>
          <strong>{COMMERCE_LIFETIME_PUBLIC.recordedParcelsDisplay}</strong>
          <small>Where shipment data exists</small>
        </div>
        <div>
          <span>Tracked freight</span>
          <strong>{COMMERCE_LIFETIME_PUBLIC.trackedFreightYuanDisplay}</strong>
          <small>{COMMERCE_LIFETIME_PUBLIC.trackedFreightUsdDisplay}</small>
        </div>
      </section>

      <section className={`${styles.dashboard} performance-dashboard`} aria-labelledby="public-monthly-performance">
        <div className="wrap">
          <header className={styles.dashboardHead}>
            <div>
              <span>Public record / retained monthly dataset</span>
              <h2 id="public-monthly-performance">Users into parcels.</h2>
            </div>
            <p>Registered users with parcels nested inside each month. Partner identities and partner-level reporting remain private.</p>
          </header>

          <div className={styles.chart} aria-label="Monthly registered users versus parcels shipped">
            {COMMERCE_MONTHLY_PUBLIC.map((month) => (
              <div className={styles.month} key={month.month}>
                <div className={styles.barStage}>
                  <div
                    className={styles.registrationBar}
                    style={{ height: `${Math.max(5, month.registrations / maxRegistrations * 100)}%` }}
                  >
                    <span>{month.registrations.toLocaleString("en-GB")}</span>
                    <div
                      className={styles.parcelBar}
                      style={{ height: `${Math.max(4, month.parcels / month.registrations * 100)}%` }}
                    />
                  </div>
                </div>
                <strong>{month.month}</strong>
                <small>{month.parcels.toLocaleString("en-GB")} parcels</small>
              </div>
            ))}
          </div>

          <div className={styles.legend}>
            <span><i className={styles.legendRegistration} /> Registered users</span>
            <span><i className={styles.legendParcel} /> Parcels shipped</span>
          </div>
        </div>
      </section>

      <section className={`${styles.partnerships} performance-private`}>
        <div className="wrap">
          <header className={styles.partnershipsHead}>
            <div>
              <span>Private reporting</span>
              <h2>Partner-level detail stays private.</h2>
            </div>
            <div>
              <p>Partner identities, conversion detail and commercial terms are not published on the public portfolio.</p>
              <Link className={styles.privateAccessLink} href="/contact">Request details ↗</Link>
            </div>
          </header>
        </div>
      </section>
    </main>
  );
}
