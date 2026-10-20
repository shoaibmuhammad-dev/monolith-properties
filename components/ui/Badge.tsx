import { cn } from "@/lib/utils";
import type { Purpose } from "@/types";

export function StatusBadge({ purpose, className }: { purpose: Purpose; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-sm px-3 text-xs font-semibold",
        purpose === "sale" ? "bg-black text-white" : "bg-white text-black ring-1 ring-black",
        className,
      )}
    >
      {purpose === "sale" ? "For Sale" : "For Rent"}
    </span>
  );
}
