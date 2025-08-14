import { motion, AnimatePresence } from "motion/react";

function DialogueBox({ dialogue }: { dialogue: string }) {
  return (
    <div className="fixed bottom-8 flex flex-col items-center pointer-events-none max-w-[720px]">
      <div className="pointer-events-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="magician-font bg-black/60 text-white text-[24px] px-5 py-3 rounded-lg"
          >
            <p className="whitespace-pre-line">{dialogue}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DialogueBox;
