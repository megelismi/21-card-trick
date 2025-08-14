// import { motion } from "motion/react";
import AnimatedCard from "./AnimatedCard";
import type { Cards } from "../types/cards";
import type { Phase, Round } from "../types/cardTrickMachine";

interface Props {
  phase: Phase; // Current phase from the machine
  cards: Cards;
  round: Round;
}

const CardTable = ({ cards, phase, round }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="grid grid-cols-3 gap-4 mt-4"
        style={{
          maxWidth: "727px",
          width: "100%",
        }}
      >
        {cards.map((card, index) => (
          <AnimatedCard
            key={index}
            rank={card.rank}
            suit={card.suit}
            phase={phase}
            round={round}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CardTable;

// const column = index % columnCount; // 0,1,2
//           const row = Math.floor(index / columnCount); // 0..6
//           const finalX = column * (cardWidth + 150); // 15px space between columns TODO: this will need to change based on screen size
//           const finalY = row * overlap; // overlap vertically

//           return (
//             <>
//               <motion.div
//                 key={index}
//                 className="absolute"
//                 initial={{
//                   x: -200, // start off-screen left
//                   y: finalY,
//                   opacity: 0,
//                 }}
//                 animate={{
//                   x: finalX,
//                   y: finalY,
//                   opacity: 1,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                   delay: index * 0.1, // stagger each card
//                   ease: "easeOut",
//                 }}
//               >
//                 <Card suit={card.suit} rank={card.rank} />
//               </motion.div>
//             </>
//           );

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
