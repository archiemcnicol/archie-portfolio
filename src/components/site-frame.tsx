import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { PUBLIC_PROFILE } from "@/lib/site";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <SiteNav />
      {children}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-intro">
            <strong>Archie McNicol</strong>
            <p>Content creator, community manager and photographer based in Buckinghamshire, UK.</p>
          </div>

          <nav className="footer-column" aria-label="Footer work navigation">
            <span>Explore</span>
            <Link href="/creator">Brand work</Link>
            <Link href="/photography">Photography</Link>
            <Link href="/affiliate">Performance</Link>
            <Link href="/cv">CV / background</Link>
          </nav>

          <div className="footer-column">
            <span>Contact</span>
            <a href={`mailto:${PUBLIC_PROFILE.email}`}>{PUBLIC_PROFILE.email}</a>
            <a href={PUBLIC_PROFILE.tiktok} rel="noreferrer" target="_blank">TikTok ↗</a>
            <a href={PUBLIC_PROFILE.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>Buckinghamshire, United Kingdom</span>
          <span>© 2026 Archie McNicol</span>
        </div>
      </footer>
    </div>
  );
}
