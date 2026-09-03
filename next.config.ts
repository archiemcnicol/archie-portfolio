import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "commons.wikimedia.org", pathname: "/wiki/Special:Redirect/file/**" },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/**",
      },
    ],
    localPatterns: [{ pathname: "/api/tiktok-cover" }],
  },
};

export default nextConfig;
