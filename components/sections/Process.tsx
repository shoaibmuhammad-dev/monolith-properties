"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Tell us what you need",
    text: "A 20-minute call or WhatsApp chat to agree budget, areas, timing and whether you are buying to live or to earn.",
  },
  {
    title: "See shortlisted options",
    text: "We send a curated shortlist with real costs, then arrange in-person or live video viewings at times that suit you.",
  },
  {
    title: "Make an offer and sign",
    text: "We negotiate, prepare the Memorandum of Understanding, and coordinate your deposit, mortgage and legal checks.",
  },
  {
    title: "Complete and move in",
    text: "Transfer, Ejari or title deed, utilities and handover. We stay available for renewals and management afterwards.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section tone="dark" id="process" labelledBy="process-heading">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="process-heading"
            tone="dark"
            title="How it works, from first call to keys"
            description="Four steps, one point of contact, and no surprises about what happens next."
          />
        </div>
        <div ref={ref} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-neutral-800" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-white"
          />
          <ol className="flex flex-col gap-16">
            {steps.map((s, i) => (
              <li key={s.title} className="relative pl-20">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-white bg-black font-heading text-sm font-bold"
                >
                  {i + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl leading-tight tracking-tight font-bold">{s.title}</h3>
                <p className="mt-3 max-w-prose text-lg text-neutral-400">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
