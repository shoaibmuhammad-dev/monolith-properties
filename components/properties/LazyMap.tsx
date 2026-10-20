"use client";

import dynamic from "next/dynamic";

const MapEmbed = dynamic(() => import("./MapEmbed").then((m) => m.MapEmbed), {
  ssr: false,
  loading: () => <div className="aspect-[16/10] w-full animate-pulse bg-neutral-100" aria-hidden="true" />,
});

export function LazyMap(props: { lat: number; lng: number; title: string }) {
  return <MapEmbed {...props} />;
}
