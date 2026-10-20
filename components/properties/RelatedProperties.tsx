import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getRelatedProperties } from "@/lib/properties";
import type { Property } from "@/types";
import { PropertyCard } from "./PropertyCard";

export function RelatedProperties({ property }: { property: Property }) {
  const related = getRelatedProperties(property, 3);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-neutral-200 bg-neutral-50 py-20 sm:py-28 lg:py-36">
      <Container>
        <h2 id="related-heading" className="text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight font-semibold">
          Related properties
        </h2>
        <ul className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {related.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <PropertyCard property={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
