import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative py-12">
      <div className="container mx-auto px-6">
        <div className="relative h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-purple), var(--neon-magenta), transparent)" }} />
        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="font-mono text-xs text-foreground/60">
            <span className="text-green">$</span> echo "Built through curiosity, systems thinking, and continuous learning."
          </div>
          {/* waveform */}
          <svg viewBox="0 0 200 24" className="h-6 w-48 opacity-80" aria-hidden>
            {Array.from({ length: 40 }).map((_, i) => {
              const h = 4 + Math.abs(Math.sin(i * 0.7)) * 18;
              return <rect key={i} x={i * 5} y={(24 - h) / 2} width="2" height={h} fill="var(--neon-cyan)">
                <animate attributeName="height" values={`${h};${h * 0.4};${h}`} dur={`${1 + (i % 5) * 0.2}s`} repeatCount="indefinite" />
              </rect>;
            })}
          </svg>
          <div className="font-mono text-xs text-foreground/60">© {new Date().getFullYear()} {profile.name} · <span className="text-cyan blink-cursor">end_of_transmission</span></div>
        </div>
      </div>
    </footer>
  );
}
