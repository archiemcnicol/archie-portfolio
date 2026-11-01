import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // These public assets can change at the same URL; use a bounded TTL,
      // rather than marking mutable filenames immutable for a year.
      ...["/brand-work/:path*", "/portfolio/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      })),
    ];
  },
  images: {
    // Vercel's production image optimiser is currently returning HTTP 402
    // (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED). The site's media is already
    // published as web-ready assets, so serve source files directly instead.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org", pathname: "/wiki/Special:Redirect/file/**" },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/archiemcnicol/archie-portfolio@c1d1e173c706b9b4e250668b7aaa31747d5290ce/public/portfolio/archive/**",
      },
    ],
    localPatterns: [
      { pathname: "/portfolio/archive/**" },
      { pathname: "/portfolio/web/**" },
      { pathname: "/brand-work/**" },
    ],
  },
};

export default nextConfig;
