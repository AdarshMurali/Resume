import type { ReactNode } from "react";

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="relative flex flex-col gap-8 border-l border-border pl-6">{children}</ol>;
}

interface TimelineItemProps {
  title: string;
  meta?: string;
  children?: ReactNode;
}

export function TimelineItem({ title, meta, children }: TimelineItemProps) {
  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className="absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full border-2 border-background bg-primary"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-semibold">{title}</h3>
        {meta && <span className="text-sm text-muted-foreground">{meta}</span>}
      </div>
      {children}
    </li>
  );
}
