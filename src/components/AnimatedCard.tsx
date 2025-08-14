import Card from "./Card";
import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { Rank, Suit } from "../types/cards";
import type { Phase, Round } from "../types/cardTrickMachine";
import type { CardTrickEvents } from "../types/cardTrickMachine";

interface Props {
  phase: Phase;
  round: Round;
  suit: Suit;
  rank: Rank;
  send: (arg0: CardTrickEvents) => void;
  index: number;
}

function AnimatedCard({ phase, send, round, index, suit, rank }: Props) {
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

  // this is the last card in the stack
  // used to notify our state machine that our animation is done
  const isLastCard = index === 20;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (phase === "deal") {
        await animate(
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

        // only the last card should advance the state
        if (!cancelled && isLastCard) {
          send({ type: "DEAL_DONE" });
        }
      } else if (phase === "gather" && round === 3) {
        // this is the final gather things go off screen
      } else if (phase === "gather") {
        // gather the cards up
      } else if (phase === "reveal") {
        // revealAnimation
      }
    })();

    return () => {
      cancelled = true; // prevents late callbacks after unmount/phase change
    };
  }, [phase, round, finalX, finalY, animate, scope, index]);

  return (
    <motion.div
      ref={scope}
      key={index}
      className="absolute"
      initial={
        phase === "deal" && round === 1
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
