import Card from "./Card";
import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { Rank, Suit } from "../types/cards";

function AnimatedCard({
  phase,
  index,
  suit,
  rank,
}: {
  phase: string;
  index: number;
  suit: Suit;
  rank: Rank;
}) {
  const [scope, animate] = useAnimate();
  // Column layout data
  const columnCount = 3; // this should be a constant
  const cardWidth = 125; // TODO: this should be grabbed dynamically
  const overlap = 70; // vertical overlap in px, this should change based on media queries

  // TODO: what to do this with because this is specific to dealCards transition...I think...
  const column = index % columnCount; // 0,1,2
  const row = Math.floor(index / columnCount); // 0..6
  const finalX = column * (cardWidth + 150); // 15px space between columns TODO: this will need to change based on screen size
  const finalY = row * overlap; // overlap vertically

  useEffect(() => {
    if (phase === "dealRound1") {
      animate(
        scope.current,
        {
          x: finalX,
          y: finalY,
          opacity: 1,
        },
        {
          duration: 0.5,
          delay: index * 0.1, // stagger each card
          ease: "easeOut",
        }
      );
    }
  }, [phase, index, finalX, finalY, animate, scope]);

  return (
    <motion.div
      ref={scope}
      key={index}
      className="absolute"
      initial={
        phase === "dealRound1"
          ? {
              x: -200, // start off-screen left
              y: finalY,
              opacity: 0,
            }
          : {}
      }
    >
      <Card suit={suit} rank={rank} />
    </motion.div>
  );
}

export default AnimatedCard;
