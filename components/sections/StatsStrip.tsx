import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export function StatsStrip() {
  return (
    <section aria-label="Our track record" className="bg-white py-16 text-black sm:py-24">
      <Container>
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {siteConfig.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-l border-neutral-300 pl-6 sm:pl-8">
              <dd className="font-heading text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight font-bold">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-3 max-w-[16ch] text-sm text-neutral-600">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
