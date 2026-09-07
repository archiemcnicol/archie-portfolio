import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema, serialiseJsonLd } from "@/lib/structured-data";
import styles from "./web.module.css";

export const metadata: Metadata = {
  title: "Web & Digital Projects — Archie McNicol",
  description: "Web and digital project work by Archie McNicol across portfolio sites, content systems, analytics and deployment workflows.",
  alternates: { canonical: "/business/web" },
};

const stack = ["Next.js", "React", "Vercel", "Supabase", "Cloudinary"];
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Business & Commercial Work", path: "/business" },
  { name: "Web & Digital Projects", path: "/business/web" },
]);

export default function WebWorkPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbSchema) }}
        type="application/ld+json"
      />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`wrap ${styles.heroGrid}`}>
            <div><div className={styles.kicker}>Business / web</div><h1>Build the system around the work.</h1></div>
            <p>Portfolio sites and content systems built to stay easy to update, verify and maintain.</p>
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
                A Next.js site combining a 616-image photography archive, structured campaign data,
                performance reporting, SEO and deployment checks.
              </p>
              <ul>
                <li>Responsive App Router build</li>
                <li>616-image photography archive</li>
                <li>Structured campaign data</li>
                <li>Automated release verification</li>
                <li>Vercel deployment</li>
                <li>Supabase source / recovery tables</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.links}>
          <div className="wrap"><Link href="/business">← Commercial work</Link><Link href="/contact">Web project enquiry ↗</Link></div>
        </section>
      </main>
    </>
  );
}
