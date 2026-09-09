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
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "commons.wikimedia.org", pathname: "/wiki/Special:Redirect/file/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/i1xhlvd6/**" },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/**",
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
