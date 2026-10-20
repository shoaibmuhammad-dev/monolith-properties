"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { HeroSearch } from "./HeroSearch";

const HEADLINE = "Real estate in the UAE, without the guesswork.";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80";

export function Hero({ locations }: { locations: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black text-white"
    >
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y, scale }}>
        <div className="absolute inset-0 animate-zoom-out">
          <SmartImage
            src={HERO_IMAGE}
            alt="Dubai skyline at dusk with Downtown towers"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/45" />

      <Container className="pb-8 pt-36 sm:pb-12">
        <h1 id="hero-heading" className="max-w-6xl text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter font-extrabold">
          {HEADLINE.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <span className="inline-block animate-rise" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                {word}
                {"\u00A0"}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="mt-8 max-w-xl animate-fade-up text-lg text-neutral-300"
          style={{ animationDelay: "0.85s" }}
        >
          Verified listings, fees in writing and licensed agents who reply within the hour. Buy, rent, sell and
          manage property across Dubai and Abu Dhabi.
        </p>
        <div className="mt-10 animate-fade-up" style={{ animationDelay: "1.05s" }}>
          <HeroSearch locations={locations} />
        </div>
      </Container>
    </section>
  );
}
