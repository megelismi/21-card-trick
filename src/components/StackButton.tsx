import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import woodBackground from "/images/wood-button-background.png";
import type { SelectedStack } from "../types/cardTrickMachine";

interface Props {
  stackNumber: SelectedStack;
  onClickCallback: () => void;
  phase: string;
  isHovered: boolean;
  setIsHovered: (arg0: boolean) => void;
}

function StackButton({
  stackNumber,
  onClickCallback,
  phase,
  isHovered,
  setIsHovered,
}: Props) {
  const [scope, animate] = useAnimate();
  const isVisible = phase === "ask";

  useEffect(() => {
    if (isVisible) {
      // entrance
      animate(
        scope.current,
        { opacity: 1, scale: [0.5, 1.1, 1] },
        { duration: 0.2 }
      );
    } else {
      // exit
      animate(scope.current, { opacity: 0, scale: 0.6 }, { duration: 0.1 });
    }
  }, [isVisible, animate, scope, stackNumber]);

  return (
    <motion.button
      ref={scope}
      initial={{
        opacity: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickCallback}
      className={`
        card-width
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
        boxShadow: isHovered
          ? "0 12px 28px rgba(0,0,0,0.45), inset 0 0 14px rgba(255,255,255,0.18)"
          : "",
        filter: isHovered ? "brightness(1.05)" : "",
      }}
    >
      <span className="block mr-3">Stack</span>
      <span>{stackNumber + 1}</span>
    </motion.button>
  );
}

export default StackButton;
