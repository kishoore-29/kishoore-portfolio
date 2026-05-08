import { useEffect, useState } from "react";

export default function TypeWriter({
  text,
  speed = 30,
  className = "",
  onDone,
}: { text: string; speed?: number; className?: string; onDone?: () => void }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); onDone?.(); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);
  return <span className={className}>{out}</span>;
}
