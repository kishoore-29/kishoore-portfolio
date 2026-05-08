import SectionHeader from "@/components/hud/SectionHeader";
import { interests } from "@/data/portfolio";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

export default function Interests() {
  return (
    <section id="interests" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="02" title="DOMAINS_OF_INTEREST" subtitle="Areas I dissect, build with, and continuously learn." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {interests.map((it, i) => {
            const Icon = (Icons as any)[it.icon] ?? Icons.Sparkles;
            const color = `var(--neon-${it.color})`;
            return (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group holo-panel hud-corners relative overflow-hidden p-5"
                style={{ borderColor: color }}
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-sm border"
                    style={{ borderColor: color, boxShadow: `0 0 14px ${color}`, background: `color-mix(in oklab, ${color} 12%, transparent)` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <h3 className="font-display text-base">{it.title}</h3>
                </div>
                <p className="font-mono text-xs leading-relaxed text-foreground/70">{it.desc}</p>
                {/* mini sparkline */}
                <svg viewBox="0 0 100 24" className="mt-4 h-6 w-full opacity-80">
                  <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="1.2"
                    points={Array.from({ length: 12 }).map((_, j) => `${j * 9},${20 - Math.abs(Math.sin((i + j) * 0.7)) * 16}`).join(" ")}
                  />
                </svg>
                <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 100%, ${color}, transparent 60%)` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
