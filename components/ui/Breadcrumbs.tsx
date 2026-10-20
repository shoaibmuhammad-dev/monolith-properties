import Link from "next/link";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: { name: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
          tone === "dark" ? "text-neutral-400" : "text-neutral-500",
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="underline-offset-4 hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? (tone === "dark" ? "text-white" : "text-black") : undefined}>
                  {item.name}
                </span>
              )}
              {!last ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
