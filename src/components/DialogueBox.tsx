import { motion, AnimatePresence } from "motion/react";

const dialogueMap: Record<string, string> = {
  intro: `Welcome! I'm going to show you the 21 Card Trick ✨"
  I'll deal 21 cards into 3 stacks, 
  then you'll pick a card in your mind...but don't tell me!
  You just tell me which stack it's in. At the end we'll 
  see if I can guess your card 🔮 Ready to begin?`,
  dealCards1: "Here we go!",
  askColumn1:
    "Ok pick a card in your mind, but remember don't tell me! Just tell which stack it's in.",
  gatherCards1: "Interesting choice! Now let me shuffle the magic a little…",
  dealCards2: "Round 2!",
  askColumn2: "Do you see your card? Which stack is it in now?",
  gatherCards2: "Perfect. I can sense the magic building…",
  dealCards3: "One last deal...",
  askColumn3: "Final time — which stack is it in now?",
  gatherCards3: "All done! Time to concentrate… 🔮 ",
  reveal: "Oh I see it! I believe your card is... 🎩✨",
  done: "Amazing, wasn't it? Want to go again and see if you can stump me this time?",
};

function DialogueBox({ phase }: { phase: string }) {
  const text = dialogueMap[phase] ?? "";

  return (
    <div className="fixed bottom-8  flex flex-col items-center pointer-events-none max-w-[720px]">
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
