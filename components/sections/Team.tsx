import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { agents } from "@/data/agents";
import { buildWhatsAppLink, getAgentMessage } from "@/lib/whatsapp";
import Link from "next/link";

export function Team({
  heading = "Meet the agents who will answer your calls",
}: {
  heading?: string;
}) {
  return (
    <Section id="team" labelledBy="team-heading">
      <Container>
        <SectionHeading
          id="team-heading"
          title={heading}
          description="Licensed, multilingual and based in the UAE. Message any of them directly."
        />
        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => (
            <li key={a.id}>
              <Reveal delay={(i % 4) * 0.08}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                    <SmartImage
                      src={a.photo}
                      alt={`Portrait of ${a.name}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug">{a.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{a.role}</p>
                  <p className="mt-1 text-sm text-neutral-500">{a.languages.join(", ")}</p>
                  <Link
                    href={buildWhatsAppLink(getAgentMessage(a.name), a.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Message ${a.name} on WhatsApp`}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded border border-black px-4 text-sm font-medium transition-colors duration-300 hover:bg-neutral-950 hover:text-white"
                  >
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
