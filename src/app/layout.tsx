import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./polish.css";
import "./home-polish.css";
import "./identity-polish.css";
import { SiteFrame } from "@/components/site-frame";
import { PUBLIC_PROFILE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — Creator, Photographer & Digital Creative`,
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  keywords: [
    "Archie McNicol",
    "fitswitharchie",
    "UK content creator",
    "photographer",
    "community manager",
    "brand content",
    "TikTok creator",
  ],
  openGraph: {
    type: "website",
    siteName: `${SITE_NAME} Portfolio`,
    title: `${SITE_NAME} — Creator, Photographer & Digital Creative`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Creator, Photographer & Digital Creative`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111111",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  email: `mailto:${PUBLIC_PROFILE.email}`,
  jobTitle: "Content creator, community manager and photographer",
  homeLocation: { "@type": "Place", name: "Buckinghamshire, United Kingdom" },
  sameAs: [
    PUBLIC_PROFILE.tiktok,
    PUBLIC_PROFILE.linkedin,
    PUBLIC_PROFILE.pexels,
    PUBLIC_PROFILE.github,
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} Portfolio`,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  author: { "@type": "Person", name: SITE_NAME },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
