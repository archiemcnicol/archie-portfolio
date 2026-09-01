import Link from "next/link";

const links = [
  ["Creator", "/creator"],
  ["Photography", "/photography"],
  ["Business", "/business"],
  ["Affiliate", "/affiliate"],
  ["Professional", "/professional"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function SiteNav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="wordmark" href="/">Archie McNicol / Portfolio System</Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
