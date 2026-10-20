import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

interface MetaInput {
  title: string;
  description: string;
  /** Path beginning with /, used for the canonical URL. */
  path: string;
  noIndex?: boolean;
}

/** Shared metadata builder: unique title, description, canonical, Open Graph and Twitter card. */
export function buildMetadata({ title, description, path, noIndex }: MetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
