import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { Areas } from "@/components/sections/Areas";
import { FAQ } from "@/components/sections/FAQ";
import { FeaturedStack } from "@/components/sections/FeaturedStack";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WhyUs } from "@/components/sections/WhyUs";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";
import { faqJsonLd, realEstateAgentJsonLd } from "@/lib/jsonld";
import { getFeaturedProperties, getLocations } from "@/lib/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} | Real estate agency in Dubai and Abu Dhabi`,
    description:
      "Real estate agency in Dubai and Abu Dhabi. Browse apartments for rent, houses for sale and plots for sale, with licensed agents and fees in writing.",
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Real estate agency in Dubai and Abu Dhabi` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), faqJsonLd(faqs)]} />
      <Hero locations={getLocations()} />
      <StatsStrip />
      <FeaturedStack properties={getFeaturedProperties(5)} />
      <Services />
      <WhyUs />
      <Areas />
      <Process />
      <Team />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}
