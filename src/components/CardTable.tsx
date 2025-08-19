import AnimatedCard from "./AnimatedCard";
import CardStack from "./CardStack";
import { useRef } from "react";
import type { Cards } from "../types/cards";
import type { Phase, Round } from "../types/cardTrickMachine";
import type { CardTrickEvents, SelectedStack } from "../types/cardTrickMachine";

interface Props {
  phase: Phase; // Current phase from the machine
  cards: Cards;
  round: Round;
  selectedStack: SelectedStack;
  send: (arg0: CardTrickEvents) => void;
}

// TODO: clean up
function getStack({
  cards,
  stackNumber,
}: {
  cards: Cards;
  stackNumber: number;
}) {
  if (stackNumber === 0) {
    return [
      cards[0],
      cards[3],
      cards[6],
      cards[9],
      cards[12],
      cards[15],
      cards[18],
    ];
  } else if (stackNumber === 1) {
    return [
      cards[1],
      cards[4],
      cards[7],
      cards[10],
      cards[13],
      cards[16],
      cards[19],
    ];
  }

  return [
    cards[2],
    cards[5],
    cards[8],
    cards[11],
    cards[14],
    cards[17],
    cards[20],
  ];
}

const CardTable = ({ cards, phase, round, send, selectedStack }: Props) => {
  const tableRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  if (cards.length !== 21) {
    // don't render this component if our cards have not been populated
    return null;
  }

  const firstStack = getStack({ cards, stackNumber: 0 });
  const secondStack = getStack({ cards, stackNumber: 1 });
  const thirdStack = getStack({ cards, stackNumber: 2 });

  console.log({ firstStack, secondStack, thirdStack });

  return (
    <div className="w-full flex justify-center">
      <div
        ref={tableRef}
        className="grid grid-cols-3 gap-4 mt-4 border border-b-blue-300"
        style={{
          maxWidth: "727px",
          width: "100%",
        }}
      >
        <CardStack phase={phase} send={send} stackNumber={0}>
          {firstStack.map((card, index) => (
            <AnimatedCard
              key={index}
              selectedStack={selectedStack}
              stackNumber={0}
              rank={card.rank}
              suit={card.suit}
              phase={phase}
              round={round}
              send={send}
              index={index}
              tableRef={tableRef}
            />
          ))}
        </CardStack>
        <CardStack phase={phase} send={send} stackNumber={1}>
          {secondStack.map((card, index) => (
            <AnimatedCard
              key={index}
              selectedStack={selectedStack}
              stackNumber={1}
              rank={card.rank}
              suit={card.suit}
              phase={phase}
              round={round}
              send={send}
              index={index}
              tableRef={tableRef}
            />
          ))}
        </CardStack>
        <CardStack phase={phase} send={send} stackNumber={2}>
          {thirdStack.map((card, index) => (
            <AnimatedCard
              key={index}
              selectedStack={selectedStack}
              stackNumber={2}
              rank={card.rank}
              suit={card.suit}
              phase={phase}
              round={round}
              send={send}
              index={index}
              tableRef={tableRef}
            />
          ))}
        </CardStack>
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
