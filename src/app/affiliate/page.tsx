import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Affiliate & Performance Partnerships",
  description: "Affiliate and performance partnership experience by Archie McNicol, covering creator-led traffic, registrations, activations and downstream conversion reporting.",
  alternates: { canonical: "/affiliate" },
};

export default function AffiliatePage() {
  return (
    <PageShell
      eyebrow="Affiliate / performance"
      title="Creative reach, measured downstream."
      intro="A performance-led part of the portfolio for affiliate, shipping and commerce partners where the useful story continues after the view: click, registration, activation and repeat customer behaviour."
      blocks={[
        {
          title: "ACBuy",
          copy: "A long-running creator and affiliate partnership tracked beyond social reach into registrations, activated users, parcels, freight activity and commission performance.",
        },
        {
          title: "USFans",
          copy: "A shorter affiliate campaign measured through the same funnel approach, separating registrations from genuinely activated users rather than treating every click as a conversion.",
        },
        {
          title: "Funnel reporting",
          copy: "Campaign performance is assessed chronologically from content and link traffic through signup, activation and partner-specific downstream events, making it easier to see where conversion actually happens.",
        },
        {
          title: "Campaign creative",
          copy: "The content remains part of the analysis. Strong affiliate work needs creator-native videos that build familiarity and trust, not just a dashboard viewed in isolation.",
          href: "/creator",
          ctaLabel: "View creator work",
        },
        {
          title: "Partnership structure",
          copy: "Experience working with recurring creator and affiliate arrangements, balancing content volume, performance expectations, tracking and the time needed for a new partner to build recognition.",
        },
        {
          title: "Qualified enquiries",
          copy: "Detailed commercial terms and partner-specific reporting are kept private, but relevant history and verified performance can be discussed directly with serious partners.",
          href: "/contact",
          ctaLabel: "Discuss a partnership",
        },
      ]}
    />
  );
}
