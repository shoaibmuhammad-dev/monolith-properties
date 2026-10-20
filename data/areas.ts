import type { Area } from "@/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&h=1300&q=80`;

export const areas: Area[] = [
  {
    name: "Dubai Marina",
    city: "Dubai",
    image: img("1512632578888-169bbbc64f33"),
    blurb: "Waterfront towers, a walkable promenade and strong rental demand.",
  },
  {
    name: "Downtown Dubai",
    city: "Dubai",
    image: img("1512453979798-5ea266f8880c"),
    blurb: "The address beside Burj Khalifa, with dining and the Dubai Mall on your doorstep.",
  },
  {
    name: "Palm Jumeirah",
    city: "Dubai",
    image: img("1518684079-3c830dcef090"),
    blurb: "Beachfront villas and penthouses on the world's best-known island.",
  },
  {
    name: "Business Bay",
    city: "Dubai",
    image: img("1582672060674-bc2bd808a8b5"),
    blurb: "Canal-side apartments and offices minutes from Downtown.",
  },
  {
    name: "Dubai Hills Estate",
    city: "Dubai",
    image: img("1600596542815-ffad4c1539a9"),
    blurb: "Family villas around a golf course, parks and top schools.",
  },
  {
    name: "Jumeirah Village Circle",
    city: "Dubai",
    image: img("1600585154340-be6161a56a0c"),
    blurb: "Value-led townhouses and apartments with some of the city's higher yields.",
  },
  {
    name: "Saadiyat Island",
    city: "Abu Dhabi",
    image: img("1545324418-cc1a3fa10c00"),
    blurb: "Beaches, galleries and quiet residential districts in Abu Dhabi.",
  },
  {
    name: "Yas Island",
    city: "Abu Dhabi",
    image: img("1486406146926-c627a92ad1ab"),
    blurb: "Leisure, marinas and gated communities close to the airport.",
  },
];
