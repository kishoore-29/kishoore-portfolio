import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "cyan" | "purple" | "magenta" | "green";
  asChild?: boolean;
};

export function NeonButton({ children, variant = "cyan", className = "", ...rest }: Props) {
  const colorVar = `var(--neon-${variant})`;
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className={`group relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-foreground transition ${className}`}
      style={{
        color: "white",
        background: `linear-gradient(135deg, color-mix(in oklab, ${colorVar} 18%, transparent), color-mix(in oklab, ${colorVar} 6%, transparent))`,
        border: `1px solid ${colorVar}`,
        boxShadow: `0 0 14px color-mix(in oklab, ${colorVar} 40%, transparent), inset 0 0 18px color-mix(in oklab, ${colorVar} 12%, transparent)`,
      }}
      {...(rest as any)}
    >
      <span className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
        style={{ boxShadow: `0 0 30px ${colorVar}, 0 0 60px color-mix(in oklab, ${colorVar} 50%, transparent)` }}
      />
      <span className="absolute -top-px left-3 right-3 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colorVar}, transparent)` }}
      />
      {children}
    </motion.button>
  );
}

export function NeonAnchor(
  { children, variant = "cyan", className = "", ...rest }: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & { variant?: "cyan" | "purple" | "magenta" | "green"; children: ReactNode }
) {
  const colorVar = `var(--neon-${variant})`;
  return (
    <a
      className={`group relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-white transition hover:-translate-y-0.5 ${className}`}
      style={{
        background: `linear-gradient(135deg, color-mix(in oklab, ${colorVar} 18%, transparent), color-mix(in oklab, ${colorVar} 6%, transparent))`,
        border: `1px solid ${colorVar}`,
        boxShadow: `0 0 14px color-mix(in oklab, ${colorVar} 40%, transparent)`,
      }}
      {...rest}
    >
      <span className="absolute -top-px left-3 right-3 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colorVar}, transparent)` }}
      />
      {children}
    </a>
  );
}
