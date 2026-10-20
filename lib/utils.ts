import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/data/site";
import type { Property, PropertyType, Purpose } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

export function formatPrice(price: number, purpose: Purpose) {
  const base = `AED ${formatNumber(price)}`;
  return purpose === "rent" ? `${base} / year` : base;
}

/** 2500000 -> "2.5M", 60000 -> "60K" */
export function formatCompact(n: number) {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const typeLabels: Record<PropertyType, string> = {
  house: "House or villa",
  apartment: "Apartment",
  plot: "Plot",
  commercial: "Commercial",
};

export function isResidential(p: Pick<Property, "type">) {
  return p.type === "house" || p.type === "apartment";
}

export function bedroomLabel(beds: number) {
  return beds === 0 ? "Studio" : `${beds} ${beds === 1 ? "bed" : "beds"}`;
}

const blurSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="#e5e5e5"/></svg>';

/** Light gray placeholder shown while next/image loads. */
export const blurDataURL = `data:image/svg+xml;base64,${
  typeof window === "undefined" ? Buffer.from(blurSvg).toString("base64") : window.btoa(blurSvg)
}`;
