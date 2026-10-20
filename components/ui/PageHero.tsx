import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";

/** Black page header used on inner pages. Renders the page's single H1. */
export function PageHero({
  title,
  description,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  breadcrumbs: { name: string; href?: string }[];
}) {
  return (
    <header className="bg-black pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
      <Container>
        <Breadcrumbs items={breadcrumbs} tone="dark" />
        <h1 className="mt-8 max-w-5xl text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight font-bold">{title}</h1>
        {description ? <p className="mt-6 max-w-2xl text-lg text-neutral-400">{description}</p> : null}
      </Container>
    </header>
  );
}
