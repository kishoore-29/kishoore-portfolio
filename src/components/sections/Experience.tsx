import SectionHeader from "@/components/hud/SectionHeader";
import { experience } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="04" title="MISSION_LOG" subtitle="Engineering records and deployment reports." />

        <div className="space-y-4">
          {experience.map((e, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="holo-panel hud-corners overflow-hidden"
            >
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan/30 bg-surface/60 px-5 py-3 font-mono text-xs uppercase tracking-widest">
                <span className="text-cyan">▸ LOG_{String(i + 1).padStart(3, "0")} · {e.company}</span>
                <span className="text-green">STATUS: COMPLETE</span>
              </header>
              <div className="grid gap-6 p-5 md:grid-cols-[1fr_2fr] md:p-7">
                <div>
                  <div className="font-display text-xl">{e.role}</div>
                  <div className="mt-1 font-mono text-xs text-foreground/60">project: <span className="text-purple">{e.project}</span></div>
                  <div className="mt-1 font-mono text-xs text-foreground/60">{e.period}</div>
                </div>
                <ul className="space-y-2 font-mono text-sm text-foreground/80">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
