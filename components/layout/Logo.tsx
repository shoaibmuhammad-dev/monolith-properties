import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 36 40" className="h-8 w-auto" fill="currentColor" aria-hidden="true">
        <rect x="2" y="2" width="14" height="36" />
        <rect x="20" y="12" width="14" height="26" />
      </svg>
      <span className="font-heading text-[1.05rem] font-bold tracking-[0.14em]">MONOLITH</span>
    </Link>
  );
}
