import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { PUBLIC_PROFILE } from "@/lib/site";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteNav />
      <div className="site-content" id="main-content" tabIndex={-1}>
        {children}
      </div>

      <footer className="footer footer-compact">
        <div className="wrap footer-compact-main">
          <div className="footer-compact-name">
            <strong>Archie McNicol</strong>
            <span>Creator · Photographer · Digital Creative</span>
          </div>

          <nav className="footer-compact-group" aria-label="Footer work navigation">
            <span>Explore</span>
            <div className="footer-compact-links">
              <Link href="/creator">Brand work</Link>
              <Link href="/photography">Photography</Link>
              <Link href="/professional">Professional</Link>
              <Link href="/affiliate">Performance</Link>
              <Link href="/business">Digital</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>

          <div className="footer-compact-group">
            <span>Find me</span>
            <div className="footer-compact-links footer-social-links">
              <a href={`mailto:${PUBLIC_PROFILE.email}`}>Email</a>
              <a href={PUBLIC_PROFILE.instagram} rel="noreferrer" target="_blank">Instagram ↗</a>
              <a href={PUBLIC_PROFILE.tiktok} rel="noreferrer" target="_blank">TikTok ↗</a>
              <a href={PUBLIC_PROFILE.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a>
              <a href={PUBLIC_PROFILE.pexels} rel="noreferrer" target="_blank">Pexels ↗</a>
            </div>
          </div>
        </div>

        <div className="wrap footer-compact-bottom">
          <span>United Kingdom</span>
          <span>© 2026 Archie McNicol</span>
        </div>
      </footer>
    </div>
  );
}
