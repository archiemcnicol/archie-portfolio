import Link from "next/link";
import Image from "next/image";
import { PARTNERSHIP_ROSTER, PUBLIC_CAMPAIGNS } from "@/lib/brand-work";
import styles from "./brand-work.module.css";

export const metadata = {
  title: "Brand Work — Archie McNicol",
  description:
    "Selected creator campaigns, partnerships and short-form brand work by Archie McNicol.",
};

export default function CreatorPage() {
  return (
    <main className="brand-page">
      <section className="brand-hero">
        <div className="wrap brand-hero-grid">
          <div>
            <div className="eyebrow">Creator / brand work</div>
            <h1>Content people watch. Partnerships that fit.</h1>
          </div>
          <div className="brand-hero-side">
            <p>
              Fashion, fragrance, lifestyle and event content shaped around a recognisable
              point of view—not a generic ad read.
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
            <div className="section-title">Selected collaborations</div>
            <p>Live examples with the campaign and format kept clear.</p>
          </div>

          <div className="brand-campaigns">
            {PUBLIC_CAMPAIGNS.map((campaign, index) => {
              const tiktokLinks = campaign.links.filter((link) => link.platform === "TikTok");
              const secondaryLinks = campaign.links.filter((link) => link.platform !== "TikTok");

              return (
                <article className={styles.campaign} key={campaign.id}>
                  <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>

                  <div className={styles.media}>
                    <div className={styles.covers}>
                      {tiktokLinks.map((link) => (
                        <a
                          className={styles.cover}
                          href={link.href}
                          key={link.href}
                          rel="noreferrer"
                          target="_blank"
                          aria-label={`View ${campaign.brand} video on TikTok`}
                        >
                          <Image
                            src={link.coverSrc!}
                            alt={`${campaign.brand} TikTok video cover`}
                            fill
                            sizes="(max-width: 600px) 72vw, (max-width: 900px) 42vw, 24vw"
                            priority={index === 0}
                          />
                          <span className={styles.coverLabel}>View on TikTok ↗</span>
                        </a>
                      ))}
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

                    <div className={styles.analytics} aria-label={`${campaign.brand} analytics`}>
                      <div><span>Views</span><strong>{campaign.analytics.views}</strong></div>
                      <div><span>Likes</span><strong>{campaign.analytics.likes}</strong></div>
                    </div>

                    {secondaryLinks.length ? (
                      <div className={styles.secondaryLinks}>
                        {secondaryLinks.map((link) => (
                          <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section brand-roster-section">
        <div className="wrap brand-roster-grid">
          <div>
            <div className="section-title">Partnership experience</div>
            <p className="brand-roster-intro">
              Selected experience across fashion, fragrance, music, platforms and live events.
            </p>
          </div>
          <div className={styles.partnershipGrid} aria-label="Selected partnership experience">
            {PARTNERSHIP_ROSTER.map((partnership) => (
              <article className={styles.partnershipCard} key={partnership.brand}>
                <strong>{partnership.brand}</strong>
                <span>{partnership.detail}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="wrap brand-format-grid">
          <div className="brand-format-lead">
            <div className="section-title">Ways to work together</div>
            <h2>Built around the idea, platform and audience.</h2>
          </div>
          <div className="brand-format-list">
            <article><span>01</span><h3>Campaign content</h3><p>Short-form concepts, product integrations and multi-post campaign delivery.</p></article>
            <article><span>02</span><h3>Gifting & launches</h3><p>Natural fashion and lifestyle placements with clear disclosure and considered styling.</p></article>
            <article><span>03</span><h3>Events</h3><p>Fast-turnaround promotional content before, during or immediately after an event.</p></article>
            <article><span>04</span><h3>Cross-platform</h3><p>TikTok and Instagram delivery adapted to the way each platform is actually watched.</p></article>
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
