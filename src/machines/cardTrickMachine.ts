import { assign, setup, fromCallback } from 'xstate';
import generateRandomUniqueCards from "../utils/generateRandomCards";
import type { Cards } from "../types/cards";
import type { Context, Events } from '../types/cardTrickMachine'

const cardTrickMachine = setup({
  types: {
    context: {} as {
      cards: Cards;
    },
    events: {} as Events
  },
  actions: {
    setRandomCards: assign({
      cards: () => generateRandomUniqueCards() as Cards
    }),
    logCards: ({ context }: { context: Context }): void => {
      console.log("Current cards in context:", context.cards);
    },
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnCAVdBLZA1gHS4B2ALugPYDEAIgKICCAMgPoBKA8gKoBydNgEYA2gAYAuolAAHKrFzlcVUtJAAPREIBMATiLaAHDoCs2gMwAWMYaMB2ADQgAnlqF2il3d+8A2E3be5mJ2AL6hTmiYOPjEEGCoADYcVACupBBCNADiTFgAEgwcnLwC4lJIIHIKSipqmggm5vomYm3aIULmQpbaji5uHl4+uv6BusFhESBR2HiERFCo5AAWYOgp6RD0zOzc-ILa5WrVisqqlQ2GdtpEE3Zm2pbmvtYmJk6uCELuniOjASCIXCkQwc1iRHiSU2GW0O1YJQObHMx0qp1qF1ADR+uhMBmMRmsRl8dkM5k+gz+IzGQKmoOi8ziCWSaQy5hoHAYADVdqjZPIznVLloTL9XmJfJL-CZLIYxOSBt9fsMfDSJsCQSBSFR4vBKrMYoQTgKMfVEABaXwUhCWohte0Ox10mZgw3EMiUKjGmrnM0IXrWn4eEa9bQysTed6ag2MyHMmGZb2CzEaRDBQxEEy+MM-GyBQLy63GTP2jq6OxCMRebrR12xpardYJpOm4UIG54+5mHrlozGQO-EPaMPWSMmWsMiFQllbbQt31tyvvIh2fz+PQBVpkgfB-5q4KWCfghbThPmedCrFacx2DwPNo3yx2XqGSwDjMOgISoSGQySo9ukQ6BgAAbsyF4ptivg3nc2hCLoFi3rohgfIqPy+CuwxCK0vivhK-7hKEQA */
  id: 'cardTrick',
  initial: 'intro',
  context: {
    cards: []
  },
  states: {
    intro: { 
      on: { DEAL_ROUND_1: 'dealRound1' } 
    },
    dealRound1: {
      entry: ['setRandomCards', 'logCards'],
      on: { GATHER_ROUND: 'gatherRound' }, // TODO: change later, this is just for testing
    },
    gatherRound: {
      on: { DEAL_ROUND_2: 'dealRound2' },
    },
     dealRound2: {
      on: { DEAL_ROUND_3: 'dealRound3' }, 
    },
    dealRound3: {
      on: { REVEAL: 'reveal' }, 
    },
    reveal: { type: 'final' }
  }
});

/*
1. Green background, large dialogue box that explains what's about to happen. (intro)
  -> dialogue = 
  "Welcome! I’m your magician for today 🎩✨",
  "I'm going to show you the 21 Card Trick.",
  "Here's what'll happen. I’ll deal 21 cards into three stacks, thn you will pick a card in your mind...but don’t tell me!",
  "You just tell me which stack it’s in, and at the end we'll see if I can guess your card (magic ball)",
  "Ready to begin?"

-> user action = clicks yes
-> animation: dialogue box shrink animation 
-> animation: initial card dealing animation

2. 21 cards dealt on the screen (deal1)

 -> dialogue = 
 "Ok pick a card in your mind, but remember don't tell me", 
 "Just tell which stack it's in."
 -> animation: stack button appearance animation (after a few seconds)
 user action: User clicks stack number (playerChoose1)

3. Reorder cards (reOrderCards1)
  
    -> dialogue = 
    "Great choice! Now let me shuffle the magic a little…", 
    -> animation = gatherCards animation (cards fold up vertically, the row the user selected is in the middle)
    -> reorder with middle stack in appropriate place
   
4. Computer redeals cards (deal2)
-> animation = re-dealing cards animation (this is very similar to the initial card dealing animation, but the cards are dealt from a stack in the corner of the screen where they were collected)
-> dialogue = "Here's round 2! Which stack is your card in now?"
-> user action = User clicks stack number (playerChoose2)

5. Reorder cards (reOrderCards2)
    -> dialogue = 
    "Perfect. I can sense the magic building…", 
    -> animation = gatherCards animation 
    -> ensure cards are sorted with middle stack in appropriate place
    
6. Computer redeals cards (deal3)
  -> animation = re-dealing cards animation
  -> dialogue = "Last time — which stack is your card in now?"
  -> user action = User clicks stack number (playerChoose3)

7. Reorder cards (reOrderCards3)
  -> animation = gather cards final (just like the previous gather cards, but this time they go off screen once they are in a stack)

8. Reveal card (revealCard)
  -> dialogue = "Hmmm… let me concentrate… 🔮", 
    "Yes… yes… I see it clearly now!",
    "Is this your card???"
 -> User clicks yes or no

 9. End (end)
  -> if yes: 
    dialogue = "Amazing, wasn’t it? Want to go again and see if you can stump me this time?"
    animation = reset button appears
  
  -> if no: 
    dialogue = "Oh no! The magic did me wrong! Can we try it again to see if I can stump you?"
    animation = reset button appears

*/

export default cardTrickMachine;