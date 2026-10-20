"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { Bath, BedDouble, Maximize } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { bedroomLabel, formatNumber, formatPrice, isResidential, truncate } from "@/lib/utils";
import { useRef } from "react";
import type { Property } from "@/types";

function StackCard({
  property,
  index,
  total,
  progress,
}: {
  property: Property;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const last = index === total - 1;
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, last ? 0 : 0.6]);
  const residential = isResidential(property);

  return (
    <div className="sticky top-0 flex h-svh items-start justify-center pt-20 sm:pt-24">
      <motion.article
        style={{ scale, top: index * 20 }}
        className="relative grid h-[min(78svh,640px)] w-full origin-top overflow-hidden bg-white text-black md:grid-cols-[1.3fr_1fr]"
      >
        <div className="relative min-h-0 bg-neutral-200">
          <SmartImage
            src={property.images[0]}
            alt={`${property.title} in ${property.location.area}`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
          <StatusBadge purpose={property.purpose} className="absolute left-4 top-4" />
        </div>
        <div className="relative flex flex-col justify-between gap-4 p-6 sm:p-10">
          <div>
            <p className="text-sm text-neutral-600">
              {property.location.area}, {property.location.city}
            </p>
            <h3 className="mt-3 text-2xl sm:text-3xl leading-tight tracking-tight font-bold">
              <Link
                href={`/properties/${property.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {property.title}
              </Link>
            </h3>
            <p className="mt-4 hidden text-base text-neutral-600 sm:block">
              {truncate(property.description.split("\n")[0], 150)}
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl leading-tight tracking-tight font-bold">{formatPrice(property.price, property.purpose)}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-4 text-sm text-neutral-700">
              {residential ? (
                <>
                  <li className="flex items-center gap-2">
                    <BedDouble className="size-4" aria-hidden="true" /> {bedroomLabel(property.bedrooms)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Bath className="size-4" aria-hidden="true" /> {property.bathrooms} baths
                  </li>
                </>
              ) : null}
              <li className="flex items-center gap-2">
                <Maximize className="size-4" aria-hidden="true" /> {formatNumber(property.areaSqft)} sq ft
              </li>
            </ul>
          </div>
        </div>
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.article>
    </div>
  );
}

export function FeaturedStack({ properties }: { properties: Property[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <Section tone="dark" id="featured" labelledBy="featured-heading">
      <Container>
        <SectionHeading
          id="featured-heading"
          tone="dark"
          title="Featured properties for sale and rent"
          description="A short list of homes we would put our own name to. Scroll to move through them."
        />
      </Container>

      {reduce ? (
        <Container className="mt-14">
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((p) => (
              <li key={p.id} className="text-black">
                <PropertyCard property={p} />
              </li>
            ))}
          </ul>
        </Container>
      ) : (
        <Container className="mt-14">
          <div ref={container} className="relative">
            {properties.map((p, i) => (
              <StackCard key={p.id} property={p} index={i} total={properties.length} progress={scrollYProgress} />
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-14 flex justify-center">
        <Button href="/properties" variant="inverse" size="lg" arrow>
          Browse all properties
        </Button>
      </Container>
    </Section>
  );
}
