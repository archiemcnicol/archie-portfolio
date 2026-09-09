import type { Metadata } from "next";
import "./boss-media-centre.css";

export const metadata: Metadata = {
  alternates: { canonical: "/creator" },
};

export default function CreatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
