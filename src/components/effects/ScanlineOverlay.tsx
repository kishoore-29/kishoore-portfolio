export default function ScanlineOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, transparent 0, transparent 2px, rgba(255,255,255,0.5) 3px, transparent 4px)",
        }}
      />
      <div className="absolute inset-x-0 h-24 scanline-sweep"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(125, 249, 255, 0.06), transparent)",
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}
