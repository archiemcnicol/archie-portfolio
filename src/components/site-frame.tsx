"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/site-nav";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPhotography = pathname === "/photography";

  return (
    <div className="shell">
      <SiteNav />
      {children}
      {!isPhotography ? (
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>Archie McNicol — creator / photography / digital</span>
            <span>Selected work and collaborations</span>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
