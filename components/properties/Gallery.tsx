"use client";

import dynamic from "next/dynamic";
import { Images } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";

// The lightbox is only needed once someone opens it.
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), { ssr: false });

export function Gallery({ images, title, location }: { images: string[]; title: string; location: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const alt = `${title} in ${location}`;

  function show(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <>
      {/* Mobile: swipeable carousel */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto sm:-mx-8 md:hidden">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => show(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="relative aspect-[4/3] w-[88%] shrink-0 snap-center first:ml-5 last:mr-5 sm:first:ml-8 sm:last:mr-8"
          >
            <SmartImage
              src={src}
              alt={`${alt}, photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="88vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 right-3 bg-black px-2.5 py-1 text-xs font-medium text-white">
              {i + 1} / {images.length}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop: mosaic */}
      <div className="hidden h-[min(70vh,640px)] grid-cols-4 grid-rows-2 gap-2 md:grid">
        {images.slice(0, 5).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => show(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className={`group relative overflow-hidden bg-neutral-200 ${i === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <SmartImage
              src={src}
              alt={`${alt}, photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes={i === 0 ? "50vw" : "25vw"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <div className="mt-4 hidden justify-end md:flex">
        <button
          type="button"
          onClick={() => show(0)}
          className="inline-flex min-h-11 items-center gap-2 rounded border border-black px-5 text-sm font-medium transition-colors hover:bg-black hover:text-white"
        >
          <Images className="size-4" aria-hidden="true" /> View all {images.length} photos
        </button>
      </div>

      {open ? (
        <Lightbox images={images} alt={alt} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}
