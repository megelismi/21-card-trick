import Card from "./Card";
import ConfettiBurst from "../ConfettiBurst";
import useCssVarPx from "../../hooks/useCssVarPx";
import { Anim } from "../../config/animation";
import { useEffect, useState } from "react";
import { motion, useAnimate } from "motion/react";
import type { Rank, Suit } from "../../types/cards";
import type { Phase, Round } from "../../types/cardTrickMachine";
import type {
  SelectedStack,
  CardTrickEvents,
} from "../../types/cardTrickMachine";

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
  onMoveStart: () => void;
  onMoveEnd: () => void;
}

function AnimatedCard(props: Props) {
  const {
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
    onMoveStart,
    onMoveEnd,
  } = props;

  const [scope, animate] = useAnimate();
  const [showConfetti, setShowConfetti] = useState(false);

  const overlap = useCssVarPx("--overlap", 70);

  const isLastCardOverall = column === 2 && row === 6;
  const isTheChosenCard =
    (phase === "reveal" || phase === "done") && column === 1 && row === 3;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (phase === "deal") {
        const { x: curX, y: curY } = Anim.util.getCurrentTranslate(
          scope.current
        );

        // Your original base: delta to viewport top-left
        const { dx, dy } = Anim.util.getViewportDelta(scope.current);

        // Extra X only when there isn't room; otherwise 0 (exact TL of the screen)
        const ox = Anim.util.computeOriginOffsetX(
          scope.current,
          tableRef.current,
          {
            offscreenGutter: Anim.offScreenGutter,
            minGutterOnscreen: 0, // keep 0 to match original behavior
          }
        );

        // SNAP to (viewport TL + optional offscreen push)
        await animate(
          scope.current,
          { x: curX + dx + ox, y: curY + dy },
          { duration: 0 }
        );

        // Then your normal down-the-column deal
        await animate(
          scope.current,
          { x: 0, y: row * overlap },
          {
            duration: Anim.deal.duration,
            delay: cardIndex * Anim.deal.perCardDelay,
            ease: Anim.deal.ease,
          }
        );

        if (!cancelled && isLastCardOverall) send({ type: "DEAL_DONE" });
      } else if (phase === "gather") {
        const [s0, s1, s2] = Anim.util.getStackOrder(selectedStack);
        const orderIndex = [s0, s1, s2].indexOf(column);

        const stackStartTime = Anim.util.stackStartTime(orderIndex);
        const foldDelayForThisCard = Anim.util.foldDelayForThisCard({
          stackStartTime,
          row,
        });
        const moveStartTime = stackStartTime + Anim.util.foldTotal();

        await new Promise((r) => requestAnimationFrame(r));

        const { x: curX, y: curY } = Anim.util.getCurrentTranslate(
          scope.current
        );
        const { dx, dy } = Anim.util.getViewportDelta(scope.current);
        const ox = Anim.util.computeOriginOffsetX(
          scope.current,
          tableRef.current,
          {
            offscreenGutter: Anim.offScreenGutter,
            minGutterOnscreen: 0,
          }
        );

        if (row === 0) onMoveStart?.();

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
            { x: curX + dx + ox, y: curY + dy },
            {
              duration: Anim.move.duration,
              ease: Anim.move.ease,
              at: moveStartTime,
            },
          ],
        ]);

        if (row === 0) onMoveEnd?.();
        if (orderIndex === 2 && row === 0) {
          send({ type: round === 3 ? "FINAL_GATHER_DONE" : "GATHER_DONE" });
        }
      } else if (phase === "reveal") {
        // unchanged…
        await new Promise((r) => requestAnimationFrame(r));
        const tableRect = tableRef.current?.getBoundingClientRect();
        const tableCenterX = tableRect
          ? tableRect.left + tableRect.width / 2
          : 0;
        const tableTargetY = tableRect
          ? tableRect.top + tableRect.height / 2
          : 0;

        const cardRect = scope.current?.getBoundingClientRect();
        const cardCenterX = cardRect ? cardRect.left + cardRect.width / 2 : 0;
        const cardCenterY = cardRect ? cardRect.top + cardRect.height / 2 : 0;

        const offsetX = tableCenterX - cardCenterX;
        const offsetY = tableTargetY - cardCenterY;

        const { x: curX, y: curY } = Anim.util.getCurrentTranslate(
          scope.current
        );

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

        setShowConfetti(true);
        send({ type: "REVEAL_DONE" });
      }
    })();

    return () => {
      cancelled = true;
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
    onMoveEnd,
    onMoveStart,
  ]);

  return (
    <motion.div
      ref={scope}
      key={cardIndex}
      className="absolute left-1/2 -translate-x-1/2"
      style={isTheChosenCard ? { zIndex: Anim.z.chosenCard } : undefined}
      initial={false}
    >
      <div className="relative w-[var(--card-w)] h-[var(--card-h)]">
        <Card suit={suit} rank={rank} />
        {isTheChosenCard && showConfetti && (
          <ConfettiBurst onDone={() => setShowConfetti(false)} />
        )}
      </div>
    </motion.div>
  );
}

export default AnimatedCard;
