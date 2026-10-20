import { Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink, getPageMessage } from "@/lib/whatsapp";

export function CtaBanner() {
  return (
    <Section tone="dark" labelledBy="cta-heading" className="py-24 sm:py-32 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="cta-heading" className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight font-bold">
            Ready to find your next property?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink(getPageMessage("/"))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("inverse", "lg")}
            >
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
            <a href={`tel:${siteConfig.phoneHref}`} className={buttonClasses("outline-inverse", "lg")}>
              <Phone className="size-5" aria-hidden="true" /> Call {siteConfig.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
