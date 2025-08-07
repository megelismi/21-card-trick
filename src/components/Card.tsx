import { useState } from "react";
import "../Animations.css";
import "../Cards.css";

export default function Card({ children }: { children: React.ReactNode }) {
  const [isDealing, setIsDealing] = useState(true);

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
        className={`card ${isDealing ? "dealing" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
