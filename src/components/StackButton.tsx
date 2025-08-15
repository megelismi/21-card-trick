import { motion, AnimatePresence } from "motion/react";
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
  return (
    <AnimatePresence mode="wait">
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
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
          opacity: phase === "ask" ? 1 : 0,
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
