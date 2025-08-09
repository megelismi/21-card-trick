import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const magicianDialogue = {
  intro: [
    "🎩 Well hello there! I'm your magical assistant for today's card trick.",
    "I'm going to show you something amazing… but you'll have to play along.",
    "I'll deal out some cards, and I just need you to secretly pick one in your mind.",
    "Ready? Let's begin!",
  ],

  deal1: [
    "✨ Here come the cards for round one...",
    "Look carefully at the cards and remember your chosen one.",
  ],

  chooseRow1: [
    "Alright… which row is your card in?",
    "(Don't tell me your card — just the row number!)",
  ],

  deal2: [
    "Great choice. Now let me shuffle the magic a little…",
    "Here's round two!",
  ],

  chooseRow2: ["Again — which row is your card in this time?"],

  deal3: [
    "Perfect. I can already sense the magic building…",
    "Final deal coming up!",
  ],

  chooseRow3: ["Last time — which row is your card in?"],

  reveal: [
    "Hmmm… let me concentrate… 🔮",
    "Yes… yes… I see it clearly now.",
    "Your card is… 🃏 ***THE ONE YOU PICKED***!",
  ],

  end: [
    "Amazing, wasn't it?",
    "Want to go again and see if you can stump me this time?",
  ],
};

const magicianScript: string[] = [
  "Well hello there! I'm your magical assistant for today's card trick 🎩✨",
  "I'm going to show you something amazing… but you'll have to play along.",
  "I'll deal out some cards, and I just need you to secretly pick one in your mind.",
  "Ready? Let's begin!",
];

export default function MagicianSubtitle() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < magicianScript.length - 1) {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
      }, 6000); // change line every 6 seconds
      return () => clearTimeout(timer);
    }
  }, [lineIndex]);

  const handleNext = () => {
    setLineIndex((prev) => Math.min(prev + 1, magicianScript.length - 1));
  };

  const handleBack = () => {
    setLineIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <div className="fixed bottom-[120px] w-full flex flex-col items-center pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-white bg-opacity-75 text-lg md:text-xl px-4 py-2 rounded-lg max-w-[80%] text-center shadow-sm"
          >
            {magicianScript[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-4 fixed bottom-[60px]">
        <button
          onClick={handleBack}
          disabled={lineIndex === 0}
          className={`px-4 py-2 rounded bg-gray-600 text-white disabled:opacity-40`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={lineIndex === magicianScript.length - 1}
          className={`px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-40`}
        >
          Next
        </button>
      </div>
    </>
  );
}
