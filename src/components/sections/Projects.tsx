import SectionHeader from "@/components/hud/SectionHeader";
import { projects } from "@/data/portfolio";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="05" title="ENGINEERED_BUILDS" subtitle="Selected projects — architecture, stacks, and intent." />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => {
            const color = `var(--neon-${p.accent})`;
            return (
              <Tilt key={p.name} glareEnable glareMaxOpacity={0.15} glareColor="#7df9ff" glarePosition="all" tiltMaxAngleX={6} tiltMaxAngleY={6} transitionSpeed={1500} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="holo-panel hud-corners group relative flex h-full flex-col overflow-hidden p-5"
                  style={{ borderColor: color }}
                >
                  {/* network preview */}
                  <div className="relative mb-4 h-32 overflow-hidden rounded-sm border border-foreground/10 bg-background/60">
                    <svg viewBox="0 0 200 100" className="h-full w-full">
                      <defs>
                        <radialGradient id={`g-${i}`} cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor={p.accent === "cyan" ? "#7df9ff" : p.accent === "purple" ? "#9d4dff" : "#ff4dd2"} stopOpacity="0.35" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>
                      <rect width="200" height="100" fill={`url(#g-${i})`} />
                      {Array.from({ length: 12 }).map((_, k) => {
                        const x = 10 + (k * 17 + i * 5) % 180;
                        const y = 15 + (k * 11 + i * 7) % 70;
                        return <circle key={k} cx={x} cy={y} r="1.6" fill={p.accent === "cyan" ? "#7df9ff" : p.accent === "purple" ? "#c69bff" : "#ff8de0"} />;
                      })}
                      {Array.from({ length: 10 }).map((_, k) => (
                        <line key={k}
                          x1={10 + (k * 17 + i * 5) % 180} y1={15 + (k * 11 + i * 7) % 70}
                          x2={10 + ((k + 3) * 17 + i * 5) % 180} y2={15 + ((k + 3) * 11 + i * 7) % 70}
                          stroke={color} strokeOpacity="0.35" strokeWidth="0.6" />
                      ))}
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-widest" style={{ color }}>~/builds/{p.name.toLowerCase()}</div>
                  </div>

                  <h3 className="font-display text-xl" style={{ color }}>{p.name}</h3>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/60">{p.tagline}</div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-foreground/75">{p.desc}</p>

                  <div className="mt-3 font-mono text-[11px] text-foreground/60">
                    <span className="text-cyan">arch:</span> {p.arch}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-sm border border-foreground/20 bg-surface/60 px-1.5 py-0.5 font-mono text-[10px] text-foreground/80">{s}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2 pt-4">
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-sm border border-cyan/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan hover:bg-cyan/10">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-sm border border-purple/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-purple hover:bg-purple/10">
                      <ExternalLink className="h-3.5 w-3.5" /> Demo
                    </a>
                  </div>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                    style={{ background: `radial-gradient(600px circle at var(--mx,50%) var(--my,50%), ${color}22, transparent 40%)` }} />
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
