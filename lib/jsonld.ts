import { siteConfig } from "@/data/site";
import { absoluteUrl, typeLabels } from "@/lib/utils";
import type { FAQ, Property } from "@/types";

const address = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.region,
  addressCountry: siteConfig.address.countryCode,
};

export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteUrl("/#agency"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/opengraph-image"),
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: ["Dubai", "Abu Dhabi", "United Arab Emirates"],
    openingHoursSpecification: siteConfig.hoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(siteConfig.socials),
  };
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function listingJsonLd(p: Property) {
  const url = absoluteUrl(`/properties/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: p.description.replace(/\n+/g, " "),
    url,
    datePosted: p.createdAt,
    image: p.images,
    category: typeLabels[p.type],
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url,
      businessFunction:
        p.purpose === "sale"
          ? "http://purl.org/goodrelations/v1#Sell"
          : "http://purl.org/goodrelations/v1#LeaseOut",
      seller: { "@id": absoluteUrl("/#agency") },
    },
    about: {
      "@type": p.type === "apartment" ? "Apartment" : p.type === "house" ? "House" : "Place",
      name: p.title,
      address: {
        "@type": "PostalAddress",
        streetAddress: p.location.address,
        addressLocality: p.location.city,
        addressCountry: "AE",
      },
      geo: { "@type": "GeoCoordinates", latitude: p.location.lat, longitude: p.location.lng },
      floorSize: { "@type": "QuantitativeValue", value: p.areaSqft, unitCode: "FTK" },
      ...(p.type === "apartment" || p.type === "house"
        ? { numberOfBedrooms: p.bedrooms, numberOfBathroomsTotal: p.bathrooms }
        : {}),
      ...(p.yearBuilt ? { yearBuilt: p.yearBuilt } : {}),
    },
  };
}
