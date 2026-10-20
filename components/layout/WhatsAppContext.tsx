"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface Ctx {
  override: string | null;
  setOverride: (message: string | null) => void;
}

const WhatsAppContext = createContext<Ctx>({ override: null, setOverride: () => {} });

export const useWhatsAppContext = () => useContext(WhatsAppContext);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverride] = useState<string | null>(null);
  const value = useMemo(() => ({ override, setOverride }), [override]);
  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>;
}

/** Render on a page to make the floating WhatsApp button use a page-specific message. */
export function WhatsAppMessage({ message }: { message: string }) {
  const { setOverride } = useWhatsAppContext();
  useEffect(() => {
    setOverride(message);
    return () => setOverride(null);
  }, [message, setOverride]);
  return null;
}
