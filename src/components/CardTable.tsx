import { motion } from "motion/react";
import generateRandomUniqueCards from "../utils/generateRandomCards";
import Card from "./Card";
import "../Cards.css";
import type { Rank, Suit } from "../types/cards";

interface Props {
  phase: string; // state.value from machine
  onCardClick?: (colIndex: number) => void;
}

const CardTable: React.FC<Props> = ({ phase, onCardClick }) => {
  const cards = generateRandomUniqueCards() as { suit: Suit; rank: Rank }[];

  console.log("phase", phase);
  console.log("onCardClick", onCardClick);

  // Column layout data
  const columnCount = 3;
  const cardWidth = 125;
  const overlap = 70; // vertical overlap in px

  return (
    <div className="w-full flex justify-center bg-green-700 p-2">
      <div
        className="grid grid-cols-3 gap-4 mt-4"
        style={{
          maxWidth: "727px",
          width: "100%",
        }}
      >
        {cards.map((card, index) => {
          const column = index % columnCount; // 0,1,2
          const row = Math.floor(index / columnCount); // 0..6
          const finalX = column * (cardWidth + 150); // 15px space between columns TODO: this will need to change based on screen size
          const finalY = row * overlap; // overlap vertically

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                x: -200, // start off-screen left
                y: finalY,
                opacity: 0,
              }}
              animate={{
                x: finalX,
                y: finalY,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1, // stagger each card
                ease: "easeOut",
              }}
            >
              <Card suit={card.suit} rank={card.rank} />
            </motion.div>
          );
        })}
      </div>
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

{
  /* <div
      ref={cardTableRef}
      className="flex flex-col justify-center relative mt-6 w-[1000px] max-sm:w-[450px] max-md:w-[600px] max:lg:w-[800px] border border-b-blue-600"
    >
      {cards.map((card, index) => {
        const columnNumber = (index % 3) + 1;

        let style: React.CSSProperties = {
          position: "absolute" as const,
          top: `${Math.floor(index / 3) * 75}px`,
        };

        if (columnNumber === 1) {
          style = { ...style, left: "24px" };
        } else if (columnNumber === 2) {
          style = { ...style, left: "40%" };
        } else {
          style = { ...style, right: "24px" };
        }

        return (
          <div style={style}>
            <Card suit={card.suit} rank={card.rank} />
          </div>
        );
      })}
    </div> */
}
