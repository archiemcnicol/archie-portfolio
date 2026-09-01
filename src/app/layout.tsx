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
              <span>Archie McNicol — creative / digital / commercial</span>
              <span>Portfolio system v0.1</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
