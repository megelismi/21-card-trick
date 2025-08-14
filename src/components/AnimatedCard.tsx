import Card from "./Card";
import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { Rank, Suit } from "../types/cards";
import type { Phase, Round } from "../types/cardTrickMachine";
import type { SelectedStack, CardTrickEvents } from "../types/cardTrickMachine";

interface Props {
  phase: Phase;
  round: Round;
  suit: Suit;
  rank: Rank;
  selectedStack: SelectedStack;
  send: (arg0: CardTrickEvents) => void;
  index: number;
}

function AnimatedCard({
  phase,
  send,
  round,
  index,
  suit,
  rank,
  selectedStack,
}: Props) {
  const [scope, animate] = useAnimate();
  // ----- Layout constants (tune these) -----
  const columnCount = 3; // this should be a constant
  const rowsPerStack = 7;
  const cardWidth = 125; // TODO: this should be grabbed dynamically
  const overlap = 70; // vertical overlap in px, this should change based on media queries
  const cornerX = -320;
  const cornerY = 0;

  // ----- Derived per-card info -----
  const column = index % columnCount; // 0,1,2
  const row = Math.floor(index / columnCount); // 0..6
  const finalX = column * (cardWidth + 150); // 15px space between columns TODO: this will need to change based on screen size
  const finalY = row * overlap; // overlap vertically
  const isLastCardOverall = index === 20;

  // ----- Gather choreography timing -----
  const [s0, s1, s2] = getStackOrder(selectedStack);
  const orderIndex = [s0, s1, s2].indexOf(column); // 0=first stack to move, 1=middle(selected), 2=last

  // Folding bottom -> top (row 6 first, row 0 last)
  const foldStaggerPerCard = 0.05;
  const foldDuration = 0.25;
  const foldTotal = foldDuration + foldStaggerPerCard * (rowsPerStack - 1); //time from the first card start to the last card finish

  const moveDuration = 0.4;
  const betweenStacksGap = 0.1; // small pause between stacks starting

  const stackStartTime =
    orderIndex * (foldTotal + moveDuration + betweenStacksGap);
  const foldDelayForThisCard =
    stackStartTime + (rowsPerStack - 1 - row) * foldStaggerPerCard;
  const moveStartTime = stackStartTime + foldTotal; // all rows start moving together
  const moveDelayForThisCard = moveStartTime;

  // For z-index layering: later stack on top (arrive later = higher z)
  const zDuringGather = 10 + orderIndex;

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
        if (!cancelled && isLastCardOverall) {
          send({ type: "DEAL_DONE" });
        }
      } else if (phase === "gather" && round < 3) {
        // 1) Fold each stack up so all rows end at the top card's Y (0 within the column)
        await animate(
          scope.current,
          { x: finalX, y: 0 }, // x stays at column, y collapses to top card
          {
            duration: foldDuration,
            delay: foldDelayForThisCard,
            ease: "easeInOut",
          }
        );

        // 2) Move that whole stack to the left corner together (same delay for all rows in stack)
        await animate(
          scope.current,
          { x: cornerX, y: cornerY },
          {
            duration: moveDuration,
            delay: moveDelayForThisCard - (foldDelayForThisCard + foldDuration),
            ease: "easeInOut",
          }
        );

        // Only one card should notify the machine that ALL stacks are done.
        // Choose a single representative: the last stack (orderIndex === 2) and the top card (row === 0)
        if (!cancelled && orderIndex === 2 && row === 0) {
          send({ type: "GATHER_DONE" });
        }
      } else if (phase === "gather" && round === 3) {
        // Similar pattern, but after reaching corner you might slide offscreen or to reveal spot:
        await animate(
          scope.current,
          { x: finalX, y: 0 },
          {
            duration: foldDuration,
            delay: foldDelayForThisCard,
            ease: "easeInOut",
          }
        );
        await animate(
          scope.current,
          { x: cornerX, y: cornerY, opacity: 1 },
          {
            duration: moveDuration,
            delay: moveDelayForThisCard - (foldDelayForThisCard + foldDuration),
            ease: "easeInOut",
          }
        );
        if (!cancelled && orderIndex === 2 && row === 0) {
          console.log("final gather done!!");
          send({ type: "FINAL_GATHER_DONE" });
        }
      } else if (phase === "reveal") {
        // revealAnimation
      }
    })();

    return () => {
      cancelled = true; // prevents late callbacks after unmount/phase change
    };
  }, [
    phase,
    round,
    index,
    finalX,
    finalY,
    animate,
    scope,
    isLastCardOverall,
    foldDelayForThisCard,
    moveDelayForThisCard,
    orderIndex,
    row,
    send,
    cornerX,
    cornerY,
    foldDuration,
    moveDuration,
  ]);

  return (
    <motion.div
      ref={scope}
      key={index}
      className="absolute"
      style={phase === "gather" ? { zIndex: zDuringGather } : undefined}
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

// Helper (co-locate or import)
function getStackOrder(selected: 0 | 1 | 2): [number, number, number] {
  if (selected === 0) return [1, 0, 2];
  if (selected === 1) return [0, 1, 2];
  return [1, 2, 0];
}

export default AnimatedCard;
