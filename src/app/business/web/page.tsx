import type { Metadata } from "next";
import Link from "next/link";
import styles from "./web.module.css";

export const metadata: Metadata = {
  title: "Web & Digital Projects",
  description: "Web and digital project work by Archie McNicol across portfolio sites, content systems, analytics and deployment workflows.",
  alternates: { canonical: "/business/web" },
};

const stack = ["Next.js", "React", "Vercel", "GitHub", "Supabase", "Cloudinary"];

export default function WebWorkPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div><div className={styles.kicker}>Business / web</div><h1>Build the system around the work.</h1></div>
          <p>Portfolio sites, landing pages and content systems designed around how the material will actually be updated, measured and maintained.</p>
        </div>
      </section>

      <section className={styles.stackBand}>
        <div className="wrap">
          <span>Current stack</span>
          <div>{stack.map((item) => <strong key={item}>{item}</strong>)}</div>
        </div>
      </section>

      <section className={styles.caseStudy}>
        <div className={`wrap ${styles.caseGrid}`}>
          <div><span>Current case study</span><h2>This portfolio.</h2></div>
          <div>
            <p>
              The site itself is an example of the approach: a Next.js portfolio that combines a
              large photography archive, brand-work data, performance case studies, SEO metadata,
              deployment checks and private source data without turning the public experience into an admin dashboard.
            </p>
            <ul>
              <li>Responsive App Router build</li>
              <li>616-image public photography archive</li>
              <li>Structured brand and campaign data</li>
              <li>GitHub verification before release</li>
              <li>Vercel deployment workflow</li>
              <li>Private Supabase recovery / source tables</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.principles}>
        <div className="wrap">
          <div><span>01</span><strong>Clear first</strong><p>Structure information around what a visitor needs to find rather than around the tool used to build it.</p></div>
          <div><span>02</span><strong>Maintainable</strong><p>Keep data and repeated content structured so future additions do not require rebuilding the page from scratch.</p></div>
          <div><span>03</span><strong>Measured</strong><p>Include the boring-but-important layer: metadata, verification, performance checks and deployment discipline.</p></div>
        </div>
      </section>

      <section className={styles.links}>
        <div className="wrap"><Link href="/business">← Commercial work</Link><Link href="/contact">Web project enquiry ↗</Link></div>
      </section>
    </main>
  );
}
