import type { ReactNode } from "react";

export default function PhotographyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      {children}
    </>
  );
}
