import { useEffect } from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";
import woodBackground from "/images/wood-button-background.png";
import type { SelectedStack } from "../types/cardTrickMachine";

function StackButton({
  stackNumber,
  onClickCallback,
  phase,
}: {
  stackNumber: SelectedStack;
  onClickCallback: () => void;
  phase: string;
}) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (phase === "ask") {
      animate(
        scope.current,
        { opacity: 1, y: 0 },
        { duration: 0.35, ease: "easeInOut" }
      );
    } else {
      animate(
        scope.current,
        { opacity: 0, y: -12 },
        { duration: 0.35, ease: "easeInOut" }
      );
    }
  }, [phase, animate, scope]);

  return (
    <AnimatePresence mode="wait">
      <motion.button
        ref={scope}
        initial={{ opacity: 0, y: 12 }}
        onClick={onClickCallback}
        className={`
        max-sm:w-[100px] max-md:w-[125px] w-[175px]
        h-12
        magician-font
        cursor-pointer
        scale-100 hover:scale-110
        transition-transform duration-300
        uppercase 
        font-bold text-[36px] flex items-center 
        justify-center 
        bg-cover bg-center bg-no-repeat
        rounded-sm`}
        style={{
          backgroundImage: `url(${woodBackground})`,
        }}
      >
        <span className="block mr-3">Stack</span>
        <span>{stackNumber + 1}</span>
      </motion.button>
    </AnimatePresence>
  );
}

export default StackButton;
