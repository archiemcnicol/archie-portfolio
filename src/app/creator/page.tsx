import Link from "next/link";
import Image from "next/image";
import {
  PARTNERSHIP_ROSTER,
  PUBLIC_CAMPAIGNS,
  SELECTED_PERFORMANCE,
} from "@/lib/brand-work";
import styles from "./brand-work.module.css";

export const metadata = {
  title: "Brand Work — Archie McNicol",
  description:
    "Selected creator campaigns, UGC, short-form brand work and campaign outcomes by Archie McNicol.",
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
              <Link className="brand-button brand-button-primary" href="/contact">
                Start a conversation
              </Link>
              <a className="brand-button" href="#selected-work">
                View selected work
              </a>
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

      <section className="brand-section" id="selected-work">
        <div className="wrap">
          <div className="brand-section-heading">
            <div className="section-title">Selected creative work</div>
            <p>
              Campaigns selected for the brief, execution and deliverables—not simply because a
              post received the largest distribution.
            </p>
          </div>

          <div className="brand-campaigns">
            {PUBLIC_CAMPAIGNS.map((campaign, index) => {
              const coverLinks = campaign.links.filter((link) => link.coverSrc);
              const publicLinks = campaign.links.filter((link) => link.href);
              const measuredDeliverables = publicLinks.filter((link) => link.analytics);
              const standardLinks = publicLinks.filter((link) => !link.analytics);

              return (
                <article className={styles.campaign} key={campaign.id}>
                  <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>

                  <div className={styles.media}>
                    <div className={styles.covers}>
                      {coverLinks.map((link) => {
                        const image = (
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
                            {image}
                            <span className={styles.coverLabel}>View on {link.platform} ↗</span>
                          </a>
                        ) : (
                          <div
                            className={`${styles.cover} ${styles.coverStatic}`}
                            key={`${campaign.id}-${link.label}`}
                          >
                            {image}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.copy}>
                    <div className={styles.meta}>
                      <span>{campaign.period}</span>
                      <span>{campaign.format}</span>
                    </div>

                    <div className={styles.logoWrap} data-brand={campaign.id}>
                      <Image
                        className={styles.logo}
                        src={campaign.logoSrc}
                        alt={campaign.logoAlt}
                        width={420}
                        height={140}
                        unoptimized
                      />
                    </div>

                    <h3>{campaign.campaign}</h3>
                    <p className={styles.summary}>{campaign.summary}</p>

                    {(campaign.campaignPartner || campaign.managedBy?.length) ? (
                      <div className={styles.credits}>
                        {campaign.campaignPartner ? (
                          <div>
                            <span>Campaign partner</span>
                            {campaign.partnerUrl ? (
                              <a href={campaign.partnerUrl} rel="noreferrer" target="_blank">
                                {campaign.campaignPartner} ↗
                              </a>
                            ) : (
                              <strong>{campaign.campaignPartner}</strong>
                            )}
                          </div>
                        ) : null}
                        {campaign.managedBy?.length ? (
                          <div>
                            <span>Commissioned / managed by</span>
                            <strong>
                              {campaign.managedBy.map((contact) => contact.name).join(" · ")}
                            </strong>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {campaign.analytics ? (
                      <div className={styles.analytics} aria-label={`${campaign.brand} performance`}>
                        <div><span>Views</span><strong>{campaign.analytics.views}</strong></div>
                        <div><span>Likes</span><strong>{campaign.analytics.likes}</strong></div>
                      </div>
                    ) : null}

                    {measuredDeliverables.length ? (
                      <div className={styles.measuredDeliverables} aria-label={`${campaign.brand} deliverable performance`}>
                        {measuredDeliverables.map((link) => (
                          <div className={styles.measuredDeliverable} key={`${campaign.id}-${link.label}-performance`}>
                            <div className={styles.deliverableHead}>
                              <strong>{link.label}</strong>
                              <span>{link.platform}</span>
                            </div>
                            <div className={styles.analytics}>
                              <div><span>Views</span><strong>{link.analytics!.views}</strong></div>
                              <div><span>Likes</span><strong>{link.analytics!.likes}</strong></div>
                            </div>
                            <a href={link.href} rel="noreferrer" target="_blank">
                              View on {link.platform} ↗
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {standardLinks.length ? (
                      <div className={styles.deliverables} aria-label={`${campaign.brand} content links`}>
                        {standardLinks.map((link) => (
                          <a
                            href={link.href}
                            key={`${campaign.id}-${link.label}-link`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span>{link.label}</span>
                            <small>{link.platform}</small>
                            <b>↗</b>
                          </a>
                        ))}
                      </div>
                    ) : null}

                    {campaign.brandUrl ? (
                      <a className={styles.brandLink} href={campaign.brandUrl} rel="noreferrer" target="_blank">
                        Visit {campaign.brand} ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="wrap">
          <div className="brand-section-heading">
            <div className="section-title">Selected organic performance</div>
            <p>
              A small selection of stronger outcomes across paid and gifted creative. These are
              examples of what individual pieces achieved, not guaranteed campaign benchmarks.
            </p>
          </div>

          <div className={styles.performanceGrid} aria-label="Selected organic campaign performance">
            {SELECTED_PERFORMANCE.map((item) => (
              <article className={styles.performanceCard} key={item.id}>
                <div className={styles.performanceHead}>
                  <strong>{item.brand}</strong>
                  {item.period ? <span>{item.period}</span> : null}
                </div>
                {item.campaign ? <p>{item.campaign}</p> : null}
                <div className={styles.performanceNumbers}>
                  <div><span>Views</span><strong>{item.views}</strong></div>
                  <div><span>Likes</span><strong>{item.likes}</strong></div>
                </div>
                <div className={styles.performancePartner}>
                  <span>Brand / client: </span>
                  {item.brandUrl ? (
                    <a href={item.brandUrl} rel="noreferrer" target="_blank">{item.brand} ↗</a>
                  ) : (
                    <strong>{item.brand}</strong>
                  )}
                  {item.campaignPartner ? (
                    <>
                      <span> · via </span>
                      {item.partnerUrl ? (
                        <a href={item.partnerUrl} rel="noreferrer" target="_blank">{item.campaignPartner} ↗</a>
                      ) : (
                        <strong>{item.campaignPartner}</strong>
                      )}
                    </>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <p className={styles.performanceNote}>
            Selected organic results. Performance varies by brief, distribution, paid support and
            platform conditions.
          </p>
        </div>
      </section>

      <section className="brand-section brand-roster-section" id="work-archive">
        <div className="wrap brand-roster-grid">
          <div>
            <div className="section-title">Work archive</div>
            <p className="brand-roster-intro">
              A broader record of brand, agency, music and event work, with campaign partners and
              commissioning contacts kept distinct from the client name.
            </p>
          </div>
          <div className={styles.partnershipGrid} aria-label="Brand work archive">
            {PARTNERSHIP_ROSTER.map((partnership, index) => {
              const publicLinks = partnership.links?.filter((link) => link.href) ?? [];
              const linkMetrics = partnership.links?.filter((link) => link.analytics) ?? [];

              return (
                <article className={styles.partnershipCard} key={`${partnership.brand}-${index}`}>
                  <div className={styles.archiveTop}>
                    {partnership.brandUrl ? (
                      <a href={partnership.brandUrl} rel="noreferrer" target="_blank">
                        <strong>{partnership.brand}</strong>
                      </a>
                    ) : (
                      <strong>{partnership.brand}</strong>
                    )}
                    {partnership.period ? <span className={styles.archivePeriod}>{partnership.period}</span> : null}
                  </div>

                  <p className={styles.archiveDetail}>{partnership.detail}</p>

                  <div className={styles.archiveCredits}>
                    <span>
                      Brand / client: <strong>{partnership.brand}</strong>
                      {partnership.campaignPartner ? (
                        <>
                          {" · via "}
                          {partnership.partnerUrl ? (
                            <a href={partnership.partnerUrl} rel="noreferrer" target="_blank">
                              {partnership.campaignPartner} ↗
                            </a>
                          ) : (
                            <strong>{partnership.campaignPartner}</strong>
                          )}
                        </>
                      ) : null}
                    </span>
                    {partnership.managedBy?.length ? (
                      <span>
                        Commissioned / managed by {partnership.managedBy.map((contact) => contact.name).join(" · ")}
                      </span>
                    ) : null}
                  </div>

                  {partnership.analytics ? (
                    <div className={styles.archiveAnalytics}>
                      <span>{partnership.analytics.views} views</span>
                      <span>{partnership.analytics.likes} likes</span>
                    </div>
                  ) : linkMetrics.length ? (
                    <div className={styles.archiveMetricList}>
                      {linkMetrics.map((link) => (
                        <div key={`${partnership.brand}-${link.label}-metric`}>
                          <strong>{link.label}</strong>
                          <span>{link.analytics!.views} views · {link.analytics!.likes} likes</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`${styles.archiveAnalytics} ${styles.archiveMuted}`}>
                      <span>Performance not archived</span>
                    </div>
                  )}

                  {publicLinks.length ? (
                    <div className={styles.archiveLinks}>
                      {publicLinks.map((link) => (
                        <a
                          href={link.href}
                          key={`${partnership.brand}-${link.label}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className={`${styles.archiveLinks} ${styles.archiveMuted}`}>
                      <span>Public content link not archived</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="wrap brand-format-grid">
          <div className="brand-format-lead">
            <div className="section-title">Creative services</div>
            <h2>Built around the brief, platform and audience.</h2>
          </div>
          <div className="brand-format-list">
            <article><span>01</span><h3>Brief to concept</h3><p>Turning campaign objectives into a short-form idea that feels natural to the platform and audience.</p></article>
            <article><span>02</span><h3>Styling & production</h3><p>Product styling, filming and on-camera delivery built around the agreed creative direction.</p></article>
            <article><span>03</span><h3>Edit & delivery</h3><p>Platform-native editing, revisions and final asset delivery for organic or paid campaign use.</p></article>
            <article><span>04</span><h3>Cross-platform</h3><p>TikTok and Instagram outputs adapted to how each platform is actually watched.</p></article>
          </div>
        </div>
      </section>

      <section className="brand-contact">
        <div className="wrap brand-contact-inner">
          <div className="eyebrow">Campaign enquiries</div>
          <h2>Have a brief in mind?</h2>
          <Link className="brand-button brand-button-primary" href="/contact">
            Contact Archie
          </Link>
        </div>
      </section>
    </main>
  );
}
