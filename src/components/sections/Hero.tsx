import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { NeonButton, NeonAnchor } from "@/components/hud/NeonButton";
import SystemStats from "@/components/hud/SystemStats";
import ParticleField from "@/components/effects/ParticleField";
import TypeWriter from "@/components/effects/TypeWriter";
import { Download, Terminal, Boxes } from "lucide-react";

const codeSnippets = [
  `void* malloc(size_t n) {\n  // arena_alloc(...)\n}`,
  `tcp_recv(sk, skb) {\n  if (!skb) goto drop;\n}`,
  `sudo pacman -Syu`,
  `git rebase -i HEAD~5`,
  `nmap -sV -p- 10.0.0.0/24`,
];

export default function Hero() {
  const [tagIdx, setTagIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTagIdx((i) => (i + 1) % profile.taglines.length), 3200);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <ParticleField count={120} />
      {/* floating code snippets */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {codeSnippets.map((c, i) => (
          <motion.pre
            key={i}
            className="absolute font-mono text-[10px] text-cyan/40"
            style={{ top: `${10 + i * 15}%`, left: `${i % 2 ? 70 : 5}%` }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          >{c}</motion.pre>
        ))}
      </div>

      <div className="container relative z-10 mx-auto grid gap-10 px-6 py-24 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cyan">
            <span className="h-2 w-2 rounded-full bg-green pulse-ring" />
            ONLINE · {profile.handle}
          </div>

          <h1 className="font-display text-4xl leading-tight md:text-6xl xl:text-7xl">
            <span className="glitch text-gradient-neon" data-text="Engineering systems">Engineering systems</span>
            <br />
            <span className="text-foreground">beyond</span>{" "}
            <span className="text-purple glow-text">abstraction.</span>
          </h1>

          <div className="h-7 font-mono text-base text-foreground/80 md:text-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={tagIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-cyan">▸</span>{" "}
                <TypeWriter text={profile.taglines[tagIdx]} speed={28} />
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="max-w-xl font-mono text-sm text-foreground/60 md:text-base">
            {profile.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <NeonButton variant="cyan" onClick={scrollTo("projects")}>
              <Boxes className="h-4 w-4" /> View Projects
            </NeonButton>
            <NeonButton variant="purple" onClick={scrollTo("terminal")}>
              <Terminal className="h-4 w-4" /> Open Terminal
            </NeonButton>
            <NeonAnchor variant="magenta" href={profile.resumePath} download>
              <Download className="h-4 w-4" /> Download Resume
            </NeonAnchor>
          </div>
        </div>

        <div className="relative animate-float">
          <SystemStats />
        </div>
      </div>
    </section>
  );
}
