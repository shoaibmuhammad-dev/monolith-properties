"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "@/components/layout/SmoothScroll";

interface Props {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

export function Lightbox({ images, alt, index, onIndexChange, onClose }: Props) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = images.length;

  const go = useCallback((dir: 1 | -1) => onIndexChange((index + dir + total) % total), [index, total, onIndexChange]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} photo gallery`}
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 text-white"
      data-lenis-prevent
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-sm" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex size-12 items-center justify-center rounded-full border border-neutral-700 hover:bg-white hover:text-black"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1 touch-pan-y overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            <Image
              src={images[index]}
              alt={`${alt}, photo ${index + 1} of ${total}`}
              fill
              sizes="100vw"
              className="pointer-events-none select-none object-contain p-2 sm:p-8"
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black sm:flex"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black sm:flex"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
