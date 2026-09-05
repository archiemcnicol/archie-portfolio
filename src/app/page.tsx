import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const audience = [
  ["Brand work", "/creator", "Campaigns, partnerships and short-form creator work"],
  ["Photography", "/photography", "Travel, drone, event and lifestyle photography"],
  ["Business", "/business", "Websites, commercial photography and social content"],
  ["Professional", "/professional", "Community management, creative operations and experience"],
];

const selectedWork = [
  ["Creator", "Campaign films & fashion content", "/creator"],
  ["Photography", "Travel, events & aerial work", "/photography"],
  ["Commercial", "Web, content & digital projects", "/business"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Creator · Photographer · Community Manager</div>
          <h1 className="display">One body of work.<br />Different ways in.</h1>
          <p className="lead">
            Archie McNicol is a Buckinghamshire-based creator and photographer working across
            fashion and lifestyle content, brand campaigns, community management and digital projects.
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
            <div className="section-copy">Creator work, photography and digital projects built for different audiences.</div>
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
            <div className="section-title">About</div>
            <div className="section-copy">Creative work with the operational experience to back it up.</div>
          </div>
          <p className="lead">
            Alongside growing @fitswitharchie and delivering campaigns for brands including Nike,
            BOSS, Moschino and Superdry, Archie has spent more than three years supporting UK creators
            and community operations for CapCut. Photography, web work and performance-led partnerships
            sit alongside that same mix of creative and commercial experience.
          </p>
          <div className="stats">
            <div className="stat"><b>25K+</b><small>Social community</small></div>
            <div className="stat"><b>20M+</b><small>Views across creator content</small></div>
            <div className="stat"><b>3+ yrs</b><small>Creator community experience</small></div>
            <div className="stat"><b>UK</b><small>Buckinghamshire based</small></div>
          </div>
          <p style={{ marginTop: 28 }}><Link className="cta" href="/about">More about Archie →</Link></p>
        </div>
      </section>
    </main>
  );
}
