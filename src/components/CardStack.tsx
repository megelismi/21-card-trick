import { useState } from "react";
import { motion } from "motion/react";
import AnimatedCard from "./AnimatedCard";
import StackButton from "./StackButton";
import { CARDS_PER_ROW } from "../constants/cards";
import type { Cards } from "../types/cards";
import type { CardTrickEvents, Phase, Round } from "../types/cardTrickMachine";
import type { SelectedStack } from "../types/cardTrickMachine";

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

  const handleStackSelected = (selectedStack: SelectedStack): void => {
    if (phase === "ask") {
      setIsHovered(false);
      send({ type: "SELECT_STACK", selectedStack });
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-[calc(var(--card-h)+var(--stack-button-gap)*var(--overlap))]">
      <motion.div
        className="relative rounded-md cursor-pointer   
          w-[var(--card-w)]
          h-[calc(var(--card-h)+6*var(--overlap))]"
        onMouseEnter={() => phase === "ask" && setIsHovered(true)}
        onMouseLeave={() => phase === "ask" && setIsHovered(false)}
        onClick={() => handleStackSelected(stackNumber)}
        style={{
          // subtle bg so the inset shadow has something to catch
          background: "transparent",
          zIndex:
            (phase === "reveal" || phase === "done") && stackNumber === 1
              ? 9000
              : 1,

          boxShadow: isHovered
            ? "0 20px 60px rgba(0,0,0,0.6), inset 0 0 24px rgba(255,255,255,0.35)"
            : "",
          filter: isHovered ? "brightness(1.05)" : "",
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
            />
          );
        })}
      </motion.div>
      <StackButton
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
