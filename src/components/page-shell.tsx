import Link from "next/link";

type PageBlock = {
  title: string;
  copy: string;
  href?: string;
  ctaLabel?: string;
};

function BlockLink({ block }: { block: PageBlock }) {
  if (!block.href) return null;

  const label = block.ctaLabel ?? "Explore";
  const isExternal = /^(https?:|mailto:)/.test(block.href);

  if (isExternal) {
    return (
      <a
        className="cta"
        href={block.href}
        rel={block.href.startsWith("http") ? "noreferrer" : undefined}
        target={block.href.startsWith("http") ? "_blank" : undefined}
      >
        {label} →
      </a>
    );
  }

  return <Link className="cta" href={block.href}>{label} →</Link>;
}

export function PageShell({
  eyebrow,
  title,
  intro,
  blocks,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: PageBlock[];
}) {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <nav className="eyebrow" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <span>{eyebrow}</span>
          </nav>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="wrap blocks">
        {blocks.map((block) => (
          <article className="block" key={block.title}>
            <h3>{block.title}</h3>
            <div>
              <p>{block.copy}</p>
              <BlockLink block={block} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
