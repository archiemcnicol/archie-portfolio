import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">404 / Page not found</div>
          <h1>This page isn’t here.</h1>
          <p>
            The link may be old, the page may have moved, or there may simply be nothing at this address.
          </p>
        </div>
      </section>
      <section className="wrap blocks">
        <article className="block">
          <h3>Home</h3>
          <div><p>Start again from the main portfolio.</p><Link className="cta" href="/">Go home →</Link></div>
        </article>
        <article className="block">
          <h3>Brand work</h3>
          <div><p>Creator campaigns, partnerships and selected performance.</p><Link className="cta" href="/creator">View brand work →</Link></div>
        </article>
        <article className="block">
          <h3>Photography</h3>
          <div><p>Browse the full public photography archive.</p><Link className="cta" href="/photography">View photography →</Link></div>
        </article>
      </section>
    </main>
  );
}
