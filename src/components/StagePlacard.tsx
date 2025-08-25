// StagePlacard.tsx
import { motion } from "motion/react";

type ChatBubbleProps = {
  text: string;
  from?: "magician" | "system";
  showTail?: boolean;
  className?: string;
};

export default function StagePlacard({
  text,
  from = "magician",
  className = "",
}: ChatBubbleProps) {
  const isLeft = from === "magician";
  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}>
      <motion.div
        initial={{ opacity: 0, y: -8, rotateX: -30 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`relative max-w-[720px] px-6 py-4 rounded-xl text-amber-100
          bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900
          ring-2 ring-amber-400 shadow-[0_8px_40px_rgba(0,0,0,0.45)]
          ${className}`}
      >
        {/* subtle marquee lights */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(255,215,0,0.8)]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity }}
            />
          ))}
        </div>

        <p className="font-semibold tracking-wide leading-snug">{text}</p>
      </motion.div>
    </div>
  );
}
