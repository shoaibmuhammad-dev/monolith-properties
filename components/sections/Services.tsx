import { Building2, FileText, Home, Key, TrendingUp, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { ServiceIcon } from "@/types";

const icons: Record<ServiceIcon, LucideIcon> = {
  buy: Home,
  sell: Building2,
  rent: Key,
  management: Wrench,
  investment: TrendingUp,
  legal: FileText,
};

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          title="One agency for every step of owning property"
          description="Whether you are buying your first home, letting an investment or selling a villa, the same team stays with you from first call to keys."
        />
        <ul className="mt-16 grid border-l border-t border-neutral-300 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.id} className="border-b border-r border-neutral-300">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="group relative isolate flex h-full min-h-72 flex-col overflow-hidden p-8 transition-colors duration-500 hover:text-white">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    <Icon className="size-8" aria-hidden="true" strokeWidth={1.5} />
                    <h3 className="mt-auto pt-12 text-2xl sm:text-3xl leading-tight tracking-tight font-bold">{s.title}</h3>
                    <p className="mt-3 text-base text-neutral-600 transition-colors duration-500 group-hover:text-neutral-300">
                      {s.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
