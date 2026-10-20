import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "inverse" | "outline" | "outline-inverse";
type Size = "md" | "lg" | "sm";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-neutral-800",
  inverse: "bg-white text-black hover:bg-neutral-200",
  outline: "border border-black text-black hover:bg-neutral-950 hover:text-white",
  "outline-inverse": "border border-white text-white hover:bg-white hover:text-black",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  arrow,
  magnetic = true,
  className,
  type = "button",
  disabled,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  let node: React.ReactNode;
  if (href && external) {
    node = (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  } else if (href) {
    node = (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  } else {
    node = (
      <button
        type={type}
        className={classes}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  if (!magnetic) return node;
  return (
    <Magnetic className={className?.includes("w-full") ? "block w-full" : undefined}>
      {node}
    </Magnetic>
  );
}
