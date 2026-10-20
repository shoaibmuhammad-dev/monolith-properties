import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { areas } from "@/data/areas";
import { countByArea } from "@/lib/properties";

export function Areas() {
  return (
    <Section id="areas" labelledBy="areas-heading" className="overflow-hidden">
      <Container>
        <SectionHeading
          id="areas-heading"
          title="Areas we cover across Dubai and Abu Dhabi"
          description="From waterfront apartments in Dubai Marina to villa plots on Yas Island. Pick a community to see what's available."
        />
      </Container>
      <div className="no-scrollbar mt-14 overflow-x-auto pb-4">
        <ul className="flex w-max snap-x gap-5 px-5 sm:px-8 lg:px-12">
          {areas.map((area) => {
            const count = countByArea(area.name);
            return (
              <li
                key={area.name}
                className="w-[78vw] max-w-[380px] shrink-0 snap-start sm:w-[360px]"
              >
                <Link
                  href={`/properties?location=${encodeURIComponent(area.name)}`}
                  className="group relative block aspect-[4/5] overflow-hidden bg-neutral-200 text-white"
                >
                  <SmartImage
                    src={area.image}
                    alt={`${area.name}, ${area.city}`}
                    fill
                    sizes="(min-width: 640px) 360px, 78vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <span>
                      <span className="font-heading block text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                        {area.name}
                      </span>
                      <span className="mt-2 block max-w-[28ch] text-sm text-neutral-300">
                        {area.blurb}
                      </span>
                      <span className="mt-3 block text-sm font-medium">
                        {count} {count === 1 ? "listing" : "listings"}
                      </span>
                    </span>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
