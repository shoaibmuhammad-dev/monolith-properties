"use client";

import { usePathname } from "next/navigation";
import { buildWhatsAppLink, getPageMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { useWhatsAppContext } from "./WhatsAppContext";

export function WhatsAppButton() {
  const pathname = usePathname();
  const { override } = useWhatsAppContext();
  const href = buildWhatsAppLink(override ?? getPageMessage(pathname));

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/70 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 sm:size-16"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-black animate-pulse-ring motion-reduce:hidden"
        />
        <WhatsAppIcon className="size-7 sm:size-8" />
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded bg-black px-3 py-2 text-sm font-medium text-white opacity-0 ring-1 ring-white/20 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
        >
          Chat with us
        </span>
      </a>
    </div>
  );
}
