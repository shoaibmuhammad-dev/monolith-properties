"use client";

import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { inputClasses } from "@/components/forms/Field";
import {
  PRICE_STEPS,
  SORT_OPTIONS,
  TYPE_OPTIONS,
  filtersToSearchParams,
  parseFilters,
  type Filters as FilterState,
} from "@/lib/filters";
import { cn, formatCompact } from "@/lib/utils";
import type { Purpose } from "@/types";

interface Props {
  filters: FilterState;
  locations: string[];
}

const selectClasses = `${inputClasses} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`;
const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

function FilterSelect({
  id,
  label,
  children,
  ...rest
}: {
  id: string;
  label: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className={selectClasses}
        style={{ backgroundImage: chevron }}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

/**
 * Filters live in the URL, so every result set is shareable. Changing any control
 * rewrites the query string and the server re-renders the list.
 */
export function Filters({ filters, locations }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [purpose, setPurpose] = useState<Purpose | "">(filters.purpose ?? "");

  function apply(resetPrices = false) {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const next = parseFilters({
      purpose: String(data.get("purpose") ?? ""),
      type: String(data.get("type") ?? ""),
      location: String(data.get("location") ?? ""),
      minPrice: resetPrices ? "" : String(data.get("minPrice") ?? ""),
      maxPrice: resetPrices ? "" : String(data.get("maxPrice") ?? ""),
      beds: String(data.get("beds") ?? ""),
      sort: String(data.get("sort") ?? ""),
    });
    const qs = filtersToSearchParams({ ...next, page: 1 }).toString();
    startTransition(() =>
      router.replace(qs ? `/properties?${qs}` : "/properties", { scroll: false }),
    );
  }

  const steps = purpose ? PRICE_STEPS[purpose] : [];
  const activeCount = [
    filters.purpose,
    filters.type,
    filters.location,
    filters.minPrice,
    filters.maxPrice,
    filters.beds,
  ].filter(Boolean).length;

  return (
    <div className="border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="property-filters"
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 items-center gap-3 font-medium"
        >
          <SlidersHorizontal className="size-5" aria-hidden="true" />
          Filters{activeCount ? ` (${activeCount})` : ""}
        </button>
        {activeCount ? (
          <Link
            href="/properties"
            className="min-h-11 content-center text-sm underline underline-offset-4"
          >
            Clear
          </Link>
        ) : null}
      </div>

      <form
        id="property-filters"
        ref={formRef}
        onChange={(e) => {
          const target = e.target;

          if (target instanceof HTMLSelectElement || target instanceof HTMLInputElement) {
            apply(target.name === "purpose");
          }
        }}
        onSubmit={(e) => e.preventDefault()}
        aria-busy={isPending}
        className={cn(
          "mt-5 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4",
          open ? "grid" : "hidden lg:grid",
        )}
      >
        <FilterSelect
          id="purpose"
          label="Buy or rent"
          defaultValue={filters.purpose ?? ""}
          onChange={(e) => setPurpose(e.target.value as Purpose | "")}
        >
          <option value="">Buy or rent</option>
          <option value="sale">Buy</option>
          <option value="rent">Rent</option>
        </FilterSelect>

        <FilterSelect id="type" label="Property type" defaultValue={filters.type ?? ""}>
          <option value="">All types</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect id="location" label="Location" defaultValue={filters.location ?? ""}>
          <option value="">All areas</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="beds"
          label="Bedrooms"
          defaultValue={filters.beds ? String(filters.beds) : ""}
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          key={`min-${purpose}`}
          id="minPrice"
          label="Min price (AED)"
          defaultValue={
            filters.minPrice && steps.includes(filters.minPrice) ? String(filters.minPrice) : ""
          }
          disabled={!purpose}
        >
          <option value="">{purpose ? "No minimum" : "Choose buy or rent first"}</option>
          {steps.map((s) => (
            <option key={s} value={s}>
              {formatCompact(s)}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          key={`max-${purpose}`}
          id="maxPrice"
          label="Max price (AED)"
          defaultValue={
            filters.maxPrice && steps.includes(filters.maxPrice) ? String(filters.maxPrice) : ""
          }
          disabled={!purpose}
        >
          <option value="">{purpose ? "No maximum" : "Choose buy or rent first"}</option>
          {steps.map((s) => (
            <option key={s} value={s}>
              {formatCompact(s)}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect id="sort" label="Sort by" defaultValue={filters.sort}>
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </FilterSelect>

        <div className="hidden items-end lg:flex">
          <Link
            href="/properties"
            className="inline-flex min-h-12 w-full items-center justify-center rounded border border-black text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-white"
          >
            Reset filters
          </Link>
        </div>
      </form>
    </div>
  );
}
