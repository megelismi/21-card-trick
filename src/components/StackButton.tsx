import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
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
        { opacity: 1, scale: [0, 1.1, 1] },
        {
          duration: 0.8, // Animation duration
        }
      );
    } else {
      animate(
        scope.current,
        { opacity: 0, scale: 0.6 },
        {
          duration: 0.5, // Animation duration
        }
      );
    }
  }, [phase, animate, scope]);

  return (
    <motion.button
      ref={scope}
      initial={{ opacity: 0 }}
      onClick={onClickCallback}
      className={`
        max-sm:w-[100px] max-md:w-[125px] w-[175px]
        h-12
        magician-font
        cursor-pointer
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
  );
}

export default StackButton;
