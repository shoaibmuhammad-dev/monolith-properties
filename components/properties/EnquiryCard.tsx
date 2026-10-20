import { Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink, getPropertyMessage } from "@/lib/whatsapp";
import type { Agent, Property } from "@/types";

export function EnquiryCard({ property, agent }: { property: Property; agent?: Agent }) {
  const whatsappHref = buildWhatsAppLink(
    getPropertyMessage(property.title, `/properties/${property.slug}`),
    agent?.whatsapp ?? siteConfig.whatsapp.number,
  );

  return (
    <aside aria-labelledby="enquiry-heading" className="border border-black bg-white p-6 sm:p-7 lg:sticky lg:top-24">
      <h2 id="enquiry-heading" className="text-2xl sm:text-3xl leading-tight tracking-tight font-semibold">
        Enquire about this property
      </h2>
      {agent ? (
        <p className="mt-2 text-sm text-neutral-600">
          Listed by {agent.name}, {agent.role}
        </p>
      ) : null}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses("primary", "lg", "mt-6 w-full")}
      >
        <WhatsAppIcon className="size-5" /> Chat on WhatsApp
      </a>
      <a href={`tel:${siteConfig.phoneHref}`} className={buttonClasses("outline", "md", "mt-3 w-full")}>
        <Phone className="size-4" aria-hidden="true" /> Call {siteConfig.phone}
      </a>

      <div className="my-6 flex items-center gap-4 text-sm text-neutral-500">
        <span className="h-px flex-1 bg-neutral-200" />
        or send a message
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <EnquiryForm
        idPrefix="property"
        propertySlug={property.slug}
        propertyTitle={property.title}
        whatsappHref={whatsappHref}
      />
    </aside>
  );
}
