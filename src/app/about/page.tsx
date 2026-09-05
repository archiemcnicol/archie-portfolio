import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "About",
  description: "About Archie McNicol, a UK content creator, photographer, community manager and digital creative based in Buckinghamshire.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Creator, photographer and community builder."
      intro="Based in Buckinghamshire, Archie works across short-form content, photography, creator communities and digital projects — combining the creative side of making work with the operational side of getting it delivered properly."
      blocks={[
        {
          title: "Background",
          copy: "Content and photography developed alongside studies in Geography, Media Studies and Photography before becoming a full-time creative focus in 2026. The work now spans brand campaigns, community operations, photography and digital builds.",
        },
        {
          title: "Creator work",
          copy: "@fitswitharchie has grown into a 25K+ fashion and lifestyle community with more than 20M views across content, alongside work for brands including Nike, BOSS, Moschino and Superdry.",
          href: "/creator",
          ctaLabel: "View brand work",
        },
        {
          title: "Community",
          copy: "More than three years of creator-facing community work for CapCut UK, covering creator support, challenge operations, reporting, payment administration, bug escalation and communication between creators and central teams.",
          href: "/professional",
          ctaLabel: "Professional experience",
        },
        {
          title: "Photography",
          copy: "Travel, aerial, event and lifestyle photography made across the UK and internationally, with a large public archive and work also published through Pexels.",
          href: "/photography",
          ctaLabel: "View photography",
        },
        {
          title: "Digital",
          copy: "Web builds, content systems, reporting and performance-led projects sit alongside the visual work, with an emphasis on useful systems rather than generic presentation.",
          href: "/business",
          ctaLabel: "View commercial work",
        },
        {
          title: "Get in touch",
          copy: "For creator campaigns, photography, commercial projects, professional opportunities or something that crosses more than one of those areas.",
          href: "/contact",
          ctaLabel: "Contact Archie",
        },
      ]}
    />
  );
}
