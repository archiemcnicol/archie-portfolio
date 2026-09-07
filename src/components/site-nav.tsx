"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./site-nav.module.css";

const workLinks = [
  ["Brand work", "/creator", "Campaigns & creator content"],
  ["Photography", "/photography", "Projects & full archive"],
  ["Professional", "/professional", "Community & operations"],
  ["Performance", "/affiliate", "Commerce & outcomes"],
  ["Digital", "/business", "Web & systems"],
] as const;

const profileLinks = [
  ["About", "/about", "Background, education & experience"],
  ["Contact", "/contact", "Work together"],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const menuLinks = Array.from(
        mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
      );
      const focusableElements: HTMLElement[] = [];
      if (menuButtonRef.current) focusableElements.push(menuButtonRef.current);
      focusableElements.push(...menuLinks);

      if (!focusableElements.length) return;

      const first = focusableElements[0]!;
      const last = focusableElements[focusableElements.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav nav-photography">
      <div className="wrap nav-inner">
        <Link className="site-brand" href="/" aria-label="Archie McNicol — home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-letter">A</span>
          </span>
          <span className="site-brand-name">Archie McNicol</span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className={styles.menuButton}
          data-open={menuOpen ? "true" : "false"}
          onClick={() => setMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={styles.menuPanel}
        data-open={menuOpen ? "true" : "false"}
        id="site-navigation"
      >
        <nav className={styles.menuInner} aria-label="Explore the site" ref={mobileNavRef}>
          <div className={styles.menuIntro}>
            <strong>Find exactly what you’re looking for.</strong>
            <span>Choose the work, background or contact route you came for.</span>
          </div>

          <div className={styles.groups}>
            <div>
              <span className={styles.groupLabel}>Work</span>
              <div className={styles.linkGrid}>
                {workLinks.map(([label, href, detail]) => (
                  <Link
                    aria-current={isActive(href) ? "page" : undefined}
                    className={styles.menuLink}
                    href={href}
                    key={href}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className={styles.groupLabel}>Profile</span>
              <div className={styles.profileLinks}>
                {profileLinks.map(([label, href, detail]) => (
                  <Link
                    aria-current={isActive(href) ? "page" : undefined}
                    className={styles.menuLink}
                    href={href}
                    key={href}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
