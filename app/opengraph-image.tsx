import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name}, real estate agency in the UAE`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.02 }}>
          Real estate in the UAE, without the guesswork.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a3a3a3" }}>Dubai and Abu Dhabi</div>
      </div>
    ),
    size,
  );
}
