import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "[ BIOS ] Initializing Engineering OS v4.2.1 ...",
  "[ OK ] Mounting /home/kishoore",
  "[ OK ] Loading kernel module: curiosity.ko",
  "[ OK ] Bringing up network: eth0 → 10.0.0.29",
  "[ OK ] Spawning subsystems: dsa, networks, linux, security",
  "[ OK ] Decrypting identity vault ...",
  "[ ✓  ] Welcome, kishoore — system online.",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (i >= lines.length) {
      const t = setTimeout(() => { setShow(false); onDone(); }, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 220 + Math.random() * 180);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-[min(640px,90vw)] font-mono text-sm md:text-base">
            <div className="text-cyan glow-text mb-4 font-display text-xl">KISHOORE.OS</div>
            {lines.slice(0, i).map((l, idx) => (
              <div key={idx} className={l.includes("✓") ? "text-green" : "text-foreground/80"}>
                {l}
              </div>
            ))}
            {i < lines.length && (
              <div className="text-cyan blink-cursor">{">"}_</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
