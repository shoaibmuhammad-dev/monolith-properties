import { Filters } from "@/components/properties/Filters";
import { Pagination } from "@/components/properties/Pagination";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppMessage } from "@/components/layout/WhatsAppContext";
import { filterProperties, paginate, parseFilters, sortProperties } from "@/lib/filters";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getAllProperties, getLocations } from "@/lib/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Properties for sale and rent in Dubai and Abu Dhabi",
  description:
    "Browse houses for sale, apartments for rent, plots and commercial property across Dubai and Abu Dhabi. Filter by price, bedrooms and area.",
  path: "/properties",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = parseFilters(await searchParams);
  const results = sortProperties(filterProperties(getAllProperties(), filters), filters.sort);
  const { items, page, totalPages, total } = paginate(results, filters.page);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties" },
        ])}
      />
      <PageHero
        title="Properties for sale and rent in the UAE"
        description="Houses, apartments, plots and commercial space in Dubai and Abu Dhabi. Every listing is verified by our team."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Properties" }]}
      />
      <section aria-label="Property listings" className="bg-white py-12 sm:py-16">
        <Container>
          <Filters filters={filters} locations={getLocations()} />
          <p className="mb-8 mt-10 text-lg font-medium" role="status" aria-live="polite">
            {total} {total === 1 ? "property" : "properties"} found
          </p>
          <PropertyGrid properties={items} />
          <Pagination filters={filters} page={page} totalPages={totalPages} />
        </Container>
      </section>
      <WhatsAppMessage message="Hello, I'm browsing your listings and need help finding a property." />
    </>
  );
}
