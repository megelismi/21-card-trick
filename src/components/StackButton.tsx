import { motion, AnimatePresence } from "motion/react";
import woodBackground from "/images/wood-button-background.png";

function StackButton({
  stackNumber,
  onClickCallback,
}: {
  stackNumber: 1 | 2 | 3;
  onClickCallback: () => void;
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
        style={{ backgroundImage: `url(${woodBackground})` }}
      >
        <span className="block mr-3">Stack</span>
        <span>{stackNumber}</span>
      </motion.button>
    </AnimatePresence>
  );
}

export default StackButton;
