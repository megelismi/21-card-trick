import CardStack from "./CardStack";
import { useRef } from "react";
import type { Cards } from "../../types/cards";
import type { Phase, Round } from "../../types/cardTrickMachine";
import type {
  CardTrickEvents,
  SelectedStack,
} from "../../types/cardTrickMachine";

export interface Props {
  phase: Phase; // Current phase from the machine
  cards: Cards;
  round: Round;
  selectedStack: SelectedStack;
  send: (arg0: CardTrickEvents) => void;
}

function getCardStacks(cards: Cards) {
  return {
    0: [
      cards[0],
      cards[3],
      cards[6],
      cards[9],
      cards[12],
      cards[15],
      cards[18],
    ],
    1: [
      cards[1],
      cards[4],
      cards[7],
      cards[10],
      cards[13],
      cards[16],
      cards[19],
    ],
    2: [
      cards[2],
      cards[5],
      cards[8],
      cards[11],
      cards[14],
      cards[17],
      cards[20],
    ],
  };
}

const CardTable = ({ cards, phase, round, send, selectedStack }: Props) => {
  const tableRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  if (cards.length !== 21 || phase === "intro") {
    // don't render this component if our 21 cards have not been populated
    return null;
  }

  const cardStacks = getCardStacks(cards);

  return (
    <div className="w-[var(--dialogue-box-small-w)]">
      <div ref={tableRef} className="grid grid-cols-3">
        {[0, 1, 2].map((stackNumber) => {
          const stackNum = stackNumber as SelectedStack;
          const cardsInCurrentStack = cardStacks[stackNum];

          return (
            <CardStack
              key={`stack-${stackNum}`}
              phase={phase}
              round={round}
              send={send}
              stackNumber={stackNum}
              selectedStack={selectedStack}
              tableRef={tableRef}
              cards={cardsInCurrentStack}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardTable;
