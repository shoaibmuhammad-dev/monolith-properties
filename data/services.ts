import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "buy",
    title: "Buy",
    description:
      "Shortlists built around your budget and yield or lifestyle goals, with viewings, negotiation and transfer handled start to finish.",
    icon: "buy",
  },
  {
    id: "sell",
    title: "Sell",
    description:
      "A valuation based on recent transactions, professional photography and a buyer list we already know, so your listing starts with momentum.",
    icon: "sell",
  },
  {
    id: "rent",
    title: "Rent",
    description:
      "Verified homes and offices with transparent terms, Ejari registration and a move-in checklist so you can settle quickly.",
    icon: "rent",
  },
  {
    id: "management",
    title: "Property management",
    description:
      "Tenant sourcing, rent collection, maintenance and monthly statements for owners who want their asset looked after without the daily calls.",
    icon: "management",
  },
  {
    id: "investment",
    title: "Investment advisory",
    description:
      "Net yield, service charge and exit analysis across ready and off-plan options, with the downside shown next to the upside.",
    icon: "investment",
  },
  {
    id: "legal",
    title: "Legal and documentation",
    description:
      "Contracts, NOCs, power of attorney and title deed transfers prepared with trusted legal partners and tracked until completion.",
    icon: "legal",
  },
];
