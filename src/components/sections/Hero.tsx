import { content } from "@/content";

export function Hero() {
  const { profile } = content;

  return (
    <section id="hero" className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-brand">{profile.headline}</p>
      <h1 className="text-display tracking-tight">{profile.name}</h1>
      <p className="text-body-lg max-w-2xl text-muted-foreground">{profile.valueProp}</p>
    </section>
  );
}
