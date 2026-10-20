import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { filtersToSearchParams, type Filters } from "@/lib/filters";
import { cn } from "@/lib/utils";

export function Pagination({ filters, page, totalPages }: { filters: Filters; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const qs = filtersToSearchParams({ ...filters, page: p }).toString();
    return qs ? `/properties?${qs}` : "/properties";
  };

  const itemClass =
    "inline-flex size-11 items-center justify-center rounded border text-sm font-medium transition-colors";

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} aria-label="Previous page" className={cn(itemClass, "border-neutral-300 hover:bg-black hover:text-white")}>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          className={cn(itemClass, p === page ? "border-black bg-black text-white" : "border-neutral-300 hover:bg-black hover:text-white")}
        >
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={href(page + 1)} aria-label="Next page" className={cn(itemClass, "border-neutral-300 hover:bg-black hover:text-white")}>
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}
