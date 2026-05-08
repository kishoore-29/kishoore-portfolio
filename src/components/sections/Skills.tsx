import SectionHeader from "@/components/hud/SectionHeader";
import { skillCategories, coreConcepts } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="03" title="SYS_DIAGNOSTICS" subtitle="Live readout of stacks, tools, and core concepts." />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="holo-panel hud-corners p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span className="text-cyan">// stack.metrics</span>
              <span className="text-green">STATUS: NOMINAL</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {skillCategories.map((cat, ci) => (
                <div key={cat.name}>
                  <div className="mb-2 font-display text-sm text-purple">{cat.name}</div>
                  <ul className="space-y-2">
                    {cat.items.map(([name, val], i) => (
                      <li key={name as string}>
                        <div className="flex justify-between font-mono text-[11px] text-foreground/70">
                          <span>{name as string}</span>
                          <span className="text-cyan">{val as number}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-sm bg-surface-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${val}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: ci * 0.05 + i * 0.04, ease: "easeOut" }}
                            className="h-full"
                            style={{
                              background: ci % 2 === 0 ? "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))" : "linear-gradient(90deg, var(--neon-purple), var(--neon-magenta))",
                              boxShadow: "0 0 8px var(--neon-cyan)",
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="holo-panel hud-corners flex flex-col p-6">
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">// core_concepts.radar</div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer>
                <RadarChart data={coreConcepts}>
                  <PolarGrid stroke="rgba(125,249,255,0.25)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="var(--neon-cyan)" fill="var(--neon-purple)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
              <div>READ: 12.4MB/s</div>
              <div>LAT: 4ms</div>
              <div>UPTIME: 99.9%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
