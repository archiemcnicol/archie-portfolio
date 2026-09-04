import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Archie McNicol — Creative Portfolio",
  description: "Creator, photographer and digital creative portfolio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
