import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const audience = [
  ["Brand work", "/creator", "Campaigns, collaborations and short-form creator work"],
  ["Photography", "/photography", "Travel, aerial, event and lifestyle photography since 2018"],
  ["Performance", "/affiliate", "Affiliate analytics, conversion funnels and case studies"],
  ["Professional", "/professional", "Community management, creator operations and experience"],
  ["Digital", "/business", "Websites, content systems and commercial digital work"],
  ["Background", "/cv", "Full chronology, education, independent projects and toolkit"],
] as const;

const selectedWork = [
  ["Creator", "Campaign films & fashion content", "/creator"],
  ["Photography", "Travel, events & aerial work", "/photography"],
  ["Performance", "Acquisition & conversion analytics", "/affiliate"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Creator · Community Manager · Photographer</div>
          <h1 className="display">One body of work.<br />Different ways in.</h1>
          <p className="lead">
            Archie McNicol is a Buckinghamshire-based creator, community manager and photographer
            working across fashion and lifestyle content, brand campaigns, creator operations,
            performance partnerships and digital projects.
          </p>
          <div className="audience-grid">
            {audience.map(([title, href, copy]) => (
              <Link className="audience-card" href={href} key={href}>
                <span>{copy}</span><strong>{title} →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-title">Selected work</div>
            <div className="section-copy">Creative work and performance evidence, with deeper detail one click away.</div>
          </div>
          <div className="work-grid">
            {selectedWork.map(([kicker, title, href]) => (
              <Link className="work-card" href={href} key={href}>
                <span className="work-kicker">{kicker}</span><h3>{title} →</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-title">Background</div>
            <div className="section-copy">A creative career built across visual work, audience growth and operations.</div>
          </div>
          <p className="lead">
            Photography began around 2018 and developed through 2019–20. Since then, the work has
            expanded into @fitswitharchie, more than three years of CapCut creator-community operations,
            affiliate and commerce partnerships, and web/content systems. The full CV keeps that
            chronology together rather than flattening it into one short biography.
          </p>
          <div className="stats">
            <div className="stat"><b>25K+</b><small>Social community</small></div>
            <div className="stat"><b>20M+</b><small>Views across creator content</small></div>
            <div className="stat"><b>3+ yrs</b><small>Creator community experience</small></div>
            <div className="stat"><b>2018</b><small>Photography journey begins</small></div>
          </div>
          <div className="home-background-actions">
            <Link className="cta" href="/cv">View full CV / background →</Link>
            <Link className="cta" href="/about">Explore by discipline →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
