import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Sharp lines, clear typographic hierarchy, subtle animations.
*/

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Clear answers about our inspection process, standards, and delivery.",
}: FAQProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
          FAQ
        </span>
        <h2 className="font-serif text-3xl text-white tracking-wider uppercase mb-4">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      <Accordion type="single" collapsible className="border-t border-border">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-border py-2 px-1 hover:bg-card/20 transition-colors"
          >
            <AccordionTrigger className="font-serif text-sm md:text-base text-white tracking-wide hover:no-underline hover:text-primary transition-colors py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed pt-2 pb-4 pr-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
