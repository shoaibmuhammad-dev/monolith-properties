import type { Agent } from "@/types";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=1000&q=80`;

export const agents: Agent[] = [
  {
    id: "omar-haddad",
    name: "Omar Haddad",
    role: "Head of Sales, Dubai",
    photo: photo("1560250097-0b93528c311a"),
    whatsapp: "971500000001",
    email: "omar@monolithproperties.ae",
    languages: ["English", "Arabic"],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Senior Advisor, Investment",
    photo: photo("1573496359142-b8d87734a5a2"),
    whatsapp: "971500000002",
    email: "priya@monolithproperties.ae",
    languages: ["English", "Hindi", "Malayalam"],
  },
  {
    id: "sara-al-mansoori",
    name: "Sara Al Mansoori",
    role: "Leasing and Property Management",
    photo: photo("1580489944761-15a19d654956"),
    whatsapp: "971500000003",
    email: "sara@monolithproperties.ae",
    languages: ["English", "Arabic"],
  },
  {
    id: "james-whitfield",
    name: "James Whitfield",
    role: "Director, Abu Dhabi",
    photo: photo("1519085360753-af0119f7cbe7"),
    whatsapp: "971500000004",
    email: "james@monolithproperties.ae",
    languages: ["English", "French"],
  },
];
