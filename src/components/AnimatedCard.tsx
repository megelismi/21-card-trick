import Card from "./Card";
import useCssVarPx from "../hooks/useCssVarPx";
import { Anim } from "../config/animation";
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
  column: SelectedStack; // 0..2, column this card is in
  cardIndex: number; // 0...20, where this card fall in the stack of 21
  send: (arg0: CardTrickEvents) => void;
  row: number; // 0...6
  tableRef: React.RefObject<HTMLDivElement>;
}

function AnimatedCard({
  phase,
  send,
  round,
  row,
  suit,
  rank,
  column,
  cardIndex,
  selectedStack,
  tableRef,
}: Props) {
  const [scope, animate] = useAnimate();

  // ----- Layout constants s-----
  const overlap = useCssVarPx("--overlap", 70);

  // ----- Derived per-card info -----
  const isLastCardOverall = column === 2 && row === 6; // the 21st card on the screen
  /* during the reveal/done phase, the user's chosen card will be the 11th card in the pile
   * located in column 1 at row 3 */
  const isTheChosenCard =
    (phase === "reveal" || phase === "done") && column === 1 && row === 3;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (phase === "deal") {
        // wait a tick so layout/positions are correct
        await new Promise((r) => requestAnimationFrame(r));

        // 1) read current translate (whatever it is)
        const { x: curX, y: curY } = getCurrentTranslate(scope.current);

        // 2) compute how far to move this card to the viewport TL corner
        const { dx, dy } = getViewportDelta(
          scope.current,
          Anim.cornerPadding,
          Anim.cornerPadding
        );

        // TODO: this may not be necessary for dealing past round 1
        // 3) SNAP to the corner (no animation / no flash)
        await animate(
          scope.current,
          { x: curX + dx, y: curY + dy },
          { duration: 0 }
        );

        // 4) Now animate the "deal" from the corner to its column/row
        await animate(
          scope.current,
          { x: 0, y: row * overlap }, // vertical overlap
          {
            duration: Anim.deal.duration,
            delay: cardIndex * Anim.deal.perCardDelay, // stagger each card
            ease: Anim.deal.ease,
          }
        );

        if (!cancelled && isLastCardOverall) {
          send({ type: "DEAL_DONE" });
        }
      } else if (phase === "gather") {
        // ----- Gather choreography timing -----
        const [s0, s1, s2] = getStackOrder(selectedStack);
        const orderIndex = [s0, s1, s2].indexOf(column); // 0,1,2

        const stackStartTime = Anim.util.stackStartTime(orderIndex); // absolute start for this stack
        const foldDelayForThisCard = Anim.util.foldDelayForThisCard({
          stackStartTime,
          row, // still stagger fold bottom->top
        });
        const moveStartTime = stackStartTime + Anim.util.foldTotal(); // << SAME for all rows in this stack

        // Precompute corner delta once (any time before the sequence runs)
        await new Promise((r) => requestAnimationFrame(r));

        const { x: curX, y: curY } = getCurrentTranslate(scope.current);
        const { dx, dy } = getViewportDelta(
          scope.current,
          Anim.cornerPadding,
          Anim.cornerPadding
        );

        // Sequence: fold (staggered by row), then move (ONE start time for entire stack)
        await animate([
          [
            scope.current,
            { x: 0, y: 0 },
            {
              duration: Anim.fold.duration,
              delay: foldDelayForThisCard,
              ease: Anim.fold.ease,
            },
          ],
          [
            scope.current,
            { x: curX + dx, y: curY + dy },
            {
              duration: Anim.move.duration,
              ease: Anim.move.ease,
              at: moveStartTime,
            },
          ],
        ]);

        // Notify machine once when the last stack’s top card finishes
        if (orderIndex === 2 && row === 0) {
          send({ type: round === 3 ? "FINAL_GATHER_DONE" : "GATHER_DONE" });
        }
      } else if (phase === "reveal") {
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
          {
            duration: Anim.reveal.pileToCenter.duration,
            delay: row * Anim.reveal.pileToCenter.staggerPerCard,
            ease: Anim.reveal.pileToCenter.ease,
          }
        );

        if (!isTheChosenCard) {
          await animate(
            scope.current,
            {
              opacity: Anim.reveal.dimOthers.opacity,
              y: curY + offsetY + Anim.reveal.dimOthers.yBump,
              scale: Anim.reveal.dimOthers.scale,
            },
            {
              duration: Anim.reveal.dimOthers.duration,
              ease: Anim.reveal.dimOthers.ease,
            }
          );
          return;
        }

        // Chosen card: lift + glow + bounce
        await animate(
          scope.current,
          {
            y: curY + offsetY - Anim.reveal.lift.lift,
            scale: Anim.reveal.lift.scale,
            filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
          },
          { duration: Anim.reveal.lift.duration, ease: Anim.reveal.lift.ease }
        );

        await animate(
          scope.current,
          {
            scale: Anim.reveal.bounce.scaleKey,
            y: [
              curY + offsetY - Anim.reveal.lift.lift,
              curY + offsetY - Anim.reveal.lift.lift + Anim.reveal.bounce.yKey,
              curY + offsetY - Anim.reveal.lift.lift,
            ],
            filter: [
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
              "drop-shadow(0 0 12px rgba(255,255,255,0.9))",
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
            ],
          },
          {
            duration: Anim.reveal.bounce.duration,
            ease: Anim.reveal.bounce.ease,
          }
        );

        send({ type: "REVEAL_DONE" });
      }
    })();

    return () => {
      cancelled = true; // prevents late callbacks after unmount/phase change
    };
  }, [
    phase,
    round,
    row,
    overlap,
    cardIndex,
    column,
    animate,
    scope,
    selectedStack,
    isLastCardOverall,
    send,
    tableRef,
    isTheChosenCard,
  ]);

  return (
    <motion.div
      ref={scope}
      key={cardIndex}
      className="absolute left-1/2 -translate-x-1/2"
      style={isTheChosenCard ? { zIndex: Anim.z.chosenCard } : undefined}
      initial={false}
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

// measure → diff → animate to viewport corner
function getViewportDelta(el: Element, targetLeft = 24, targetTop = 24) {
  const rect = (el as HTMLElement).getBoundingClientRect();
  return { dx: targetLeft - rect.left, dy: targetTop - rect.top };
}

export default AnimatedCard;
