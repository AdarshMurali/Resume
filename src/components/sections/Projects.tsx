import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Projects" title="Featured work" />
      <div className="flex flex-col gap-4">
        {content.projects.map((project) => (
          <a
            key={project.title}
            href={project.links.github ?? project.links.demo ?? project.links.tableau ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border p-4 transition-colors hover:border-brand"
          >
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
