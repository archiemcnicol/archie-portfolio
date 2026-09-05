import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PUBLIC_PROFILE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professional Experience",
  description: "Professional experience of Archie McNicol across community management, creator support, content production, photography and digital projects.",
  alternates: { canonical: "/professional" },
};

export default function ProfessionalPage() {
  return (
    <PageShell
      eyebrow="Professional profile"
      title="Creative work backed by community and operations."
      intro="Experience across creator communities, content production, photography and digital projects — including more than three years supporting UK creators and community operations for CapCut."
      blocks={[
        {
          title: "CapCut UK",
          copy: "Creator-facing community management covering day-to-day support, challenge operations, payment administration, bug escalation, reporting and communication between UK creators and central teams.",
        },
        {
          title: "Content creation",
          copy: "Building and operating @fitswitharchie alongside paid and gifted campaign work, with hands-on responsibility for concepts, styling, filming, presenting, editing and delivery.",
          href: "/creator",
          ctaLabel: "View brand work",
        },
        {
          title: "Photography",
          copy: "Travel, aerial, event and lifestyle photography, from capture and editing through to portfolio presentation and commercial use.",
          href: "/photography",
          ctaLabel: "View portfolio",
        },
        {
          title: "Digital & web",
          copy: "Website builds, asset organisation, reporting workflows and practical digital systems that connect creative work with how it is published, measured and maintained.",
          href: "/business",
          ctaLabel: "View commercial work",
        },
        {
          title: "Performance partnerships",
          copy: "Experience with affiliate and commerce partnerships where reporting extends beyond views into registrations, activations and downstream customer activity.",
          href: "/affiliate",
          ctaLabel: "View performance work",
        },
        {
          title: "LinkedIn",
          copy: "For the concise professional profile and current role history.",
          href: PUBLIC_PROFILE.linkedin,
          ctaLabel: "View LinkedIn",
        },
      ]}
    />
  );
}
