import { cn } from "@/lib/utils";

interface SectionProps {
  tone?: "light" | "dark";
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}

/** Page section with a built-in light/dark tone so sections can alternate white and black. */
export function Section({ tone = "light", id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-20 sm:py-28 lg:py-36",
        tone === "dark" ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
    >
      {children}
    </section>
  );
}
