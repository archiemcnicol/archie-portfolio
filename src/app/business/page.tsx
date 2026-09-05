import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Business & Commercial Work",
  description: "Commercial web, photography and social-content work by Archie McNicol for brands, businesses and independent projects.",
  alternates: { canonical: "/business" },
};

export default function BusinessPage() {
  return (
    <PageShell
      eyebrow="Business / commercial"
      title="Creative work built to be useful."
      intro="A commercial layer for businesses and independent brands that need strong visuals, a better web presence or content that can actually be used across social, campaigns and day-to-day marketing."
      blocks={[
        {
          title: "Websites & landing pages",
          copy: "Responsive portfolio, service and campaign sites with clear information architecture, modern frontend development and the practical details needed to publish and maintain them.",
        },
        {
          title: "Commercial photography",
          copy: "People, products, spaces, hospitality, retail and events photographed for websites, social media, launches and ongoing brand use.",
          href: "/photography",
          ctaLabel: "View photography",
        },
        {
          title: "Social content",
          copy: "Short-form video and content batches shaped around how a brand will actually publish them — from concept and filming through edit and delivery.",
          href: "/creator",
          ctaLabel: "See creator work",
        },
        {
          title: "Content systems",
          copy: "Organising campaign assets, portfolio libraries, reporting and lightweight workflows so creative work stays findable and useful after it has been delivered.",
        },
        {
          title: "Who it suits",
          copy: "Independent brands, local businesses, creators and teams that want one person to understand both the visual work and the digital system around it.",
        },
        {
          title: "Project enquiry",
          copy: "If the project combines a website, photography and content, it can be scoped as one joined-up piece of work rather than three disconnected jobs.",
          href: "/contact",
          ctaLabel: "Discuss a project",
        },
      ]}
    />
  );
}
