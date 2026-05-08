import SectionHeader from "@/components/hud/SectionHeader";
import { achievements } from "@/data/portfolio";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Trophy, Award, Code2, Star, Cpu } from "lucide-react";

const icons = [Code2, Code2, Trophy, Star, Award];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: 1.6, ease: "easeOut" });
    const u = mv.on("change", (v) => { if (ref.current) ref.current.textContent = Math.round(v).toString(); });
    return () => { c.stop(); u(); };
  }, [inView, to, mv]);
  return <><span ref={ref}>0</span>{suffix}</>;
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="06" title="ACHIEVEMENT_TERMINAL" subtitle="Unlocked metrics, badges, and recognitions." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = icons[i] ?? Cpu;
            const color = `var(--neon-${a.color})`;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="holo-panel hud-corners relative overflow-hidden p-5"
                style={{ borderColor: color }}
              >
                <div className="absolute right-3 top-3">
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">UNLOCKED</div>
                <div className="mt-2 font-display text-4xl" style={{ color, textShadow: `0 0 12px ${color}` }}>
                  <Counter to={a.value} suffix={a.suffix} />
                </div>
                <div className="mt-1 font-mono text-sm text-foreground/85">{a.label}</div>
                {a.note && <div className="mt-1 font-mono text-[11px] text-foreground/50">// {a.note}</div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
