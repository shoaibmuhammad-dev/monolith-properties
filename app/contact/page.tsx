import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppMessage } from "@/components/layout/WhatsAppContext";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { MapEmbed } from "@/components/properties/MapEmbed";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, realEstateAgentJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppLink, getPageMessage } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact our real estate agents in Dubai",
  description: `Speak to ${siteConfig.name} about buying, selling or renting property in the UAE. Call, message us on WhatsApp or send an enquiry.`,
  path: "/contact",
});

export default function ContactPage() {
  const whatsappHref = buildWhatsAppLink(getPageMessage("/contact"));

  return (
    <>
      <JsonLd
        data={[
          realEstateAgentJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <WhatsAppMessage message={getPageMessage("/contact")} />
      <PageHero
        title="Talk to an agent"
        description="Tell us what you are looking for and we will reply within one working day, usually much sooner on WhatsApp."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      />

      <section aria-label="Contact details and form" className="bg-white py-20 sm:py-28 lg:py-36">
        <Container className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">Send an enquiry</h2>
            <p className="mb-8 mt-3 max-w-prose text-neutral-600">
              Share your budget, preferred areas and timeline. The more we know, the better the shortlist.
            </p>
            <EnquiryForm idPrefix="contact" submitLabel="Send message" whatsappHref={whatsappHref} />
          </div>

          <div className="lg:pt-2">
            <h2 className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">Visit or reach us</h2>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg", "mt-8 w-full sm:w-auto")}>
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>

            <address className="mt-10 flex flex-col gap-6 not-italic">
              <a href={`tel:${siteConfig.phoneHref}`} className="flex items-start gap-4">
                <Phone className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-neutral-500">Phone</span>
                  {siteConfig.phone}
                </span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4">
                <Mail className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-neutral-500">Email</span>
                  {siteConfig.email}
                </span>
              </a>
              <p className="flex items-start gap-4">
                <MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-neutral-500">Office</span>
                  {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.country}
                </span>
              </p>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-sm text-neutral-500">Opening hours</span>
                  <ul>
                    {siteConfig.hoursDisplay.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </address>

            <div className="mt-10">
              <MapEmbed lat={siteConfig.geo.lat} lng={siteConfig.geo.lng} title={`${siteConfig.name} office`} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
