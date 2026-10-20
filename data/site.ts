/**
 * Single source of truth for business details, navigation, WhatsApp number
 * and WhatsApp message templates. Replace the placeholders marked TODO.
 */
export const siteConfig = {
  name: "Monolith Properties", // TODO: your company name
  legalName: "Monolith Properties LLC",
  tagline: "Find a home you'll love",
  description:
    "Monolith Properties is a licensed real estate agency in Dubai and Abu Dhabi. Buy, sell, rent and manage property with verified listings, written fees and agents who know their communities.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_AE",

  phone: "+971 4 000 0000", // TODO
  phoneHref: "+97140000000", // TODO: digits with leading +
  email: "contact@monolithproperties.ae", // TODO
  address: {
    street: "Office 1204, Bay Square Tower, Business Bay", // TODO
    city: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
  },
  geo: { lat: 25.1865, lng: 55.2677 },

  hoursDisplay: ["Monday to Friday: 9:00 to 18:00", "Saturday: 10:00 to 16:00", "Sunday: closed"],
  hoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],

  socials: {
    instagram: "https://instagram.com/monolithproperties", // TODO
    facebook: "https://facebook.com/monolithproperties", // TODO
    linkedin: "https://linkedin.com/company/monolithproperties", // TODO
    youtube: "https://youtube.com/@monolithproperties", // TODO
  },

  /**
   * WhatsApp number in international format, digits only (no +, spaces or dashes).
   * Messages support the placeholders {name}, {title} and {url}.
   */
  whatsapp: {
    number: "971500000000", // TODO
    messages: {
      generic: "Hello {name}, I'd like to speak to an agent about property in the UAE.",
      properties: "Hello {name}, I'm browsing your listings and need help finding a property.",
      contact: "Hello {name}, I'd like to book a call about buying, renting or selling.",
      property:
        "Hello {name}, I'm interested in \"{title}\". Could you share more details and available viewing times? {url}",
      agent: "Hello {agent}, I found you on {name}. I'd like to talk about a property.",
    },
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
  ],

  stats: [
    { value: 1240, suffix: "+", label: "Properties sold and let" },
    { value: 14, suffix: "", label: "Years of experience" },
    { value: 3800, suffix: "+", label: "Happy clients" },
    { value: 32, suffix: "", label: "Areas covered" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
