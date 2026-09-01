import Link from "next/link";

export function PageShell({
  eyebrow,
  title,
  intro,
  blocks,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: { title: string; copy: string; href?: string }[];
}) {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{eyebrow}</div>
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
              {block.href ? <Link className="cta" href={block.href}>Explore →</Link> : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
