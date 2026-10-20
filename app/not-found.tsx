import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-black pb-20 pt-40 text-white">
      <Container>
        <p className="font-heading text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter font-extrabold">404</p>
        <h1 className="mt-6 max-w-2xl text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight font-bold">We couldn't find that page</h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-400">
          The link may be old, or the property may have been sold or let. Browse current listings or get in touch
          and we will help you find something similar.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/properties" className={buttonClasses("inverse", "lg")}>
            Browse properties
          </Link>
          <Link href="/contact" className={buttonClasses("outline-inverse", "lg")}>
            Contact us
          </Link>
        </div>
      </Container>
    </section>
  );
}
