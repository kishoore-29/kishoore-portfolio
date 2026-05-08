import SectionHeader from "@/components/hud/SectionHeader";
import TypeWriter from "@/components/effects/TypeWriter";
import { motion } from "framer-motion";
import { Cpu, GitBranch, Layers, Activity } from "lucide-react";

const quotes = [
  "Abstraction is useful, but understanding the layers beneath matters more.",
  "I learn by dissecting systems until every layer makes sense.",
  "I don't just use technology — I analyze how it works.",
];

const timeline = [
  { year: "2022", title: "Boot — CSE Engineering", body: "Began formal study of computer science fundamentals." },
  { year: "2023", title: "Systems thinking unlocked", body: "Dove into DSA, OS, and networks. Started ranking on Skillrack." },
  { year: "2024", title: "Internship & 1st place", body: "Frontend intern @ Iproat Solutions. Won Code Swap Showdown." },
  { year: "2025", title: "Full-stack + security", body: "Spring Boot backends, JWT/RBAC, ethical hacking, AWS architecting." },
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="01" title="ABOUT_OPERATOR" subtitle="A focused learner who studies systems until every layer makes sense." />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="holo-panel hud-corners p-6 font-mono text-sm md:p-8">
            <div className="mb-4 flex items-center justify-between border-b border-cyan/30 pb-2 text-xs uppercase tracking-widest text-cyan">
              <span>~/about/kishoore.md</span>
              <span className="text-green">READ-ONLY</span>
            </div>
            <div className="space-y-3 leading-relaxed text-foreground/85">
              <p><span className="text-cyan">$</span> cat identity.txt</p>
              <p>
                <TypeWriter
                  speed={14}
                  text={"Computer Science student. Curious about systems. I prefer understanding internals over relying on abstractions — kernels, packets, protocols, allocators, schedulers."}
                />
              </p>
              {quotes.map((q, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="border-l-2 border-purple/60 pl-3 italic text-foreground/75">
                  "{q}"
                </motion.p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Cpu, label: "uptime", val: "3y+" },
                { icon: Layers, label: "stack depth", val: "L1→L7" },
                { icon: GitBranch, label: "commits", val: "1.2k+" },
                { icon: Activity, label: "focus", val: "high" },
              ].map((s, i) => (
                <div key={i} className="rounded-sm border border-cyan/30 bg-surface/60 p-3 text-center">
                  <s.icon className="mx-auto h-4 w-4 text-cyan" />
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-foreground/50">{s.label}</div>
                  <div className="font-display text-lg text-cyan">{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="holo-panel hud-corners p-6 md:p-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-widest text-purple">// learning_timeline</div>
            <ol className="relative space-y-5 border-l border-purple/40 pl-5">
              {timeline.map((t, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-purple" style={{ boxShadow: "0 0 10px var(--neon-purple)" }} />
                  <div className="font-mono text-xs text-cyan">{t.year}</div>
                  <div className="font-display text-base text-foreground">{t.title}</div>
                  <div className="text-sm text-foreground/70">{t.body}</div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
