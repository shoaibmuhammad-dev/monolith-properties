import type { Property, PropertyType, Purpose } from "@/types";

export const PAGE_SIZE = 6;

export type SortKey = "newest" | "price-asc" | "price-desc";

export interface Filters {
  purpose?: Purpose;
  type?: PropertyType;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  sort: SortKey;
  page: number;
}

export const PRICE_STEPS: Record<Purpose, number[]> = {
  sale: [500_000, 1_000_000, 2_000_000, 5_000_000, 10_000_000, 20_000_000, 50_000_000],
  rent: [40_000, 60_000, 100_000, 150_000, 250_000, 500_000],
};

export const TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "house", label: "House or villa" },
  { value: "apartment", label: "Apartment" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

type RawParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function toPositiveInt(v: string | undefined): number | undefined {
  if (!v) return undefined;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export function parseFilters(params: RawParams): Filters {
  const purposeRaw = first(params.purpose);
  const typeRaw = first(params.type);
  const sortRaw = first(params.sort);
  const bedsRaw = first(params.beds);

  const purpose: Purpose | undefined =
    purposeRaw === "sale" || purposeRaw === "rent" ? purposeRaw : undefined;
  const type = TYPE_OPTIONS.find((t) => t.value === typeRaw)?.value;
  const sort = SORT_OPTIONS.find((s) => s.value === sortRaw)?.value ?? "newest";
  const beds = bedsRaw !== undefined && /^\d$/.test(bedsRaw) ? Number(bedsRaw) : undefined;

  return {
    purpose,
    type,
    location: first(params.location) || undefined,
    minPrice: toPositiveInt(first(params.minPrice)),
    maxPrice: toPositiveInt(first(params.maxPrice)),
    beds: beds && beds > 0 ? beds : undefined,
    sort,
    page: toPositiveInt(first(params.page)) ?? 1,
  };
}

/** Serialises filters back to a query string, omitting defaults. */
export function filtersToSearchParams(f: Partial<Filters>): URLSearchParams {
  const sp = new URLSearchParams();
  if (f.purpose) sp.set("purpose", f.purpose);
  if (f.type) sp.set("type", f.type);
  if (f.location) sp.set("location", f.location);
  if (f.minPrice) sp.set("minPrice", String(f.minPrice));
  if (f.maxPrice) sp.set("maxPrice", String(f.maxPrice));
  if (f.beds) sp.set("beds", String(f.beds));
  if (f.sort && f.sort !== "newest") sp.set("sort", f.sort);
  if (f.page && f.page > 1) sp.set("page", String(f.page));
  return sp;
}

export function filterProperties(list: Property[], f: Filters): Property[] {
  return list.filter((p) => {
    if (f.purpose && p.purpose !== f.purpose) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.location && p.location.area !== f.location) return false;
    if (f.minPrice && p.price < f.minPrice) return false;
    if (f.maxPrice && p.price > f.maxPrice) return false;
    if (f.beds && p.bedrooms < f.beds) return false;
    return true;
  });
}

export function sortProperties(list: Property[], sort: SortKey): Property[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: current, totalPages, total: items.length };
}
