import { Download, Mail } from "lucide-react";
import { content } from "@/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const { profile } = content;

  return (
    <section id="hero" className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-24">
      {/*
        No scroll-reveal here (unlike every other section) — the hero is
        visible immediately on load, and its headline text is the page's LCP
        candidate. Gating it behind a JS-triggered whileInView animation
        meant nothing painted until React + Framer Motion finished booting;
        see docs/PROGRESS_LOG.md Phase 6 for the trace that caught this.
      */}
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-center gap-5">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              width={88}
              height={88}
              className="size-22 rounded-full object-cover ring-1 ring-border"
            />
          )}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-brand uppercase">
              {profile.headline}
            </p>
            <h1 className="text-display tracking-tight">{profile.name}</h1>
          </div>
        </div>

        <p className="text-body-lg max-w-2xl text-muted-foreground">{profile.valueProp}</p>

        <div className="flex flex-wrap gap-2">
          {profile.domains.map((domain) => (
            <Badge key={domain} variant="outline">
              {domain}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={profile.resumePdfUrl} download>
              <Download aria-hidden="true" />
              Download résumé
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">
              <Mail aria-hidden="true" />
              Contact
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
