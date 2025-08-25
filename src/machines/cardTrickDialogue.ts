import type { CardTrickContext } from '../types/cardTrickMachine'

const cardTrickDialogue= {
  intro: `I'm going to show you the 21 Card Trick ✨ I'll deal 21 cards into 3 stacks, then you'll pick a card in your mind...but don't tell me! Ready?`,
  ask:  (r: CardTrickContext['round']) => r === 1
      ? "Pick a card in your mind, then tell me which stack it's in."
      : r === 2
      ? "✨ Which stack is your card in now?"
      : "Final round — which stack is your card in?",
  done: "Amazing, wasn't it? Want to go again and see if you can stump me this time?",
};

export default cardTrickDialogue; 