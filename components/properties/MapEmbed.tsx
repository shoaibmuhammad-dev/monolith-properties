"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/** Google Maps embed (no API key needed). The iframe mounts only when scrolled into view. */
export function MapEmbed({ lat, lng, title }: { lat: number; lng: number; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "300px 0px" });

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
      {visible ? (
        <iframe
          title={`Map showing the location of ${title}`}
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full grayscale"
          allowFullScreen
        />
      ) : null}
    </div>
  );
}
