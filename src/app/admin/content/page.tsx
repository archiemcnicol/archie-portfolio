import { notFound } from "next/navigation";
import { TikTokScanner } from "@/components/tiktok-scanner";
import "./admin.css";

export const metadata = {
  title: "Content Review — Archie Portfolio Admin",
  robots: { index: false, follow: false },
};

export default function ContentReviewPage() {
  const adminEnabled =
    process.env.ENABLE_ADMIN === "true" || process.env.VERCEL_ENV === "preview";

  if (!adminEnabled) {
    notFound();
  }

  return (
    <main>
      <section className="page-hero admin-hero">
        <div className="wrap">
          <div className="eyebrow">Private admin / content library</div>
          <h1>Review before it becomes portfolio.</h1>
          <p>
            Import historic social data, identify likely commercial work and verify each
            match before anything is surfaced to brands or clients.
          </p>
        </div>
      </section>
      <section className="wrap admin-page">
        <TikTokScanner />
      </section>
    </main>
  );
}
