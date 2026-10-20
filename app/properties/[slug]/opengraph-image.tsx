import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { getAllProperties, getPropertyBySlug } from "@/lib/properties";
import { formatPrice } from "@/lib/utils";

export const alt = "Property listing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPropertyBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>
          {siteConfig.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#a3a3a3" }}>
            {p ? `${p.purpose === "sale" ? "For sale" : "For rent"} in ${p.location.area}, ${p.location.city}` : "Property listing"}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 20 }}>
            {p?.title ?? "Property"}
          </div>
          <div style={{ display: "flex", fontSize: 48, marginTop: 28 }}>
            {p ? formatPrice(p.price, p.purpose) : ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
