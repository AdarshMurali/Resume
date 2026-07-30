import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import { Reveal } from "@/components/common/Reveal";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

function ExperienceCard({ role }: { role: (typeof content.experience)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <TimelineItem title={`${role.role} · ${role.company}`} meta={`${role.start} – ${role.end}`}>
      <p className="mt-1 text-sm text-brand">{role.domain}</p>
      {role.summary && <p className="mt-2 text-sm text-muted-foreground">{role.summary}</p>}

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
          {open ? "Hide details" : "Show details"}
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3 flex flex-col gap-3">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {role.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {role.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </TimelineItem>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <Timeline>
          {content.experience.map((role) => (
            <ExperienceCard key={`${role.company}-${role.start}`} role={role} />
          ))}
        </Timeline>
      </Reveal>
    </section>
  );
}
