import { useState } from "react";
import { useCardContext } from "../context/CardContext";
import "../Animations.css";
import "../Cards.css";

export default function Card({
  children,
  stack,
  positionInStack,
}: {
  children: React.ReactNode;
  stack: number;
  positionInStack: number;
}) {
  const [isDealing, setIsDealing] = useState(true);
  const { isCollecting, selectedStack } = useCardContext();

  const isLastCardInStack = positionInStack === 7;
  const isCollapsing = isCollecting && selectedStack === stack;

  console.log(`Card stack: ${stack}`);
  console.log(`Card position in stack: ${positionInStack}`);
  console.log(`Card is the last in the stack: ${isLastCardInStack}`);

  const handleAnimationEnd = (
    animationEvent: React.AnimationEvent<HTMLDivElement>
  ) => {
    if (animationEvent.animationName === "dealCard") {
      setIsDealing(false);
    }
  };

  return (
    <>
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`card ${
          isDealing ? "dealing" : isCollapsing ? "collapsing" : ""
        }`}
        style={{
          animationDelay: `${isCollapsing} ? ${positionInStack * 0.2}s : ''}`,
        }}
      >
        {children}
      </div>
    </>
  );
}
