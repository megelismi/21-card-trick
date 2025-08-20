import { useState } from "react";
import StackButton from "./StackButton";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { CardTrickEvents } from "../types/cardTrickMachine";
import type { SelectedStack } from "../types/cardTrickMachine";

// const lift = {
//   rest: {
//     boxShadow: "0 2px 8px rgba(0,0,0,0.25), inset 0 0 0 rgba(255,255,255,0)",
//     filter: "brightness(1)",
//   },
//   hover: {
//     boxShadow:
//       "0 20px 60px rgba(0,0,0,0.6), inset 0 0 24px rgba(255,255,255,0.35)",
//     filter: "brightness(1.05)",
//   },
// };

function CardStack({
  phase,
  children,
  stackNumber,
  send,
}: {
  phase: string;
  children: ReactNode;
  stackNumber: SelectedStack;
  send: (arg0: CardTrickEvents) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleStackSelected = (selectedStack: SelectedStack): void => {
    if (phase === "ask") {
      setIsHovered(false);
      send({ type: "SELECT_STACK", selectedStack });
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-[calc(var(--card-h)+var(--stack-button-gap)*var(--overlap))]">
      <motion.div
        className="relative rounded-md cursor-pointer   
          w-[var(--card-w)]
          h-[calc(var(--card-h)+6*var(--overlap))]"
        onMouseEnter={() => phase === "ask" && setIsHovered(true)}
        onMouseLeave={() => phase === "ask" && setIsHovered(false)}
        onClick={() => handleStackSelected(stackNumber)}
        style={{
          // subtle bg so the inset shadow has something to catch
          background: "transparent",
          zIndex:
            (phase === "reveal" || phase === "done") && stackNumber === 1
              ? 9000
              : 1,

          boxShadow: isHovered
            ? "0 20px 60px rgba(0,0,0,0.6), inset 0 0 24px rgba(255,255,255,0.35)"
            : "",
          filter: isHovered ? "brightness(1.05)" : "",
        }}
      >
        {children}
      </motion.div>
      <StackButton
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        phase={phase}
        onClickCallback={() => handleStackSelected(stackNumber)}
        stackNumber={stackNumber}
      />
    </div>
  );
}

export default CardStack;
