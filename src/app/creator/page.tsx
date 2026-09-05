import Link from "next/link";
import Image from "next/image";
import {
  PARTNERSHIP_ROSTER,
  PUBLIC_CAMPAIGNS,
  SELECTED_PERFORMANCE,
} from "@/lib/brand-work";
import styles from "./brand-work.module.css";
import consistency from "./brand-work-consistency.module.css";

export const metadata = {
  title: "Brand Work — Archie McNicol",
  description:
    "Selected creator campaigns, UGC, short-form brand work and campaign outcomes by Archie McNicol.",
};

const PERFORMANCE_CONTENT_LINKS: Record<string, string> = {
  "tilt-2025-07-08": "https://www.tiktok.com/@fitswitharchie/video/7524743379410881814",
  "tilt-2025-07-07": "https://www.tiktok.com/@fitswitharchie/video/7524371608803265814",
  "aly-2024-09-04": "https://www.tiktok.com/@fitswitharchie/video/7410796625053945120",
  "killowen-pick-your-poison": "https://www.tiktok.com/@fitswitharchie/video/7480232374132018434",
  "wintr-2024-12-13": "https://www.tiktok.com/@fitswitharchie/video/7447955753240939808",
  "lyle-scott-2025-05-01": "https://www.tiktok.com/@fitswitharchie/video/7499465138953653526",
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
        <div><strong>25k+</strong><span>Social community</span></div>
        <div><strong>20M+</strong><span>Views across content</span></div>
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
                  {contentHref ? (
                    <a className={consistency.performanceAction} href={contentHref} rel="noreferrer" target="_blank">
                      View TikTok ↗
                    </a>
                  ) : null}
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
            <p>Campaigns selected for the brief, execution and deliverables—not simply because a post received the largest distribution.</p>
          </div>

          <div className="brand-campaigns">
            {PUBLIC_CAMPAIGNS.map((campaign, index) => (
              <article className={styles.campaign} key={campaign.id}>
                <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>

                <div className={styles.media}>
                  <div className={consistency.contentList} aria-label={`${campaign.brand} campaign content`}>
                    {campaign.links.map((link, linkIndex) => {
                      const analytics = link.analytics ?? (linkIndex === 0 ? campaign.analytics : undefined);
                      const thumbnail = link.coverSrc ? (
                        <Image
                          src={link.coverSrc}
                          alt={`${campaign.brand} campaign video cover`}
                          fill
                          sizes="(max-width: 430px) 92px, (max-width: 700px) 104px, 122px"
                          priority={index === 0 && linkIndex === 0}
                        />
                      ) : (
                        <span className={consistency.contentPlaceholder}><strong>{link.platform}</strong></span>
                      );

                      return (
                        <article className={consistency.contentCard} key={`${campaign.id}-${link.label}`}>
                          {link.href ? (
                            <a
                              aria-label={`View ${campaign.brand} content on ${link.platform}`}
                              className={consistency.contentThumb}
                              href={link.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {thumbnail}
                            </a>
                          ) : (
                            <div className={consistency.contentThumb}>{thumbnail}</div>
                          )}

                          <div className={consistency.contentInfo}>
                            <div className={consistency.contentTopline}>
                              <strong>{link.label}</strong>
                              <span>{link.platform}</span>
                            </div>
                            <div className={consistency.contentAnalytics} aria-label={`${link.label} performance`}>
                              <div><span>Views</span><strong>{analytics?.views ?? "—"}</strong></div>
                              <div><span>Likes</span><strong>{analytics?.likes ?? "—"}</strong></div>
                            </div>
                            {link.href ? (
                              <a className={consistency.contentCta} href={link.href} rel="noreferrer" target="_blank">
                                View on {link.platform} ↗
                              </a>
                            ) : (
                              <span className={consistency.contentCta}>Public link unavailable</span>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.copy}>
                  <div className={styles.meta}><span>{campaign.period}</span><span>{campaign.format}</span></div>
                  <div className={styles.logoWrap} data-brand={campaign.id}>
                    <Image className={styles.logo} src={campaign.logoSrc} alt={campaign.logoAlt} width={420} height={140} unoptimized />
                  </div>
                  <h3>{campaign.campaign}</h3>
                  <p className={styles.summary}>{campaign.summary}</p>

                  {(campaign.campaignPartner || campaign.managedBy?.length) ? (
                    <div className={styles.credits}>
                      {campaign.campaignPartner ? <div><span>Campaign partner</span>{campaign.partnerUrl ? <a href={campaign.partnerUrl} rel="noreferrer" target="_blank">{campaign.campaignPartner} ↗</a> : <strong>{campaign.campaignPartner}</strong>}</div> : null}
                      {campaign.managedBy?.length ? <div><span>Commissioned / managed by</span><strong>{campaign.managedBy.map((contact) => contact.name).join(" · ")}</strong></div> : null}
                    </div>
                  ) : null}

                  {campaign.brandUrl ? <a className={styles.brandLink} href={campaign.brandUrl} rel="noreferrer" target="_blank">Visit {campaign.brand} ↗</a> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section brand-roster-section" id="work-archive">
        <div className="wrap brand-roster-grid">
          <div>
            <div className="section-title">Work archive</div>
            <p className="brand-roster-intro">A broader record of brand, agency, music and event work, with campaign partners and commissioning contacts kept distinct from the client name.</p>
          </div>
          <div className={styles.partnershipGrid} aria-label="Brand work archive">
            {PARTNERSHIP_ROSTER.map((partnership, index) => {
              const publicLinks = partnership.links?.filter((link) => link.href) ?? [];

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

                  {publicLinks.length ? (
                    <div className={consistency.archiveContentList} aria-label={`${partnership.brand} public content`}>
                      {publicLinks.map((link, linkIndex) => {
                        const analytics = link.analytics ?? (linkIndex === 0 ? partnership.analytics : undefined);
                        return (
                          <a
                            className={consistency.archiveContentCard}
                            href={link.href}
                            key={`${partnership.brand}-${link.label}-content`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <div className={consistency.archiveContentHead}>
                              <strong>{link.label}</strong>
                              <span>{link.platform}</span>
                            </div>
                            <b className={consistency.archiveContentArrow}>↗</b>
                            <div className={consistency.archiveContentAnalytics}>
                              <div><span>Views</span><strong>{analytics?.views ?? "—"}</strong></div>
                              <div><span>Likes</span><strong>{analytics?.likes ?? "—"}</strong></div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ) : partnership.analytics ? (
                    <div className={consistency.archiveOverviewAnalytics} aria-label={`${partnership.brand} performance`}>
                      <div><span>Views</span><strong>{partnership.analytics.views}</strong></div>
                      <div><span>Likes</span><strong>{partnership.analytics.likes}</strong></div>
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
