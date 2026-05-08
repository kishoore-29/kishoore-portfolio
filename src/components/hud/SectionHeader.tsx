import { ReactNode } from "react";

export default function SectionHeader({ index, title, subtitle, children }: { index: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-2 md:mb-14">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
        <span className="h-px w-10 bg-cyan" style={{ boxShadow: "0 0 8px var(--neon-cyan)" }} />
        <span>// SECTION_{index}</span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl">
        <span className="text-gradient-neon">{title}</span>
      </h2>
      {subtitle && <p className="max-w-2xl text-sm text-foreground/70 md:text-base">{subtitle}</p>}
      {children}
    </div>
  );
}
