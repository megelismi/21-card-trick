import { motion, AnimatePresence } from "motion/react";
import cardTrickDialogue from "../machines/cardTrickDialogue";

function DialogueBox({ phase }: { phase: string }) {
  const text = cardTrickDialogue[phase] ?? "";

  return (
    <div className="fixed bottom-8 flex flex-col items-center pointer-events-none max-w-[720px]">
      <div className="pointer-events-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="bg-black/60 text-white text-lg px-5 py-3 rounded-lg text-center"
          >
            {text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DialogueBox;
