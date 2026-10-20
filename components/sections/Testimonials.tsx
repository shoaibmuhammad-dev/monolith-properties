import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

function Card({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="flex w-[82vw] max-w-[460px] shrink-0 flex-col justify-between border border-neutral-800 p-8 sm:w-[440px]"
    >
      <blockquote className="text-lg text-neutral-200">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-8">
        <p className="font-heading font-semibold">{t.name}</p>
        <p className="mt-1 text-sm text-neutral-400">{t.role}</p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Section tone="dark" id="testimonials" labelledBy="testimonials-heading" className="overflow-hidden">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          tone="dark"
          title="What buyers, sellers and tenants say"
          description="Reviews from clients across Dubai and Abu Dhabi, including several who completed from overseas."
        />
      </Container>
      <div className="mt-14 overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex w-max gap-6 pl-6 hover:[animation-play-state:paused] animate-marquee motion-reduce:animate-none">
          {testimonials.map((t) => (
            <Card key={t.id} t={t} />
          ))}
          {testimonials.map((t) => (
            <Card key={`${t.id}-copy`} t={t} hidden />
          ))}
        </div>
      </div>
    </Section>
  );
}
