"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import type { Property } from "@/types";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="border border-dashed border-neutral-300 px-6 py-20 text-center">
        <h2 className="text-2xl sm:text-3xl leading-tight tracking-tight font-semibold">No properties match these filters</h2>
        <p className="mx-auto mt-4 max-w-md text-base text-neutral-600">
          Try widening the price range, removing the bedroom filter or choosing a different area.
        </p>
        <Link href="/properties" className={buttonClasses("primary", "md", "mt-8")}>
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {properties.map((property, i) => (
          <motion.li
            key={property.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <PropertyCard property={property} priority={i < 2} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
