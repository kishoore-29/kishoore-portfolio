import { useEffect, useState } from "react";

function rand(min: number, max: number) { return min + Math.random() * (max - min); }

export default function SystemStats() {
  const [cpu, setCpu] = useState(34);
  const [ram, setRam] = useState(58);
  const [net, setNet] = useState(120);
  const [packets, setPackets] = useState<number[]>(Array(24).fill(0).map(() => Math.random()));
  const [time, setTime] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setCpu(c => Math.max(8, Math.min(96, c + rand(-7, 7))));
      setRam(r => Math.max(20, Math.min(92, r + rand(-3, 3))));
      setNet(n => Math.max(20, Math.min(900, n + rand(-40, 40))));
      setPackets(p => [...p.slice(1), Math.random()]);
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB"));
    }, 700);
    return () => clearInterval(id);
  }, []);

  const Bar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-foreground/60">
        <span>{label}</span><span style={{ color }}>{value.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-sm bg-surface-2">
        <div className="h-full transition-[width] duration-500" style={{ width: `${value}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
    </div>
  );

  return (
    <div className="holo-panel hud-corners w-full max-w-xs space-y-3 p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cyan/30 pb-2">
        <span className="text-cyan font-display tracking-widest">SYS_MONITOR</span>
        <span className="text-green">{time}</span>
      </div>
      <Bar label="CPU" value={cpu} color="var(--neon-cyan)" />
      <Bar label="MEM" value={ram} color="var(--neon-purple)" />
      <Bar label="NET" value={Math.min(100, net / 10)} color="var(--neon-green)" />
      <div>
        <div className="mb-1 flex justify-between text-[10px] uppercase tracking-widest text-foreground/60">
          <span>PACKETS</span><span className="text-amber">{net.toFixed(0)} kb/s</span>
        </div>
        <div className="flex h-10 items-end gap-[2px]">
          {packets.map((p, i) => (
            <div key={i} className="flex-1 bg-cyan" style={{ height: `${20 + p * 80}%`, opacity: 0.4 + p * 0.6, boxShadow: "0 0 4px var(--neon-cyan)" }} />
          ))}
        </div>
      </div>
      <div className="text-foreground/50">
        <div>eth0  → 10.0.0.29</div>
        <div>uplink → secure ✓</div>
      </div>
    </div>
  );
}
