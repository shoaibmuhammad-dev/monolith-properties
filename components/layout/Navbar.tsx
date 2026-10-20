"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Routes that start with a black hero so the navbar can be transparent over them. */
const TRANSPARENT_ROUTES = ["/", "/properties", "/about", "/contact"];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const overHero = TRANSPARENT_ROUTES.includes(pathname);
  const solid = !overHero || scrolled;
  const light = open || !solid; // white text on a dark backdrop

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 border-b border-neutral-200 bg-white transition-opacity duration-300",
            solid && !open ? "opacity-100" : "opacity-0",
          )}
        />
        <Container
          className={cn(
            "relative flex h-[72px] items-center justify-between transition-colors duration-300",
            light ? "text-white" : "text-black",
          )}
        >
          <Logo />
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {siteConfig.nav.map((link) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center text-sm font-medium after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100",
                        active ? "after:scale-x-100" : "after:scale-x-0",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href="/contact" size="sm" variant={light ? "inverse" : "primary"}>
                Contact Us
              </Button>
            </div>
            <button
              type="button"
              className="flex size-12 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
