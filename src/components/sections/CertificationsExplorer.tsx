import SectionHeader from "@/components/hud/SectionHeader";
import { certifications, type CertCategory } from "@/data/portfolio";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Folder, FolderOpen, X, Download, ExternalLink, Minus, Square, ShieldCheck, ChevronRight } from "lucide-react";
import { Rnd } from "react-rnd";

const FOLDERS: { name: string; cats: CertCategory[] }[] = [
  { name: "All Certificates", cats: ["Cloud", "Security", "Programming", "Internship", "Competitions", "IoT", "Platform"] },
  { name: "Cloud", cats: ["Cloud"] },
  { name: "Security", cats: ["Security"] },
  { name: "Programming", cats: ["Programming"] },
  { name: "IoT", cats: ["IoT"] },
  { name: "Internship", cats: ["Internship"] },
  { name: "Competitions", cats: ["Competitions"] },
  { name: "Platform", cats: ["Platform"] },
];

function Decrypting({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => Math.min(100, p + 4 + Math.random() * 14)), 80);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (pct >= 100) { const t = setTimeout(onDone, 250); return () => clearTimeout(t); } }, [pct, onDone]);
  return (
    <div className="grid h-full place-items-center font-mono text-xs text-cyan">
      <div className="w-72 space-y-2">
        <div>{`> mounting encrypted volume...`}</div>
        <div>{`> decrypting cert payload [${pct.toFixed(0)}%]`}</div>
        <div className="h-1.5 w-full overflow-hidden bg-surface-2">
          <div className="h-full bg-cyan transition-[width]" style={{ width: `${pct}%`, boxShadow: "0 0 8px var(--neon-cyan)" }} />
        </div>
        <div className="text-foreground/50">{`> verifying signature...`}</div>
      </div>
    </div>
  );
}

export default function CertificationsExplorer() {
  const [activeFolder, setActiveFolder] = useState(FOLDERS[0]);
  const [openCertId, setOpenCertId] = useState<string | null>(null);
  const [decrypting, setDecrypting] = useState(false);

  const files = useMemo(() => certifications.filter(c => activeFolder.cats.includes(c.category)), [activeFolder]);
  const openCert = certifications.find(c => c.id === openCertId);

  const open = (id: string) => { setOpenCertId(id); setDecrypting(true); };

  return (
    <section id="certs" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="07" title="CERT_VAULT" subtitle="Encrypted document explorer — double-click any file to decrypt and view." />

        <div className="holo-panel hud-corners overflow-hidden">
          {/* window title bar */}
          <div className="flex items-center justify-between border-b border-cyan/30 bg-surface/80 px-3 py-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan">
              <FolderOpen className="h-3.5 w-3.5" />
              <span>kishoore@arch:~/vault/certifications/{activeFolder.name.toLowerCase().replace(/\s+/g, "_")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="grid h-3 w-3 place-items-center rounded-full bg-amber/70"><Minus className="h-2 w-2 text-background" /></span>
              <span className="grid h-3 w-3 place-items-center rounded-full bg-green/80"><Square className="h-2 w-2 text-background" /></span>
              <span className="grid h-3 w-3 place-items-center rounded-full bg-magenta/80"><X className="h-2 w-2 text-background" /></span>
            </div>
          </div>

          <div className="grid min-h-[420px] md:grid-cols-[200px_1fr]">
            {/* sidebar */}
            <aside className="border-b border-cyan/20 bg-background/50 p-3 md:border-b-0 md:border-r">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">Quick Access</div>
              <ul className="space-y-1 font-mono text-xs">
                {FOLDERS.map((f) => (
                  <li key={f.name}>
                    <button
                      onClick={() => setActiveFolder(f)}
                      className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left transition ${activeFolder.name === f.name ? "bg-cyan/10 text-cyan" : "text-foreground/70 hover:bg-surface-2"}`}
                    >
                      {activeFolder.name === f.name ? <FolderOpen className="h-3.5 w-3.5" /> : <Folder className="h-3.5 w-3.5" />}
                      <span className="truncate">{f.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* file grid */}
            <div className="relative p-4">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] text-foreground/50">
                <ChevronRight className="h-3 w-3 text-cyan" /> {files.length} item(s)
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {files.map((c) => (
                  <motion.button
                    key={c.id}
                    onDoubleClick={() => open(c.id)}
                    onClick={() => open(c.id)}
                    whileHover={{ y: -3 }}
                    className="group flex flex-col items-center gap-2 rounded-sm border border-transparent p-3 text-center font-mono text-[11px] transition hover:border-cyan/40 hover:bg-cyan/5"
                  >
                    <div className="relative">
                      <FileText className="h-12 w-12 text-cyan" style={{ filter: "drop-shadow(0 0 6px var(--neon-cyan))" }} />
                      <span className="absolute -bottom-1 -right-1 rounded-sm bg-purple px-1 py-px text-[8px] text-white">PDF</span>
                    </div>
                    <span className="line-clamp-2 text-foreground/80 group-hover:text-cyan">{c.name}</span>
                    <span className="text-[10px] text-foreground/40">{c.issuer}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* preview window */}
      <AnimatePresence>
        {openCert && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-background/80 p-4 backdrop-blur"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenCertId(null)}
          >
            <Rnd
              default={{ x: 0, y: 0, width: Math.min(900, window.innerWidth - 40), height: Math.min(640, window.innerHeight - 80) }}
              minWidth={420} minHeight={360}
              bounds="window"
              dragHandleClassName="drag-handle"
              onClick={(e: any) => e.stopPropagation()}
              className="!relative"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="holo-panel flex h-full flex-col overflow-hidden"
                style={{ boxShadow: "0 0 40px color-mix(in oklab, var(--neon-cyan) 40%, transparent)" }}
              >
                <div className="drag-handle flex cursor-move items-center justify-between border-b border-cyan/30 bg-surface/80 px-3 py-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-cyan">
                    <FileText className="h-3.5 w-3.5" /> {openCert.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={openCert.file} download className="inline-flex items-center gap-1 text-foreground/70 hover:text-cyan">
                      <Download className="h-3.5 w-3.5" /> save
                    </a>
                    {openCert.verifyUrl && (
                      <a href={openCert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground/70 hover:text-purple">
                        <ShieldCheck className="h-3.5 w-3.5" /> verify
                      </a>
                    )}
                    <a href={openCert.file} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground/70 hover:text-cyan">
                      <ExternalLink className="h-3.5 w-3.5" /> open
                    </a>
                    <button onClick={() => setOpenCertId(null)} className="text-magenta"><X className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="flex-1 bg-background">
                  {decrypting ? (
                    <Decrypting onDone={() => setDecrypting(false)} />
                  ) : (
                    <iframe title={openCert.name} src={openCert.file} className="h-full w-full" />
                  )}
                </div>
              </motion.div>
            </Rnd>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
