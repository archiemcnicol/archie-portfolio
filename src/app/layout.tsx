import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Archie McNicol — Creative Portfolio",
  description: "Creator, photographer and digital creative portfolio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <SiteNav />
          {children}
          <footer className="footer">
            <div className="wrap footer-inner">
              <span>Archie McNicol — creator / photography / digital</span>
              <span>Selected work and collaborations</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
