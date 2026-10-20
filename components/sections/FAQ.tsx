import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";

export function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          id="faq-heading"
          title="Questions we hear most"
          description="Straight answers on buying, renting, costs and paperwork in the UAE. Ask us anything that isn't covered."
        />
        <Accordion items={faqs} />
      </Container>
    </Section>
  );
}
