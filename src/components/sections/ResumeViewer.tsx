import SectionHeader from "@/components/hud/SectionHeader";
import { profile } from "@/data/profile";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NeonAnchor } from "@/components/hud/NeonButton";
import { Download, ExternalLink, FileText } from "lucide-react";

export default function ResumeViewer() {
  const [loading, setLoading] = useState(true);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => Math.min(100, p + 6 + Math.random() * 18)), 90);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (pct >= 100) { const t = setTimeout(() => setLoading(false), 200); return () => clearTimeout(t); } }, [pct]);

  return (
    <section id="resume" className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionHeader index="08" title="SECURE_DOCUMENT" subtitle="Live preview of resume.pdf — verified, signed, downloadable." />

        <div className="holo-panel hud-corners overflow-hidden">
          <div className="flex items-center justify-between border-b border-cyan/30 bg-surface/80 px-3 py-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan"><FileText className="h-3.5 w-3.5" /> /docs/kishoore_resume.pdf</div>
            <div className="flex items-center gap-3">
              <NeonAnchor variant="cyan" href={profile.resumePath} download className="!px-3 !py-1.5 !text-xs">
                <Download className="h-3.5 w-3.5" /> Download
              </NeonAnchor>
              <NeonAnchor variant="purple" href={profile.resumePath} target="_blank" className="!px-3 !py-1.5 !text-xs">
                <ExternalLink className="h-3.5 w-3.5" /> Open
              </NeonAnchor>
            </div>
          </div>
          <div className="relative h-[640px] bg-background">
            {loading ? (
              <div className="grid h-full place-items-center font-mono text-sm">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-80 space-y-2">
                  <div className="text-cyan">{`> ACCESSING DOCUMENT...`}</div>
                  <div className="text-purple">{`> verifying signature [${pct.toFixed(0)}%]`}</div>
                  <div className="h-1.5 w-full overflow-hidden bg-surface-2">
                    <div className="h-full bg-cyan transition-[width]" style={{ width: `${pct}%`, boxShadow: "0 0 8px var(--neon-cyan)" }} />
                  </div>
                  <div className="text-foreground/50">{`> decrypting kishoore_resume.pdf...`}</div>
                </motion.div>
              </div>
            ) : (
              <iframe title="Resume" src={profile.resumePath} className="h-full w-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
