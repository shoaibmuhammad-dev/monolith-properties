import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface Props {
  id: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ id, title, description, tone = "light", className, action }: Props) {
  return (
    <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <Reveal className="max-w-3xl">
        <h2 id={id} className="text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight font-semibold">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-prose text-lg",
              tone === "dark" ? "text-neutral-400" : "text-neutral-600",
            )}
          >
            {description}
          </p>
        ) : null}
      </Reveal>
      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  );
}
