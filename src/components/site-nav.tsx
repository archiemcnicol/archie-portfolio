"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["Brand work", "/creator"],
  ["Photography", "/photography"],
  ["Business", "/business"],
  ["Affiliate", "/affiliate"],
  ["Professional", "/professional"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="site-brand" href="/" aria-label="Archie McNicol — home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-letter">A</span>
          </span>
          <span className="site-brand-name">Archie McNicol</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              aria-current={isActive(href) ? "page" : undefined}
              className={isActive(href) ? "nav-link-active" : undefined}
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="nav-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={`mobile-nav ${menuOpen ? "mobile-nav-open" : ""}`}
        id="mobile-navigation"
      >
        <nav className="wrap mobile-nav-inner" aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <Link
              aria-current={isActive(href) ? "page" : undefined}
              className={isActive(href) ? "nav-link-active" : undefined}
              href={href}
              key={href}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
              <b>↗</b>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
