"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink, getPageMessage } from "@/lib/whatsapp";
import { useLenis } from "./SmoothScroll";

const links = [...siteConfig.nav, { label: "Contact", href: "/contact" }];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-40 flex flex-col bg-black px-5 pb-8 pt-28 text-white md:hidden"
          data-lenis-prevent
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map((link, i) => (
                <li key={link.href} className="overflow-hidden border-b border-neutral-800">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex min-h-16 items-center font-heading text-2xl sm:text-3xl leading-tight tracking-tight font-semibold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={buildWhatsAppLink(getPageMessage("/"))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("inverse", "lg", "w-full")}
            >
              <WhatsAppIcon className="size-5" /> WhatsApp us
            </a>
            <a href={`tel:${siteConfig.phoneHref}`} className={buttonClasses("outline-inverse", "lg", "w-full")}>
              <Phone className="size-5" aria-hidden="true" /> {siteConfig.phone}
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
