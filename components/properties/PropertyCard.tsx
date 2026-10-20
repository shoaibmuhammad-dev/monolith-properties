import Link from "next/link";
import { Bath, BedDouble, Maximize } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";
import { bedroomLabel, formatNumber, formatPrice, isResidential, typeLabels } from "@/lib/utils";
import type { Property } from "@/types";

export function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const residential = isResidential(property);
  return (
    <article className="group relative flex h-full flex-col border border-neutral-200 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <SmartImage
          src={property.images[0]}
          alt={`${property.title} in ${property.location.area}, ${property.location.city}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <StatusBadge purpose={property.purpose} className="absolute left-4 top-4" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xl font-semibold leading-snug">
          {formatPrice(property.price, property.purpose)}
        </p>
        <h3 className="font-heading mt-2 text-lg font-semibold leading-snug">
          <Link
            href={`/properties/${property.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          {property.location.area}, {property.location.city}
        </p>
        <ul
          className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-4 text-sm text-neutral-700"
          style={{ marginTop: "1.25rem" }}
        >
          {residential ? (
            <>
              <li className="flex items-center gap-2">
                <BedDouble className="size-4" aria-hidden="true" />{" "}
                {bedroomLabel(property.bedrooms)}
              </li>
              <li className="flex items-center gap-2">
                <Bath className="size-4" aria-hidden="true" /> {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "bath" : "baths"}
              </li>
            </>
          ) : (
            <li>{typeLabels[property.type]}</li>
          )}
          <li className="flex items-center gap-2">
            <Maximize className="size-4" aria-hidden="true" /> {formatNumber(property.areaSqft)} sq
            ft
          </li>
        </ul>
      </div>
    </article>
  );
}
