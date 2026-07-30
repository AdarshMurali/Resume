import { ExternalLink, Star, Clock, ChartArea } from "lucide-react";
import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GitHubIcon } from "@/components/common/BrandIcons";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <SectionHeading eyebrow="Projects" title="Featured work" />
        <div className="flex flex-col gap-4">
          {content.projects.map((project) => {
            const href = project.links.github ?? project.links.demo ?? project.links.tableau;
            return (
              <Card key={project.title} className="transition-colors hover:ring-brand/40">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle>{project.title}</CardTitle>
                    {project.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardDescription>{project.blurb}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.repoStats && (
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Star aria-hidden="true" className="size-3.5" />
                        {project.repoStats.stars} stars
                      </span>
                      <span>{project.repoStats.language}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden="true" className="size-3.5" />
                        Updated {dateFormatter.format(new Date(project.repoStats.updated))}
                      </span>
                    </div>
                  )}
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      {project.links.github ? (
                        <GitHubIcon aria-hidden="true" className="size-4" />
                      ) : (
                        <ExternalLink aria-hidden="true" className="size-4" />
                      )}
                      View on {project.links.github ? "GitHub" : "the web"}
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <Card className="transition-colors hover:ring-brand/40">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <ChartArea aria-hidden="true" className="size-5 text-brand" />
                <CardTitle>Interactive Tableau Visual Resume</CardTitle>
              </div>
              <CardDescription>
                My full experience, skills, and certifications built as a live Tableau dashboard —
                timeline, proficiency charts, and more, all interactive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={content.links.tableauPublic}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                Open on Tableau Public
              </a>
            </CardContent>
          </Card>
        </div>
      </Reveal>
    </section>
  );
}
