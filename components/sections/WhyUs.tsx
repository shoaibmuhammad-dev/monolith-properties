import { BadgeCheck, Landmark, MapPin, ReceiptText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Licensed and verified",
    text: "Every agent holds a valid broker licence, and every listing is checked against title and permit records before it goes live.",
  },
  {
    icon: ReceiptText,
    title: "Fees in writing",
    text: "Commission, transfer fees and service charges are itemised before you commit, and the final invoice matches the quote.",
  },
  {
    icon: MapPin,
    title: "Agents who live here",
    text: "Our team works in the communities they sell, so you get honest answers on noise, traffic, schools and real rental yields.",
  },
  {
    icon: Landmark,
    title: "Support after the keys",
    text: "Mortgage introductions, Ejari, utilities, renewals and property management are all handled in-house or with partners we trust.",
  },
];

export function WhyUs() {
  return (
    <Section tone="dark" id="why-us" labelledBy="why-heading">
      <Container>
        <SectionHeading
          id="why-heading"
          tone="dark"
          title="Why clients choose Monolith Properties"
          description="Property decisions are large and often made from abroad. We earn trust by showing our work."
        />
        <ul className="mt-16 grid gap-px bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li key={b.title} className="bg-black">
              <Reveal delay={i * 0.08} className="h-full p-8 lg:p-10">
                <b.icon className="size-9" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-10 text-xl leading-snug font-semibold">{b.title}</h3>
                <p className="mt-3 text-base text-neutral-400">{b.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
