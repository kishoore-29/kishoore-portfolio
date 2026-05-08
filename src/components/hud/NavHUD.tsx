import { useEffect, useState } from "react";

const ITEMS = [
  { id: "hero", label: "00 INIT" },
  { id: "about", label: "01 ABOUT" },
  { id: "interests", label: "02 INTERESTS" },
  { id: "skills", label: "03 SKILLS" },
  { id: "experience", label: "04 LOG" },
  { id: "projects", label: "05 BUILDS" },
  { id: "achievements", label: "06 STATS" },
  { id: "certs", label: "07 VAULT" },
  { id: "resume", label: "08 DOC" },
  { id: "terminal", label: "09 SHELL" },
  { id: "contact", label: "10 LINK" },
];

export default function NavHUD() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ITEMS.forEach((i) => { const el = document.getElementById(i.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="space-y-1.5 font-mono text-[10px] tracking-widest">
        {ITEMS.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`group flex items-center gap-2 rounded-sm px-2 py-1 transition ${active === i.id ? "text-cyan" : "text-foreground/40 hover:text-foreground/80"}`}
            >
              <span
                className={`block h-1 w-6 transition-all ${active === i.id ? "bg-cyan" : "bg-foreground/30"}`}
                style={active === i.id ? { boxShadow: "0 0 8px var(--neon-cyan)" } : undefined}
              />
              <span className="opacity-0 transition group-hover:opacity-100">{i.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
