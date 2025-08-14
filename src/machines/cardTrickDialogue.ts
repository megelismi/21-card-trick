import type { CardTrickContext } from '../types/cardTrickMachine'

const cardTrickDialogue= {
  intro: `Welcome! I'm going to show you the 21 Card Trick ✨ I'll deal 21 cards into 3 stacks, then you'll pick a card in your mind...but don't tell me! Just tell me which stack it's in. At the end we'll see if I can guess your card 🔮 \n 
  Ready to begin?`,
  deal: (r: CardTrickContext['round']) => r === 1
      ? "Here we go!"
      : r === 2
      ? "Round 2!"
      : "One last deal...",
  ask:  (r: CardTrickContext['round']) => r === 1
      ? "Ok, pick a card in your mind, but don't tell me! Just tell me which stack it's in."
      : r === 2
      ? "Which stack is it in now?"
      : "Final time — which stack is it in now?",
  gather: (r: CardTrickContext['round']) => r === 1
      ? "Interesting choice! Now let me shuffle the magic a little…"
      : r === 2
      ? "Perfect. I can sense the magic building…"
      : "All done! Time to concentrate… 🔮",
  reveal: "Oh I see it! I believe your card is... 🎩✨",
  done: "Amazing, wasn't it? Want to go again and see if you can stump me this time?",
};

// const cardTrickDialogue: Record<string, string> = {
//   intro: `Welcome! I'm going to show you the 21 Card Trick ✨ I'll deal 21 cards into 3 stacks, then you'll pick a card in your mind...but don't tell me! Just tell me which stack it's in. At the end we'll see if I can guess your card 🔮 \n
//   Ready to begin?`,
//   dealCards1: "Here we go!",
//   askColumn1:
//     `Ok pick a card in your mind, but don't tell me! Just tell me which stack it's in.`,
//   gatherCards1: "Interesting choice! Now let me shuffle the magic a little…",
//   dealCards2: "Round 2!",
//   askColumn2: "Do you see your card? Which stack is it in now?",
//   gatherCards2: "Perfect. I can sense the magic building…",
//   dealCards3: "One last deal...",
//   askColumn3: "Final time — which stack is it in now?",
//   gatherCards3: "All done! Time to concentrate… 🔮 ",
//   reveal: "Oh I see it! I believe your card is... 🎩✨",
//   done: "Amazing, wasn't it? Want to go again and see if you can stump me this time?",
// };

export default cardTrickDialogue; 