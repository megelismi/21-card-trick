import { memo, useEffect, useMemo, useState } from "react";
import { motion, useAnimate } from "motion/react";
import Card from "./Card";
import ConfettiBurst from "../ConfettiBurst";
import useCssVarPx from "../../hooks/useCssVarPx";
import { Anim } from "../../config/animation";
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
  selectedStack: SelectedStack; // 0..2, the stack user selected
  column: SelectedStack; // 0..2, column this card is in
  cardIndex: number; // 0..20, index in the 21-card deck
  row: number; // 0..6
  send: (evt: CardTrickEvents) => void;
  tableRef: React.RefObject<HTMLDivElement>;
  onMoveStart: () => void;
  onMoveEnd: () => void;
}

/** One raf tick as a promise */
const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

function AnimatedCard({
  phase,
  round,
  row,
  suit,
  rank,
  column,
  cardIndex,
  selectedStack,
  tableRef,
  send,
  onMoveStart,
  onMoveEnd,
}: Props) {
  const [scope, animate] = useAnimate();
  const [showConfetti, setShowConfetti] = useState(false);

  // Derived booleans
  const isLastCardOverall = column === 2 && row === 6;
  const isTheChosenCard = useMemo(
    () => (phase === "reveal" || phase === "done") && column === 1 && row === 3,
    [phase, column, row]
  );

  const overlap = useCssVarPx("--overlap", 70);

  /** DEAL */
  useEffect(() => {
    if (phase !== "deal") return;
    let cancelled = false;

    (async () => {
      /** Compute current translate + viewport delta + origin offset */
      const targets = Anim.util.getSnapTargets({
        el: scope.current,
        tableEl: tableRef.current,
      });
      if (!targets) return;
      const { curX, curY, dx, dy, ox } = targets;

      // Snap to (viewport TL + offscreen push)
      await animate(
        scope.current,
        { x: curX + dx + ox, y: curY + dy },
        { duration: 0 }
      );

      // Drop down the column
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
    })();

    return () => {
      cancelled = true;
    };
  }, [
    phase,
    row,
    overlap,
    cardIndex,
    isLastCardOverall,
    send,
    animate,
    scope,
    tableRef,
  ]);

  /** GATHER */
  useEffect(() => {
    if (phase !== "gather") return;

    let cancelled = false;

    (async () => {
      // compute ordering and timings
      const [s0, s1, s2] = Anim.util.getStackOrder(selectedStack);
      const orderIndex = [s0, s1, s2].indexOf(column);
      const stackStartTime = Anim.util.stackStartTime(orderIndex);
      const foldDelayForThisCard = Anim.util.foldDelayForThisCard({
        stackStartTime,
        row,
      });
      const moveStartTime = stackStartTime + Anim.util.foldTotal();

      await frame();

      const targets = Anim.util.getSnapTargets({
        el: scope.current,
        tableEl: tableRef.current,
      });
      if (!targets) return;
      const { curX, curY, dx, dy, ox } = targets;

      if (row === 0) onMoveStart();

      await animate([
        // Fold up to the top of the column
        [
          scope.current,
          { x: 0, y: 0 },
          {
            duration: Anim.fold.duration,
            delay: foldDelayForThisCard,
            ease: Anim.fold.ease,
          },
        ],
        // Then move off to the origin (viewport TL + ox)
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

      if (!cancelled && row === 0) onMoveEnd();
      if (!cancelled && orderIndex === 2 && row === 0) {
        send({ type: round === 3 ? "FINAL_GATHER_DONE" : "GATHER_DONE" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    phase,
    selectedStack,
    column,
    row,
    round,
    send,
    onMoveEnd,
    onMoveStart,
    animate,
    scope,
    tableRef,
  ]);

  /** REVEAL */
  useEffect(() => {
    if (phase !== "reveal") return;

    let cancelled = false;

    (async () => {
      await frame();

      const el = scope.current;
      const tableEl = tableRef.current;
      if (!el || !tableEl) return;

      const tableRect = tableEl.getBoundingClientRect();
      const tableCenterX = tableRect.left + tableRect.width / 2;
      const tableCenterY = tableRect.top + tableRect.height / 2;

      const cardRect = el.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const offsetX = tableCenterX - cardCenterX;
      const offsetY = tableCenterY - cardCenterY;

      const { x: curX, y: curY } = Anim.util.getCurrentTranslate(el);

      // Move each card to center (staggered by its row)
      await animate(
        el,
        { x: curX + offsetX, y: curY + offsetY },
        {
          duration: Anim.reveal.pileToCenter.duration,
          delay: row * Anim.reveal.pileToCenter.staggerPerCard,
          ease: Anim.reveal.pileToCenter.ease,
        }
      );

      if (!isTheChosenCard) {
        await animate(
          el,
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

      // Lift + glow + bounce for the chosen card
      await animate(
        el,
        {
          y: curY + offsetY - Anim.reveal.lift.lift,
          scale: Anim.reveal.lift.scale,
          filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
        },
        { duration: Anim.reveal.lift.duration, ease: Anim.reveal.lift.ease }
      );

      await animate(
        el,
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
        { duration: Anim.reveal.bounce.duration, ease: Anim.reveal.bounce.ease }
      );

      if (!cancelled) {
        setShowConfetti(true);
        send({ type: "REVEAL_DONE" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phase, row, isTheChosenCard, animate, scope, tableRef, send]);

  return (
    <motion.div
      ref={scope}
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        ...(isTheChosenCard ? { zIndex: Anim.z.chosenCard } : null),
        willChange:
          phase === "reveal" ? "transform, opacity, filter" : undefined,
      }}
      initial={false}
      data-card-index={cardIndex}
      data-col={column}
      data-row={row}
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

export default memo(AnimatedCard);
