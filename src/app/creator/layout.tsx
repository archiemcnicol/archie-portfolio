import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/creator" },
};

export default function CreatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
