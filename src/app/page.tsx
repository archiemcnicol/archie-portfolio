import Link from "next/link";

const audience = [
  ["Brand work", "/creator", "Campaigns, partnerships and short-form creator work"],
  ["Business", "/business", "Websites, commercial photography and social content"],
  ["Affiliate / shipping", "/affiliate", "Traffic, activations, conversions and partnerships"],
  ["Professional", "/professional", "Experience, skills, work history and selected results"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Creator · Photographer · Digital Creative</div>
          <h1 className="display">One body of work.<br />Different ways in.</h1>
          <p className="lead">
            A modular portfolio built to move seamlessly between creator work, photography,
            commercial projects, digital services and performance-led partnerships.
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
            <div className="section-copy">A visual first impression before the numbers, decks and case studies.</div>
          </div>
          <div className="work-grid">
            <article className="work-card"><span className="work-kicker">Creator</span><h3>Campaign films & fashion content</h3></article>
            <article className="work-card"><span className="work-kicker">Photography</span><h3>Travel, events & lifestyle</h3></article>
            <article className="work-card"><span className="work-kicker">Commercial</span><h3>Brands, businesses & digital builds</h3></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-title">About</div>
            <div className="section-copy">Creative work with a commercial brain behind it.</div>
          </div>
          <p className="lead">
            This homepage stays intentionally broad. Brand work now has its own focused view,
            while detailed analytics, commercial terms and private client material remain protected.
          </p>
          <div className="stats">
            <div className="stat"><b>Creator</b><small>Content & partnerships</small></div>
            <div className="stat"><b>Photo</b><small>Portfolio & commissions</small></div>
            <div className="stat"><b>Digital</b><small>Web & social services</small></div>
            <div className="stat"><b>Data</b><small>Performance & analytics</small></div>
          </div>
        </div>
      </section>
    </main>
  );
}
