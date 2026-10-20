import { CtaBanner } from "@/components/sections/CtaBanner";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Team } from "@/components/sections/Team";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, realEstateAgentJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About our real estate agency in Dubai and Abu Dhabi",
  description: `${siteConfig.name} is a licensed real estate agency in the UAE. Meet the team, see our track record and learn how we work.`,
  path: "/about",
});

const principles = [
  {
    title: "Say the number",
    text: "We show prices, fees, service charges and realistic yields up front, including the figures that make a deal less attractive.",
  },
  {
    title: "Recommend what we would buy",
    text: "If a property doesn't suit your goals, we tell you and explain why, even when it means no commission this month.",
  },
  {
    title: "Stay after completion",
    text: "Handover is the start of the relationship. We manage tenants, renewals and resales for clients who ask us to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          realEstateAgentJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <PageHero
        title="A real estate agency built on transparency"
        description="We started Monolith Properties to give buyers, tenants and owners in the UAE the clear answers we wished we had when we first invested here."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      />

      <Section labelledBy="story-heading">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="story-heading" className="text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight font-bold">
            Local expertise, written down
          </h2>
          <div className="max-w-prose space-y-5 text-lg text-neutral-700">
            <p>
              {siteConfig.name} is a real estate agency in Dubai with an office in Abu Dhabi. For more than a
              decade our agents have helped families buy their first home, investors build portfolios and owners
              sell or let with confidence.
            </p>
            <p>
              We cover sales, rentals, property management and investment advisory across communities from Dubai
              Marina to Yas Island. Many of our clients live overseas, so we run video viewings, send complete
              document packs and keep every step of the process in writing.
            </p>
          </div>
        </Container>
      </Section>

      <StatsStrip />

      <Section tone="dark" labelledBy="principles-heading">
        <Container>
          <h2 id="principles-heading" className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight font-bold">
            How we work
          </h2>
          <ul className="mt-14 grid gap-px bg-neutral-800 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-black">
                <Reveal delay={i * 0.08} className="h-full p-8 lg:p-10">
                  <h3 className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">{p.title}</h3>
                  <p className="mt-4 text-base text-neutral-400">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Team heading="The team behind your next move" />
      <CtaBanner />
    </>
  );
}
