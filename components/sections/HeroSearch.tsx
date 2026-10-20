"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { inputClasses } from "@/components/forms/Field";
import { PRICE_STEPS, TYPE_OPTIONS, filtersToSearchParams } from "@/lib/filters";
import { cn, formatCompact } from "@/lib/utils";
import type { Purpose } from "@/types";

const selectClasses = `${inputClasses} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`;
const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

export function HeroSearch({ locations }: { locations: string[] }) {
  const router = useRouter();
  const [purpose, setPurpose] = useState<Purpose>("sale");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sp = filtersToSearchParams({
      purpose,
      type: TYPE_OPTIONS.find((t) => t.value === type)?.value,
      location: location || undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    router.push(`/properties?${sp.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search properties"
      className="grid gap-4 bg-white p-4 text-black sm:p-5 lg:grid-cols-[auto_1fr_1fr_1fr_auto] lg:items-end"
    >
      <fieldset>
        <legend className="mb-2 text-sm font-medium">I want to</legend>
        <div className="grid grid-cols-2 gap-1 rounded bg-neutral-100 p-1">
          {(["sale", "rent"] as const).map((p) => (
            <label
              key={p}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center rounded px-6 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                purpose === p ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-200",
              )}
            >
              <input
                type="radio"
                name="purpose"
                value={p}
                checked={purpose === p}
                onChange={() => {
                  setPurpose(p);
                  setMaxPrice("");
                }}
                className="sr-only"
              />
              {p === "sale" ? "Buy" : "Rent"}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="hs-location" className="mb-2 block text-sm font-medium">
          Location
        </label>
        <select
          id="hs-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={selectClasses}
          style={{ backgroundImage: chevron }}
        >
          <option value="">All areas</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="hs-type" className="mb-2 block text-sm font-medium">
          Property type
        </label>
        <select
          id="hs-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={selectClasses}
          style={{ backgroundImage: chevron }}
        >
          <option value="">All types</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="hs-budget" className="mb-2 block text-sm font-medium">
          Budget
        </label>
        <select
          id="hs-budget"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={selectClasses}
          style={{ backgroundImage: chevron }}
        >
          <option value="">{purpose === "rent" ? "Any yearly rent" : "Any budget"}</option>
          {PRICE_STEPS[purpose].map((s) => (
            <option key={s} value={s}>
              Up to AED {formatCompact(s)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <Search className="size-4" aria-hidden="true" /> Search
      </button>
    </form>
  );
}
