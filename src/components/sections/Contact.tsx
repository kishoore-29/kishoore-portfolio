import SectionHeader from "@/components/hud/SectionHeader";
import { profile } from "@/data/profile";
import { useState } from "react";
import { motion } from "framer-motion";
import { NeonAnchor, NeonButton } from "@/components/hud/NeonButton";
import { Github, Linkedin, Mail, Send, Code2, Download } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject || `Hello from ${name || "the web"}`)}&body=${encodeURIComponent(`${body}\n\n— ${name || "anonymous"}`)}`;
    setTimeout(() => { window.location.href = mailto; setSending(false); }, 700);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="10" title="ENCRYPTED_TRANSMISSION" subtitle="Open a secure channel — direct mailto handoff." />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="holo-panel hud-corners space-y-4 p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-cyan">// channels</div>
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, color: "cyan" },
              { icon: Github, label: "GitHub", value: profile.links.github.replace("https://", ""), href: profile.links.github, color: "purple" },
              { icon: Linkedin, label: "LinkedIn", value: profile.links.linkedin.replace("https://", ""), href: profile.links.linkedin, color: "magenta" },
              { icon: Code2, label: "LeetCode", value: profile.links.leetcode.replace("https://", ""), href: profile.links.leetcode, color: "green" },
            ].map((c) => {
              const color = `var(--neon-${c.color})`;
              return (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="group flex items-center gap-4 rounded-sm border border-foreground/10 bg-surface/40 p-3 font-mono text-sm transition hover:border-cyan/40 hover:bg-cyan/5">
                  <div className="grid h-9 w-9 place-items-center rounded-sm border" style={{ borderColor: color, color, boxShadow: `0 0 10px ${color}` }}>
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-foreground/50">{c.label}</div>
                    <div className="truncate text-foreground/90 group-hover:text-cyan">{c.value}</div>
                  </div>
                </a>
              );
            })}

            <div className="pt-2">
              <NeonAnchor variant="cyan" href={profile.resumePath} download className="!w-full !justify-center">
                <Download className="h-4 w-4" /> Download Resume
              </NeonAnchor>
            </div>
          </div>

          <form onSubmit={submit} className="holo-panel hud-corners space-y-4 p-6">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span className="text-purple">// compose_transmission</span>
              <span className="text-green">AES-256 ✓</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="callsign">
                <input value={name} onChange={(e) => setName(e.target.value)} required className="cyber-input" placeholder="your name" />
              </Field>
              <Field label="subject">
                <input value={subject} onChange={(e) => setSubject(e.target.value)} required className="cyber-input" placeholder="re: collaboration" />
              </Field>
            </div>
            <Field label="payload">
              <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={6} className="cyber-input resize-none" placeholder="message body..." />
            </Field>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">channel: secure-mail · tls 1.3</span>
              <NeonButton variant="cyan" type="submit" disabled={sending}>
                <motion.span animate={sending ? { x: [0, 8, 0] } : {}} transition={{ repeat: sending ? Infinity : 0, duration: 0.8 }} className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" /> {sending ? "TRANSMITTING..." : "TRANSMIT"}
                </motion.span>
              </NeonButton>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .cyber-input {
          width: 100%; padding: 0.55rem 0.75rem;
          background: color-mix(in oklab, var(--surface) 80%, transparent);
          border: 1px solid color-mix(in oklab, var(--neon-cyan) 30%, transparent);
          color: var(--foreground);
          font-family: var(--font-mono); font-size: 0.85rem;
          border-radius: 2px; outline: none; transition: all 0.2s;
        }
        .cyber-input:focus { border-color: var(--neon-cyan); box-shadow: 0 0 0 3px color-mix(in oklab, var(--neon-cyan) 18%, transparent); }
        .cyber-input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50">{label}</div>
      {children}
    </label>
  );
}
