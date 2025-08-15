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
  selectedStack: SelectedStack; // the stack numer that has been selected by the user
  stackNumber: SelectedStack; // the stack number this card is in
  send: (arg0: CardTrickEvents) => void;
  index: number;
  tableRef: React.RefObject<HTMLDivElement>;
}

function AnimatedCard({
  phase,
  send,
  round,
  index,
  suit,
  rank,
  stackNumber,
  selectedStack,
  tableRef,
}: Props) {
  const [scope, animate] = useAnimate();
  // ----- Layout constants (tune these) -----

  const rowsPerStack = 7;
  const cardWidth = 125; // TODO: this should be grabbed dynamically
  const overlap = 70; // vertical overlap in px, this should change based on media queries
  const cornerX = -320;
  const cornerY = 0;

  // ----- Derived per-card info -----
  const column = stackNumber;
  const row = index; // 0..6

  const finalY = row * overlap; // overlap vertically

  const isLastCardOverall = column === 2 && index === 6;

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
            x: 0,
            y: finalY,
            opacity: 1,
          },
          {
            duration: 0.5,
            delay: index * 0.1, // stagger each card
            ease: "easeOut",
          }
        );

        console.log({ cancelled, isLastCardOverall });

        // only the last card should advance the state
        if (!cancelled && isLastCardOverall) {
          send({ type: "DEAL_DONE" });
        }
      } else if (phase === "gather" && round < 3) {
        // 1) Fold each stack up so all rows end at the top card's Y (0 within the column)
        await animate(
          scope.current,
          { x: 0, y: 0 }, // x stays at column, y collapses to top card
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
          { x: 0, y: 0 },
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
          send({ type: "FINAL_GATHER_DONE" });
        }
      } else if (phase === "reveal") {
        const isChosen = column === 1 && index === 3; // the 11th card in the pile

        // wait a tick to ensure any previous transforms/layout are applied
        await new Promise((r) => requestAnimationFrame(r));

        // 1) Measure table center (page coords)
        const tableRect = tableRef.current?.getBoundingClientRect();
        const tableCenterX = tableRect
          ? tableRect.left + tableRect.width / 2
          : 0;
        const tableCenterY = tableRect
          ? tableRect.top + tableRect.height / 2
          : 0;

        // 2) Measure this card center (page coords)
        const cardRect = scope.current?.getBoundingClientRect();
        const cardCenterX = cardRect ? cardRect.left + cardRect.width / 2 : 0;
        const cardCenterY = cardRect ? cardRect.top + cardRect.height / 2 : 0;

        // 3) Compute the *offset* needed to move the card to the table center
        const offsetX = tableCenterX - cardCenterX;
        const offsetY = tableCenterY - cardCenterY;

        // 4) Read current translate so we can set an *absolute* target
        const { x: curX, y: curY } = getCurrentTranslate(scope.current);

        // 5) Move entire pile to exact center (tiny stagger for flavor)
        await animate(
          scope.current,
          { x: curX + offsetX, y: curY + offsetY },
          { duration: 0.45, delay: index * 0.01, ease: "easeInOut" }
        );

        if (!isChosen) {
          await animate(
            scope.current,
            { opacity: 0.3, y: curY + offsetY + 6, scale: 0.96 },
            { duration: 0.22, ease: "easeOut" }
          );
          return;
        }

        // Chosen card: lift + glow + bounce
        await animate(
          scope.current,
          {
            y: curY + offsetY - 24,
            scale: 1.08,
            filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
          },
          { duration: 0.3, ease: "easeOut" }
        );

        await animate(
          scope.current,
          {
            scale: [1.08, 1.12, 1.02],
            y: [curY + offsetY - 24, curY + offsetY - 30, curY + offsetY - 24],
            filter: [
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
              "drop-shadow(0 0 12px rgba(255,255,255,0.9))",
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
            ],
          },
          { duration: 0.5, ease: "easeOut" }
        );

        send({ type: "REVEAL_DONE" }); // if you want to finish here
      }
    })();

    return () => {
      cancelled = true; // prevents late callbacks after unmount/phase change
    };
  }, [
    phase,
    round,
    index,
    column,
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
    tableRef,
  ]);

  return (
    <motion.div
      ref={scope}
      key={index}
      className="absolute left-1/2 -translate-x-1/2"
      style={
        phase === "gather"
          ? { zIndex: zDuringGather }
          : index === 3 &&
            column === 1 &&
            (phase === "reveal" || phase === "done")
          ? { zIndex: 999 }
          : { zIndex: 0 }
      }
      initial={
        phase === "deal" && round === 1
          ? {
              x: -200, // start off-screen left
              y: finalY,
              opacity: 0,
            }
          : undefined
      }
    >
      <Card suit={suit} rank={rank} />
    </motion.div>
  );
}

function getCurrentTranslate(el: Element | null) {
  if (!el) return { x: 0, y: 0 };
  const t = window.getComputedStyle(el).transform;
  if (!t || t === "none") return { x: 0, y: 0 };
  const m = new DOMMatrixReadOnly(t);
  return { x: m.m41, y: m.m42 }; // translateX, translateY
}

// Helper (co-locate or import)
function getStackOrder(selected: 0 | 1 | 2): [number, number, number] {
  if (selected === 0) return [1, 0, 2];
  if (selected === 1) return [0, 1, 2];
  return [1, 2, 0];
}

export default AnimatedCard;
