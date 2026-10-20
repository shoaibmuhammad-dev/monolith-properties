"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

// The first render must match the server HTML (no hidden content before hydration),
// so only later route changes fade in.
let isFirstRender = true;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const skip = isFirstRender;
  useEffect(() => {
    isFirstRender = false;
  }, []);

  return (
    <motion.div
      initial={skip ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
