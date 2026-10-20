import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Calendar, Check, Maximize, MapPin } from "lucide-react";
import { WhatsAppMessage } from "@/components/layout/WhatsAppContext";
import { EnquiryCard } from "@/components/properties/EnquiryCard";
import { Gallery } from "@/components/properties/Gallery";
import { LazyMap } from "@/components/properties/LazyMap";
import { RelatedProperties } from "@/components/properties/RelatedProperties";
import { StatusBadge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, listingJsonLd } from "@/lib/jsonld";
import { getAgentById, getAllProperties, getPropertyBySlug } from "@/lib/properties";
import { buildMetadata } from "@/lib/seo";
import { bedroomLabel, formatNumber, formatPrice, isResidential, truncate, typeLabels } from "@/lib/utils";
import { getPropertyMessage } from "@/lib/whatsapp";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  const verb = property.purpose === "sale" ? "for sale" : "for rent";
  return buildMetadata({
    title: `${property.title}, ${property.location.area}`,
    description: truncate(
      `${typeLabels[property.type]} ${verb} in ${property.location.area}, ${property.location.city} at ${formatPrice(property.price, property.purpose)}. ${property.description.split("\n")[0]}`,
      158,
    ),
    path: `/properties/${property.slug}`,
  });
}

export default async function PropertyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const path = `/properties/${property.slug}`;
  const residential = isResidential(property);

  const facts = [
    residential && { icon: BedDouble, label: "Bedrooms", value: bedroomLabel(property.bedrooms) },
    residential && { icon: Bath, label: "Bathrooms", value: String(property.bathrooms) },
    { icon: Maximize, label: "Area", value: `${formatNumber(property.areaSqft)} sq ft` },
    property.yearBuilt && { icon: Calendar, label: "Year built", value: String(property.yearBuilt) },
  ].filter(Boolean) as { icon: typeof Bath; label: string; value: string }[];

  return (
    <>
      <JsonLd
        data={[
          listingJsonLd(property),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: property.title, path },
          ]),
        ]}
      />
      <WhatsAppMessage message={getPropertyMessage(property.title, path)} />

      <article className="pt-28 sm:pt-32">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Properties", href: "/properties" },
              { name: property.title },
            ]}
          />

          <header className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <StatusBadge purpose={property.purpose} />
                <span className="text-sm text-neutral-600">{typeLabels[property.type]}</span>
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight font-bold">{property.title}</h1>
              <p className="mt-4 flex items-start gap-2 text-lg text-neutral-600">
                <MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />
                {property.location.address}
              </p>
            </div>
            <p className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight font-bold">{formatPrice(property.price, property.purpose)}</p>
          </header>

          <div className="mt-10">
            <Gallery images={property.images} title={property.title} location={`${property.location.area}, ${property.location.city}`} />
          </div>

          <div className="mt-14 grid gap-14 pb-20 sm:pb-28 lg:pb-36 lg:grid-cols-[1fr_400px] lg:gap-16">
            <div>
              <h2 className="sr-only">Key facts</h2>
              <dl className="grid grid-cols-2 border-l border-t border-neutral-300 sm:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="border-b border-r border-neutral-300 p-5">
                    <f.icon className="size-5" aria-hidden="true" />
                    <dt className="mt-4 text-sm text-neutral-600">{f.label}</dt>
                    <dd className="mt-1 font-heading text-xl leading-snug font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <section aria-labelledby="description-heading" className="mt-14">
                <h2 id="description-heading" className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">
                  About this property
                </h2>
                <div className="mt-6 max-w-prose space-y-5 text-lg text-neutral-700">
                  {property.description.split("\n\n").map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </section>

              <section aria-labelledby="amenities-heading" className="mt-14">
                <h2 id="amenities-heading" className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">
                  Amenities
                </h2>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 border-b border-neutral-200 py-3">
                      <Check className="size-4 shrink-0" aria-hidden="true" /> {a}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="location-heading" className="mt-14">
                <h2 id="location-heading" className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">
                  Location
                </h2>
                <p className="mb-6 mt-3 text-neutral-600">
                  {property.location.area}, {property.location.city}.{" "}
                  <Link
                    href={`/properties?location=${encodeURIComponent(property.location.area)}`}
                    className="underline underline-offset-4"
                  >
                    More properties in {property.location.area}
                  </Link>
                </p>
                <LazyMap lat={property.location.lat} lng={property.location.lng} title={property.title} />
              </section>
            </div>

            <div>
              <EnquiryCard property={property} agent={agent} />
            </div>
          </div>
        </Container>
      </article>

      <RelatedProperties property={property} />
    </>
  );
}
