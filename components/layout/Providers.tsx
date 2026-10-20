"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";
import { WhatsAppProvider } from "./WhatsAppContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <WhatsAppProvider>{children}</WhatsAppProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
