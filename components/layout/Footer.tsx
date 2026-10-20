import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink, getPageMessage } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const socials = [
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: YoutubeIcon },
];

const explore = [
  { label: "All properties", href: "/properties" },
  { label: "Properties for sale", href: "/properties?purpose=sale" },
  { label: "Properties for rent", href: "/properties?purpose=rent" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const popular = [
  { label: "Apartments for rent in Dubai", href: "/properties?purpose=rent&type=apartment" },
  {
    label: "Houses for sale in Dubai Hills Estate",
    href: "/properties?purpose=sale&type=house&location=Dubai%20Hills%20Estate",
  },
  {
    label: "Plots for sale in Yas Island",
    href: "/properties?purpose=sale&type=plot&location=Yas%20Island",
  },
  {
    label: "Apartments in Dubai Marina",
    href: "/properties?type=apartment&location=Dubai%20Marina",
  },
  {
    label: "Commercial property in Business Bay",
    href: "/properties?type=commercial&location=Business%20Bay",
  },
];

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-neutral-600 underline-offset-4 hover:text-black hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-black">
      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm text-neutral-600">
            {siteConfig.name} is a real estate agency in Dubai and Abu Dhabi. {siteConfig.tagline}.
          </p>
          <address className="mt-8 flex flex-col gap-1 not-italic">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="inline-flex min-h-11 items-center gap-3 text-sm"
            >
              <Phone className="size-4" aria-hidden="true" /> {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center gap-3 text-sm"
            >
              <Mail className="size-4" aria-hidden="true" /> {siteConfig.email}
            </a>
            <a
              href={buildWhatsAppLink(getPageMessage("/"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 text-sm"
            >
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </a>
            <p className="flex items-start gap-3 py-2 text-sm text-neutral-600">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.country}
              </span>
            </p>
          </address>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2">
          <h2 className="text-xl font-semibold leading-snug">Explore</h2>
          <ul className="mt-4">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular searches" className="lg:col-span-3">
          <h2 className="text-xl font-semibold leading-snug">Popular searches</h2>
          <ul className="mt-4">
            {popular.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold leading-snug">New listings, in your inbox</h2>
          <p className="mt-2 text-sm text-neutral-600">
            One email a month with new properties and market notes.
          </p>
          <NewsletterForm />
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-neutral-300 transition-colors duration-300 hover:bg-neutral-950 hover:text-white"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
      <div className="border-t border-neutral-200">
        <Container className="flex flex-col gap-2 py-6 text-xs text-neutral-500 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.hoursDisplay[0]}</p>
        </Container>
      </div>
    </footer>
  );
}
