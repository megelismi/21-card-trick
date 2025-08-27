import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

function ConfettiBurst({ onDone }: { onDone?: () => void }) {
  // Precompute particle vectors so every mount has a nice spread
  const pieces = useMemo(() => {
    const N = 100;
    const arr = Array.from({ length: N }, (_, i) => {
      // fan out in 360deg with small randomness
      const base = (i / N) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.35;
      const angle = base + jitter;
      const radius = 120 + Math.random() * 100; // px travel
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius - 12; // bias slightly upward
      const rotate = (Math.random() - 0.5) * 140;
      const scale = 0.8 + Math.random() * 0.8;
      const duration = 0.65 + Math.random() * 0.35;
      const delay = Math.random() * 0.05;
      const colorPool = ["#FFD700", "#FFC107", "#FFE066", "#FFF4B0", "#FFFFFF"];
      const color = colorPool[Math.floor(Math.random() * colorPool.length)];
      const isCircle = Math.random() < 0.35;
      const w = isCircle ? 6 + Math.random() * 5 : 4 + Math.random() * 8;
      const h = isCircle ? w : 6 + Math.random() * 10;
      return { x, y, rotate, scale, duration, delay, color, w, h, isCircle };
    });
    return arr;
  }, []);

  const [done, setDone] = useState(false);
  useEffect(() => {
    const total = Math.max(...pieces.map((p) => p.duration + p.delay)) * 1000;
    const t = setTimeout(() => {
      setDone(true);
      onDone?.();
    }, total + 50);
    return () => clearTimeout(t);
  }, [pieces, onDone]);

  if (done) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* origin: center of the card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {pieces.map((p, i) => (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.6 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [0, 1, 0],
              rotate: p.rotate,
              scale: p.scale,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
            style={{
              display: "inline-block",
              width: p.w,
              height: p.h,
              borderRadius: p.isCircle ? "9999px" : "2px",
              background: p.color,
              boxShadow: "0 0 6px rgba(255, 215, 0, 0.5)",
              margin: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ConfettiBurst;
