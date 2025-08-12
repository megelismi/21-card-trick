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

  // TODO: put these phases into constants
  const isDealingCards =
    phase === "dealCards1" || phase === "dealCards2" || phase === "dealCards3";
  const isGatheringRound = phase === "gatherCards1" || phase === "gatherCards2";
  const isFinalGather = phase === "gatherCards3";
  const isReveal = phase === "reveal";

  useEffect(() => {
    if (isDealingCards) {
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
    } else if (isGatheringRound) {
      // gather the cards up
      //   animate(
      //     scope.current,
      //     {
      //       x: finalX,
      //       y: finalY,
      //       opacity: 1,
      //     },
      //     {
      //       duration: 0.5,
      //       delay: index * 0.1, // stagger each card
      //       ease: "easeOut",
      //     }
      //   );
    } else if (isFinalGather) {
      // this is the final gather things go off screen
    } else if (isReveal) {
      // revealAnimation
    }
  }, [
    isDealingCards,
    isGatheringRound,
    isFinalGather,
    isReveal,
    finalX,
    finalY,
    animate,
    scope,
    index,
  ]);

  return (
    <motion.div
      ref={scope}
      key={index}
      className="absolute"
      initial={
        phase === "dealCards1"
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
