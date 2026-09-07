import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About — Archie McNicol",
  description: "Background, experience and education for Archie McNicol.",
  alternates: { canonical: "/about" },
  robots: { index: false, follow: true },
};

export default function CvPage() {
  redirect("/about#background");
}
