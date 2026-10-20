export type Purpose = "sale" | "rent";
export type PropertyType = "house" | "apartment" | "plot" | "commercial";

export interface Property {
  id: string;
  slug: string;
  title: string;
  purpose: Purpose;
  type: PropertyType;
  /** Price in AED. For rentals this is the yearly rent. */
  price: number;
  location: {
    /** Must match an Area name in data/areas.ts so area links and filters line up. */
    area: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
  /** 0 means studio for apartments; ignored for plots and commercial. */
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  yearBuilt?: number;
  description: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  /** ISO date, used for "newest" sorting and sitemap lastModified. */
  createdAt: string;
  agentId: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  /** International format, digits only. Example: 971500000001 */
  whatsapp: string;
  email: string;
  languages: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type ServiceIcon =
  | "buy"
  | "sell"
  | "rent"
  | "management"
  | "investment"
  | "legal";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
}

export interface Area {
  name: string;
  city: string;
  image: string;
  blurb: string;
}
