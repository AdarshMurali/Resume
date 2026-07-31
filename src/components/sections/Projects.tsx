import { ExternalLink, Star, Clock, ChartArea, Lock } from "lucide-react";
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
        <SectionHeading
          eyebrow="Personal Projects"
          title="Independent work"
          description="Built on my own time, outside of my employer, as hands-on exploration of tools and approaches beyond what my day job requires."
        />
        <div className="flex flex-col gap-4">
          {content.projects.map((project) => {
            const showGithub = project.links.github && !project.privateRepo;
            return (
              <Card key={project.title} className="transition-colors hover:ring-brand/40">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle>{project.title}</CardTitle>
                    {project.featured && <Badge>Featured</Badge>}
                    {project.inProgress && <Badge variant="secondary">In Progress</Badge>}
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
                  {(showGithub || project.links.demo || project.links.tableau) && (
                    <div className="flex flex-wrap gap-4">
                      {showGithub && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                        >
                          <GitHubIcon aria-hidden="true" className="size-4" />
                          View on GitHub
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                        >
                          <ExternalLink aria-hidden="true" className="size-4" />
                          Visit the app
                        </a>
                      )}
                      {project.links.tableau && (
                        <a
                          href={project.links.tableau}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                        >
                          <ExternalLink aria-hidden="true" className="size-4" />
                          View on the web
                        </a>
                      )}
                    </div>
                  )}
                  {project.privateRepo && (
                    <p className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground">
                      <Lock aria-hidden="true" className="size-3.5" />
                      Private repository — happy to walk through the code in an interview.
                    </p>
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
