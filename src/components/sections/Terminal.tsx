import SectionHeader from "@/components/hud/SectionHeader";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { projects, achievements, skillCategories, certifications } from "@/data/portfolio";

type Line = { text: string; color?: string };

const NEOFETCH = `
       __,-~~/~    ‾‾‾\\__,
   _/_,---(      ,    )
___/   (    /,-'~‾~ _/
            (~/'      )
       /~|     )    /
      / |   _/    /
     |  |__/_____/        kishoore@arch
     |__|                 ----------------
                           OS    : Arch Linux x86_64
                           Shell : zsh / fish
                           Editor: Neovim · VS Code
                           Stack : React · Spring Boot
                           Focus : systems · networks · security
`.split("\n").map((t) => ({ text: t, color: "var(--neon-cyan)" }));

function helpText(): Line[] {
  return [
    { text: "Available commands:", color: "var(--neon-cyan)" },
    { text: "  whoami          identity dump" },
    { text: "  skills          stack diagnostics" },
    { text: "  projects        engineered builds" },
    { text: "  achievements    unlocked metrics" },
    { text: "  certifications  cert vault" },
    { text: "  resume          open resume.pdf" },
    { text: "  contact         transmission console" },
    { text: "  neofetch        system info" },
    { text: "  sudo            ...nice try." },
    { text: "  clear           clear terminal" },
    { text: "  help            this list" },
  ];
}

const banner: Line[] = [
  { text: "kishoore.os v4.2.1 — interactive shell", color: "var(--neon-purple)" },
  { text: "Type `help` to list commands.", color: "var(--neon-cyan)" },
  { text: "" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(banner);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const print = (newLines: Line[]) => setLines((l) => [...l, ...newLines]);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handle = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    print([{ text: `kishoore@arch:~$ ${raw}`, color: "var(--neon-green)" }]);
    if (!cmd) return;
    setHistory((h) => [...h, raw]);
    setHIdx(-1);

    switch (cmd) {
      case "help": print(helpText()); break;
      case "clear": setLines([]); break;
      case "whoami":
        print([
          { text: `${profile.name} — ${profile.title}`, color: "var(--neon-cyan)" },
          { text: profile.subtitle },
          { text: `github:   ${profile.links.github}` },
          { text: `linkedin: ${profile.links.linkedin}` },
          { text: `leetcode: ${profile.links.leetcode}` },
        ]);
        break;
      case "skills":
        skillCategories.forEach((cat) => {
          print([{ text: `[${cat.name}]`, color: "var(--neon-purple)" }]);
          print(cat.items.map(([n, v]) => ({ text: `  ${String(n).padEnd(18, ".")} ${v}%` })));
        });
        break;
      case "projects":
        projects.forEach((p) => {
          print([
            { text: `▸ ${p.name}`, color: "var(--neon-cyan)" },
            { text: `  ${p.desc}` },
            { text: `  stack: ${p.stack.join(", ")}` },
            { text: "" },
          ]);
        });
        break;
      case "achievements":
        print(achievements.map(a => ({ text: `★ ${a.value}${a.suffix} — ${a.label}${a.note ? ` (${a.note})` : ""}` })));
        break;
      case "certifications":
      case "certs":
        print([{ text: "Opening cert vault...", color: "var(--neon-cyan)" }]);
        goto("certs");
        print(certifications.map(c => ({ text: `📄 ${c.name} — ${c.issuer}` })));
        break;
      case "resume":
        print([{ text: "ACCESSING DOCUMENT...", color: "var(--neon-cyan)" }]);
        goto("resume");
        break;
      case "contact":
        print([
          { text: `email:    ${profile.email}` },
          { text: `linkedin: ${profile.links.linkedin}` },
          { text: `github:   ${profile.links.github}` },
        ]);
        goto("contact");
        break;
      case "neofetch":
        print(NEOFETCH);
        break;
      case "sudo":
      case "sudo su":
        print([{ text: "[sudo] password for kishoore: ********", color: "var(--neon-amber)" }]);
        print([{ text: "kishoore is not in the sudoers file. This incident will be reported.", color: "var(--neon-magenta)" }]);
        break;
      default:
        print([{ text: `command not found: ${cmd}. type 'help'.`, color: "var(--neon-magenta)" }]);
    }
  };

  return (
    <section id="terminal" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="09" title="INTERACTIVE_SHELL" subtitle="A real terminal — try `whoami`, `projects`, `neofetch`, `sudo`." />

        <div className="holo-panel hud-corners overflow-hidden" onClick={() => inputRef.current?.focus()}>
          <div className="flex items-center justify-between border-b border-cyan/30 bg-surface/80 px-3 py-2 font-mono text-xs">
            <span className="text-cyan">kishoore@arch — bash — 120x32</span>
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-magenta" />
              <span className="h-3 w-3 rounded-full bg-amber" />
              <span className="h-3 w-3 rounded-full bg-green" />
            </div>
          </div>
          <div ref={scrollRef} className="h-[440px] overflow-y-auto bg-background/95 p-4 font-mono text-[13px] leading-relaxed">
            {lines.map((l, i) => (
              <pre key={i} className="whitespace-pre-wrap" style={{ color: l.color || "rgba(255,255,255,0.85)" }}>{l.text}</pre>
            ))}
            <form onSubmit={(e) => { e.preventDefault(); handle(input); setInput(""); }} className="mt-1 flex items-center gap-2">
              <span className="text-green">kishoore@arch:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const ni = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
                    setHIdx(ni); setInput(history[ni] ?? "");
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    if (hIdx < 0) return;
                    const ni = hIdx + 1;
                    if (ni >= history.length) { setHIdx(-1); setInput(""); }
                    else { setHIdx(ni); setInput(history[ni]); }
                  }
                }}
                autoFocus
                className="flex-1 bg-transparent text-foreground caret-cyan outline-none"
                spellCheck={false}
                aria-label="terminal input"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
