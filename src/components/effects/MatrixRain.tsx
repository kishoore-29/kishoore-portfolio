import { useEffect, useRef } from "react";

export default function MatrixRain({ density = 1, opacity = 0.18 }: { density?: number; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const chars = "01ABCDEF{}<>/\\#$%*アイウエオカキクケコサシスセソタチツテト".split("");
    let cols = 0;
    let drops: number[] = [];
    const fontSize = 14;

    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.scale(dpr, dpr);
      cols = Math.floor(innerWidth / fontSize / (1 / density));
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 8, 14, 0.08)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize * (1 / density);
        const y = drops[i] * fontSize;
        const isHead = Math.random() > 0.96;
        ctx.fillStyle = isHead ? `rgba(170,255,255,${opacity * 4})` : `rgba(80,255,180,${opacity})`;
        ctx.fillText(text, x, y);
        if (y > innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [density, opacity]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}
