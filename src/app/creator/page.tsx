import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TikTokFramePreview } from "@/components/tiktok-frame-preview";
import {
  PARTNERSHIP_ROSTER,
  PUBLIC_CAMPAIGNS,
  SELECTED_PERFORMANCE,
} from "@/lib/brand-work";
import { GENERAL_CREATOR_PERFORMANCE } from "@/lib/performance-data";
import styles from "./brand-work.module.css";
import consistency from "./brand-work-consistency.module.css";

export const metadata: Metadata = {
  title: "Brand Work — Archie McNicol",
  description:
    "Selected creator campaigns, UGC, short-form brand work and campaign outcomes by Archie McNicol.",
  alternates: { canonical: "/creator" },
};

const PERFORMANCE_CONTENT_LINKS: Record<string, string> = {
  "tilt-2025-07-08": "https://www.tiktok.com/@fitswitharchie/video/7524743379410881814",
  "tilt-2025-07-07": "https://www.tiktok.com/@fitswitharchie/video/7524371608803265814",
  "aly-2024-09-04": "https://www.tiktok.com/@fitswitharchie/video/7410796625053945120",
  "killowen-pick-your-poison": "https://www.tiktok.com/@fitswitharchie/video/7480232374132018434",
  "wintr-2024-12-13": "https://www.tiktok.com/@fitswitharchie/video/7447955753240939808",
  "lyle-scott-2025-05-01": "https://www.tiktok.com/@fitswitharchie/video/7499465138953653526",
};

const TIKTOK_FRAME_PREVIEWS: Record<string, { videoId: string; seekTo: number }> = {
  "https://www.tiktok.com/@fitswitharchie/video/7678728230278303008": {
    videoId: "7678728230278303008",
    seekTo: 1.05,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7695800477748972832": {
    videoId: "7695800477748972832",
    seekTo: 1.05,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7552940839467633923": {
    videoId: "7552940839467633923",
    seekTo: 1.05,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7592280935027035414": {
    videoId: "7592280935027035414",
    seekTo: 1.05,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7557375899180485910": {
    videoId: "7557375899180485910",
    seekTo: 0.95,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7592653916953644310": {
    videoId: "7592653916953644310",
    seekTo: 0.9,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7519140859351174422": {
    videoId: "7519140859351174422",
    seekTo: 1.05,
  },
  "https://www.tiktok.com/@fitswitharchie/video/7415251227971259680": {
    videoId: "7415251227971259680",
    seekTo: 1.55,
  },
};

export default function CreatorPage() {
  return (
    <main className="brand-page">
      <section className="brand-hero">
        <div className="wrap brand-hero-grid">
          <div>
            <div className="eyebrow">Creator / brand work</div>
            <h1>From brief to final cut.</h1>
          </div>
          <div className="brand-hero-side">
            <p>
              Platform-native fashion, fragrance, lifestyle and event content developed around
              the brief—from concept and styling through filming, editing and final delivery.
            </p>
            <div className="brand-actions">
              <Link className="brand-button brand-button-primary" href="/contact">Start a conversation</Link>
              <a className="brand-button" href="#selected-work">View selected work</a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap brand-proof" aria-label="Creator overview">
        <div><strong>{GENERAL_CREATOR_PERFORMANCE.audienceDisplay}</strong><span>Audience</span></div>
        <div><strong>{GENERAL_CREATOR_PERFORMANCE.verifiedVisibleVideoViewsDisplay}</strong><span>Verified video views</span></div>
        <div><strong>UK</strong><span>Fashion & lifestyle audience</span></div>
        <div><strong>Short-form</strong><span>TikTok and Reels</span></div>
      </section>

      <section className={`${styles.performanceSection} brand-section`} id="selected-work">
        <div className="wrap">
          <div className={styles.performanceIntro}>
            <div>
              <div className="section-title">Selected organic performance</div>
              <h2>Results that read at a glance.</h2>
            </div>
            <p>
              A small selection of stronger paid and gifted creative outcomes. Individual post
              performance is shown as evidence, not as a guaranteed campaign benchmark.
            </p>
          </div>

          <div className={styles.performanceGrid} aria-label="Selected organic campaign performance">
            {SELECTED_PERFORMANCE.map((item, index) => {
              const contentHref = PERFORMANCE_CONTENT_LINKS[item.id];

              return (
                <article className={`${styles.performanceCard} ${consistency.performanceCardLinked}`} key={item.id}>
                  <span className={styles.performanceIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.performanceIdentity}>
                    <div className={styles.performanceHead}>
                      <strong>{item.brand}</strong>
                      {item.period ? <span>{item.period}</span> : null}
                    </div>
                    {item.campaign ? <p>{item.campaign}</p> : <p>Organic creator performance</p>}
                  </div>
                  <div className={styles.performanceNumbers}>
                    <div><span>Views</span><strong>{item.views}</strong></div>
                    <div><span>Likes</span><strong>{item.likes}</strong></div>
                  </div>
                  <div className={styles.performancePartner}>
                    <span>Client</span>
                    {item.brandUrl ? <a href={item.brandUrl} rel="noreferrer" target="_blank">{item.brand} ↗</a> : <strong>{item.brand}</strong>}
                    {item.campaignPartner ? (
                      <small>
                        via {item.partnerUrl ? <a href={item.partnerUrl} rel="noreferrer" target="_blank">{item.campaignPartner} ↗</a> : <strong>{item.campaignPartner}</strong>}
                      </small>
                    ) : null}
                  </div>
                  <a className={consistency.performanceAction} href={contentHref} rel="noreferrer" target="_blank">
                    View TikTok ↗
                  </a>
                </article>
              );
            })}
          </div>

          <p className={styles.performanceNote}>Performance varies by brief, distribution, paid support and platform conditions.</p>
        </div>
      </section>

      <section className="brand-section">
        <div className="wrap">
          <div className="brand-section-heading">
            <div className="section-title">Selected creative work</div>
            <p>One representative video per campaign, ordered by its recorded TikTok views (with likes breaking ties). Every campaign's additional posts remain in the work archive.</p>
          </div>

          <div className="brand-campaigns">
            {PUBLIC_CAMPAIGNS.map((campaign, index) => {
              // Highlight one stable, existing cover/preview per campaign. The archive
              // remains the complete source for additional videos and their statistics.
              const coverLinks = campaign.links.filter(
                (link) => link.coverSrc || Boolean(link.href && TIKTOK_FRAME_PREVIEWS[link.href]),
              ).slice(0, 1);
              const featuredLink = coverLinks[0] ?? campaign.links.find((link) => link.href);
              const featuredAnalytics = featuredLink?.analytics ?? campaign.analytics;
              const additionalDeliverables = campaign.links.filter(
                (link) => link.href && link.href !== featuredLink?.href,
              );

              return (
                <article className={styles.campaign} key={campaign.id}>
                  <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
                  <div className={styles.media}>
                    <div className={styles.covers}>
                      {coverLinks.length === 0 ? (
                        <div
                          aria-hidden="true"
                          className={`${styles.cover} ${styles.coverStatic} ${styles.coverFallback}`}
                        >
                          <strong className={styles.coverFallbackBrand}>{campaign.brand}</strong>
                          <span className={styles.coverFallbackCampaign}>{campaign.campaign}</span>
                          <small className={styles.coverFallbackType}>Confirmed gifting · No video linked</small>
                        </div>
                      ) : null}
                      {coverLinks.map((link) => {
                        const preview = link.href ? TIKTOK_FRAME_PREVIEWS[link.href] : undefined;
                        const media = preview ? (
                          <TikTokFramePreview
                            seekTo={preview.seekTo}
                            title={`${campaign.brand} ${link.label} preview`}
                            videoId={preview.videoId}
                          />
                        ) : (
                          <Image
                            src={link.coverSrc!}
                            alt={`${campaign.brand} campaign video cover`}
                            fill
                            sizes="(max-width: 600px) 72vw, (max-width: 900px) 42vw, 24vw"
                            priority={index === 0}
                          />
                        );

                        return link.href ? (
                          <a
                            className={styles.cover}
                            href={link.href}
                            key={`${campaign.id}-${link.label}`}
                            rel="noreferrer"
                            target="_blank"
                            aria-label={`View ${campaign.brand} video on ${link.platform}`}
                          >
                            {media}
                            <span className={styles.coverLabel}>View on {link.platform} ↗</span>
                          </a>
                        ) : (
                          <div className={`${styles.cover} ${styles.coverStatic}`} key={`${campaign.id}-${link.label}`}>{media}</div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.copy}>
                    <div className={styles.meta}><span>{campaign.period}</span><span>{campaign.format}</span></div>
                    <div className={styles.logoWrap} data-brand={campaign.id}>
                      {campaign.logoSrc ? (
                        <Image className={styles.logo} src={campaign.logoSrc} alt={campaign.logoAlt} width={420} height={140} unoptimized />
                      ) : (
                        <strong className={styles.logoWordmark} aria-label={campaign.logoAlt}>{campaign.brand}</strong>
                      )}
                    </div>
                    <h3>{campaign.campaign}</h3>
                    <p className={styles.summary}>{campaign.summary}</p>

                    {(campaign.campaignPartner || campaign.managedBy?.length) ? (
                      <div className={styles.credits}>
                        {campaign.campaignPartner ? <div><span>Campaign partner</span>{campaign.partnerUrl ? <a href={campaign.partnerUrl} rel="noreferrer" target="_blank">{campaign.campaignPartner} ↗</a> : <strong>{campaign.campaignPartner}</strong>}</div> : null}
                        {campaign.managedBy?.length ? <div><span>Commissioned / managed by</span><strong>{campaign.managedBy.map((contact) => contact.name).join(" · ")}</strong></div> : null}
                      </div>
                    ) : null}

                    {featuredAnalytics ? (
                      <div className={styles.analytics} aria-label={`${campaign.brand} featured video performance`}>
                        <div><span>Views</span><strong>{featuredAnalytics.views}</strong></div>
                        <div><span>Likes</span><strong>{featuredAnalytics.likes}</strong></div>
                      </div>
                    ) : null}

                    {additionalDeliverables.length ? (
                      <a className={styles.brandLink} href="#work-archive">See more videos in the work archive ↘</a>
                    ) : null}
                    {campaign.brandUrl ? <a className={styles.brandLink} href={campaign.brandUrl} rel="noreferrer" target="_blank">Visit {campaign.brand} ↗</a> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section brand-roster-section" id="work-archive">
        <div className="wrap brand-roster-grid">
          <div>
            <div className="section-title">Work archive</div>
            <p className="brand-roster-intro">Brand, agency, music, food and event work, with the most recent partnerships first. Videos within each campaign appear in posting order, oldest to newest.</p>
          </div>
          <div className={styles.partnershipGrid} aria-label="Brand work archive">
            {PARTNERSHIP_ROSTER.map((partnership, index) => {
              const publicLinks = partnership.links?.filter((link) => link.href) ?? [];
              // Archive entries all use identical linked deliverable cards, including
              // campaigns with a single video whose metrics were stored at card level.
              const hasPerPostMetrics = publicLinks.some((link) => Boolean(link.analytics));
              const deliverables = publicLinks.map((link, linkIndex) => ({
                ...link,
                analytics: link.analytics ??
                  (!hasPerPostMetrics && linkIndex === 0 ? partnership.analytics : undefined),
              }));

              return (
                <article className={styles.partnershipCard} key={`${partnership.brand}-${index}`}>
                  <div className={styles.archiveTop}>
                    {partnership.brandUrl ? <a href={partnership.brandUrl} rel="noreferrer" target="_blank"><strong>{partnership.brand}</strong></a> : <strong>{partnership.brand}</strong>}
                    {partnership.period ? <span className={styles.archivePeriod}>{partnership.period}</span> : null}
                  </div>
                  <p className={styles.archiveDetail}>{partnership.detail}</p>
                  <div className={styles.archiveCredits}>
                    <span>Brand / client: <strong>{partnership.brand}</strong>{partnership.campaignPartner ? <>{" · via "}{partnership.partnerUrl ? <a href={partnership.partnerUrl} rel="noreferrer" target="_blank">{partnership.campaignPartner} ↗</a> : <strong>{partnership.campaignPartner}</strong>}</> : null}</span>
                    {partnership.managedBy?.length ? <span>Commissioned / managed by {partnership.managedBy.map((contact) => contact.organisation ? `${contact.name} · ${contact.organisation}` : contact.name).join(" · ")}</span> : null}
                  </div>
                  {deliverables.length ? (
                    <div className={styles.archiveDeliverables}>
                      {deliverables.map((link) => (
                        <a href={link.href} key={`${partnership.brand}-${link.label}-deliverable`} rel="noreferrer" target="_blank">
                          <div className={styles.archiveDeliverableHead}><strong>{link.label}</strong><b>↗</b></div>
                          {link.analytics ? (
                            <div className={styles.archiveAnalytics}>
                              <span>{link.analytics.views} views</span>
                              <span>{link.analytics.likes} likes</span>
                            </div>
                          ) : <span className={styles.archiveMetricPending}>Figures not recorded</span>}
                        </a>
                      ))}
                    </div>
                  ) : partnership.brand === "Snoop" ? (
                    <div className={styles.archiveDeliverables}>
                      <div className={styles.archiveUnlinkedDeliverable}>
                        <div className={styles.archiveDeliverableHead}><strong>Ad-distributed video</strong></div>
                        <span className={styles.archiveMetricPending}>Not available as a public post</span>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="wrap brand-format-grid">
          <div className="brand-format-lead"><div className="section-title">Creative services</div><h2>Built around the brief, platform and audience.</h2></div>
          <div className="brand-format-list">
            <article><span>01</span><h3>Brief to concept</h3><p>Turning campaign objectives into a short-form idea that feels natural to the platform and audience.</p></article>
            <article><span>02</span><h3>Styling & production</h3><p>Product styling, filming and on-camera delivery built around the agreed creative direction.</p></article>
            <article><span>03</span><h3>Edit & delivery</h3><p>Platform-native editing, revisions and final asset delivery for organic or paid campaign use.</p></article>
            <article><span>04</span><h3>Cross-platform</h3><p>TikTok and Instagram outputs adapted to how each platform is actually watched.</p></article>
          </div>
        </div>
      </section>

      <section className="brand-contact">
        <div className="wrap brand-contact-inner"><div className="eyebrow">Campaign enquiries</div><h2>Have a brief in mind?</h2><Link className="brand-button brand-button-primary" href="/contact">Contact Archie</Link></div>
      </section>
    </main>
  );
}
