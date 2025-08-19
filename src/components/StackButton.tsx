import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import woodBackground from "/images/wood-button-background.png";
import type { SelectedStack } from "../types/cardTrickMachine";

const lift = {
  rest: {
    boxShadow: "0 2px 8px rgba(0,0,0,0.25), inset 0 0 0 rgba(255,255,255,0)",
    filter: "brightness(1)",
  },
  hover: {
    boxShadow:
      "0 12px 28px rgba(0,0,0,0.45), inset 0 0 14px rgba(255,255,255,0.18)",
    filter: "brightness(1.05)",
  },
};

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
        { opacity: 1, scale: [0.5, 1.1, 1] },
        {
          duration: 0.5, // Animation duration
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
      variants={lift}
      initial={{ opacity: 0 }}
      whileHover="hover"
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
