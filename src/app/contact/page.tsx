import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PUBLIC_PROFILE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Archie McNicol for creator campaigns, photography, commercial projects and professional opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Start with the right conversation."
      intro="For creator campaigns, photography, commercial projects and professional opportunities. Archie is based in Buckinghamshire, UK and works with clients across the UK and remotely."
      blocks={[
        {
          title: "Email",
          copy: PUBLIC_PROFILE.email,
          href: `mailto:${PUBLIC_PROFILE.email}`,
          ctaLabel: "Send an email",
        },
        {
          title: "Creator / TikTok",
          copy: "Fashion, lifestyle, events, product integrations and short-form campaign work through @fitswitharchie.",
          href: PUBLIC_PROFILE.tiktok,
          ctaLabel: "Open TikTok",
        },
        {
          title: "LinkedIn",
          copy: "Professional background, community management and wider creative experience.",
          href: PUBLIC_PROFILE.linkedin,
          ctaLabel: "Open LinkedIn",
        },
        {
          title: "Photography",
          copy: "Travel, aerial, event and lifestyle work, including a public photography archive and Pexels portfolio.",
          href: PUBLIC_PROFILE.pexels,
          ctaLabel: "Open Pexels",
        },
        {
          title: "Brand enquiries",
          copy: "For partnerships, campaign briefs, event work and paid creator opportunities, the Brand Work page gives the quickest overview of previous work and outcomes.",
          href: "/creator",
          ctaLabel: "View brand work",
        },
        {
          title: "Commercial projects",
          copy: "For websites, photography, social content or a project that needs a mix of creative and digital work.",
          href: "/business",
          ctaLabel: "View services",
        },
      ]}
    />
  );
}
