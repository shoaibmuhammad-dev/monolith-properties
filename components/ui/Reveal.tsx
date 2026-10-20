"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Fade-up on scroll, triggered once. Only animates transform and opacity.
 * <MotionConfig reducedMotion="user"> in Providers removes the movement for users
 * who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
