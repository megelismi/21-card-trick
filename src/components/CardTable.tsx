import { motion } from "motion/react";
import generateRandomUniqueCards from "../utils/generateRandomCards";
import Card from "./Card";
import type { Rank, Suit } from "../types/cards";

interface Props {
  phase: string; // state.value from machine
  onCardClick?: (colIndex: number) => void;
}

const CardTable: React.FC<Props> = ({ phase, onCardClick }) => {
  // get 21 random unique cards
  // TODO: this needs to be memoized or handled in a way that doesn't regenerate cards on every render
  // but for now we just generate them fresh each time
  const cards = generateRandomUniqueCards() as { suit: Suit; rank: Rank }[];
  const firstCol = cards.slice(0, 7);
  const secondCol = cards.slice(7, 14);
  const thirdCol = cards.slice(14, 21);

  return (
    <div className="flex flex-col gap-8 justify-center mt-16 relative w-4/5 min-w-[350px]">
      {cards.map((card, index) => {
        return (
          <div
            style={{
              position: "absolute",
              top: `${Math.floor(index / 3) * 75}px`,
              left: `${((index % 3) + 1) * 270}px`,
            }}
          >
            <Card suit={card.suit} rank={card.rank} />
          </div>
        );
      })}
    </div>
  );
};

export default CardTable;

//  const animate = phase.startsWith("dealRound")
//           ? { y: [-40, 0], opacity: [0, 1], scale: [0.96, 1] }
//           : phase.startsWith("gatherRound")
//           ? { y: [0, -12, 0], rotate: [0, 5, 0] }
//           : {};

//   const cardVariants = {
//     hidden: { x: -100, opacity: 0 },
//     visible: (i: number) => ({
//       x: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//         type: "spring",
//         stiffness: 100,
//       },
//     }),
//   };
