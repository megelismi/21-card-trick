import { motion, AnimatePresence } from "motion/react";

interface Props {
  phase: string; // Current phase from the machine
  onNext: () => void; // Callback for next action
  onPrev: () => void; // Callback for previous action
}

const dialogueMap: Record<string, string> = {
  intro: "Hello! I'm your magician. Ready to see the 21 Card Trick?",
  dealRound1: "Dealing cards for round 1...",
  askColumn1:
    "Pick a card in your mind, but don't tell me! Just tell me which stack it's in.",
  gatherRound1: "Gathering the cards...",
  dealRound2: "Dealing cards for round 2...",
  askColumn2: "Which column is your card in now?",
  gatherRound2: "Gathering the cards again...",
  dealRound3: "One last deal...",
  askColumn3: "Final time — which column is it in?",
  reveal: "I believe your card is... 🎩✨",
  done: "Thanks for playing!",
};

const DialogueBox: React.FC<Props> = ({ phase, onNext, onPrev }) => {
  console.log("phase", phase);
  const text = dialogueMap[phase] ?? "";

  return (
    <div className="fixed bottom-8 w-full flex flex-col items-center pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="bg-black/75 text-white text-lg px-5 py-3 rounded-lg max-w-[86vw] text-center"
          >
            {text}
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex gap-3 pointer-events-auto">
          <button
            onClick={onPrev}
            className="px-3 py-1 rounded bg-gray-700 text-white"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
