import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import AnimatedCard from "./AnimatedCard";
import CardStackButton from "./CardStackButton";
import { Anim } from "../../config/animation";
import { CARDS_PER_ROW } from "../../constants/cards";
import type { Cards } from "../../types/cards";
import type {
  CardTrickEvents,
  Phase,
  Round,
} from "../../types/cardTrickMachine";
import type { SelectedStack } from "../../types/cardTrickMachine";

interface Props {
  phase: Phase;
  cards: Cards;
  round: Round;
  stackNumber: SelectedStack;
  selectedStack: SelectedStack;
  send: (arg0: CardTrickEvents) => void;
  tableRef: React.RefObject<HTMLDivElement>;
}

function CardStack({
  phase,
  cards,
  round,
  stackNumber,
  selectedStack,
  send,
  tableRef,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  // TODO: add a note
  const [zPhase, setZPhase] = useState<"idle" | "moving" | "parked">("idle");

  useEffect(() => {
    if (phase !== "ask" && isHovered) {
      setIsHovered(false);
    }
  }, [phase, isHovered]);

  // memoized functions that top card will call after each stack has moved
  // to the corner of the screen during the "gather" phase
  // this allows the zIndex of the stack to be larger when moving so that
  // it doesn't go behind stacks that have been gathered yet
  // but smaller once it has "parked" in the corner, so that subsequent
  // stacks can be placed on top of it
  const onMoveStart = useCallback(() => setZPhase("moving"), []);
  const onMoveEnd = useCallback(() => setZPhase("parked"), []);

  const order = Anim.util.getStackOrder(selectedStack);
  const orderIndex = order.indexOf(stackNumber); // 0,1,2

  // Very small z policy:
  // - moving: huge so it passes in front of others during transit
  // - parked: ordered layer so later stacks land on top
  // - idle (folding / not moving yet): medium
  const zForGather =
    zPhase === "moving"
      ? Anim.z.gatherStackMoved
      : zPhase === "parked"
      ? Anim.z.gatherStackParked + orderIndex
      : Anim.z.gatherBase;

  const handleStackSelected = (selectedStack: SelectedStack): void => {
    if (phase === "ask") {
      setIsHovered(false);
      send({ type: "SELECT_STACK", selectedStack });
    }
  };

  return (
    <div
      className={`flex flex-col ${
        stackNumber === 0
          ? "items-start"
          : stackNumber === 1
          ? "items-center"
          : "items-end"
      } justify-between ${
        phase === "reveal" || phase === "done"
          ? "h-full"
          : "h-[calc(var(--card-h)+var(--stack-button-gap)*var(--overlap))]"
      }`}
    >
      <motion.div
        className={`stack relative rounded-md cursor-pointer 
        w-[var(--card-w)]
         ${
           phase === "reveal" || phase === "done"
             ? "h-full"
             : "h-[calc(var(--card-h)+6*var(--overlap))]"
         }`}
        onMouseEnter={() => phase === "ask" && setIsHovered(true)}
        onMouseLeave={() => phase === "ask" && setIsHovered(false)}
        onClick={() => handleStackSelected(stackNumber)}
        style={{
          // subtle bg so the inset shadow has something to catch
          background: "transparent",
          zIndex:
            (phase === "reveal" || phase === "done") && stackNumber === 1
              ? Anim.z.overlayTop
              : phase === "gather"
              ? zForGather
              : 1,
          boxShadow: isHovered
            ? "0 0 10px 4px rgba(233, 208, 98, 0.3), 0 0 24px 12px rgba(245, 245, 245, 0.4)"
            : "",
        }}
      >
        {cards.map((card, row) => {
          // the index of this card in the stack of 21
          const cardIndex = row * CARDS_PER_ROW + stackNumber;

          return (
            <AnimatedCard
              key={cardIndex}
              cardIndex={cardIndex} // 0...21
              column={stackNumber} // 0...2
              row={row} // 0...6
              selectedStack={selectedStack} // the current stack the user selected
              rank={card.rank}
              suit={card.suit}
              phase={phase}
              round={round}
              send={send}
              tableRef={tableRef}
              onMoveStart={onMoveStart}
              onMoveEnd={onMoveEnd}
            />
          );
        })}
      </motion.div>
      <CardStackButton
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        phase={phase}
        onClickCallback={() => handleStackSelected(stackNumber)}
        stackNumber={stackNumber}
      />
    </div>
  );
}

export default CardStack;
