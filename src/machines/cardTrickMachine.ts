import { assign, setup } from 'xstate';
import generateRandomUniqueCards from "../utils/generateRandomCards";
import type { Cards } from "../types/cards";
import type { Context, CardTrickEvents } from '../types/cardTrickMachine'

const cardTrickMachine = setup({
  types: {
    context: {} as Context,
    events: {} as CardTrickEvents
  },
  actions: {
    setRandomCards: assign({
      cards: () => generateRandomUniqueCards() as Cards
    }),
    setSelectedStack: assign({ 
      selectedStack: ({ event }: { event: CardTrickEvents }) => {
        return event.type === 'SELECT_STACK' ? event.selectedStack : null; 
      } 
    }),
    logContext: ({ context, event }: { context: Context, event: CardTrickEvents }): void => {
      console.log("Current context:", context);
      console.log("Current event", event.type);
    }
  }
}).createMachine({
  id: 'cardTrick',
  initial: 'intro',
  context: {
    cards: [],
    selectedStack: null,
  },
  entry: ['logContext'],
  states: {
    intro: { 
      entry: ['logContext'],
      on: { DEAL_CARDS_1: 'dealCards1' } 
    },
    dealCards1: {
      entry: ['setRandomCards', 'logContext'],
      after: {
        3000: "askColumn1" // transition after 3 seconds
      }
    },
    askColumn1: {
      entry: ['logContext'], 
      on: { GATHER_CARDS_1: 'gatherCards1', SELECT_STACK: 'selectStack' }, 
    },
    selectStack: {
      entry: ['setSelectedStack', 'logContext'], 
      target: 'gatherCards', // auto-advance here
    },
    gatherCards1: {
      entry: ['logContext'], // we should receive the selected column and reshuffle cards...
      on: { DEAL_CARDS_2: 'dealCards2' }, 
    },
    dealCards2: {
      entry: ['logContext'],
       after: {
        3000: "askColumn2" // transition after 3 seconds
      }
    },
    askColumn2: {
      entry: ['logContext'], 
      on: { GATHER_CARDS_2: 'gatherCards2', SELECT_STACK: 'selectStack' }, 
    },
    gatherCards2: {
      entry: ['logContext'], // we should receive the selected column and reshuffle cards...
      on: { DEAL_CARDS_3: 'dealCards3' }, 
    },
    dealCards3: {
      entry: ['logContext'],
        after: {
        3000: "askColumn3" // transition after 3 seconds
      }
    },
    askColumn3: {
      entry: ['logContext'], 
      on: { GATHER_CARDS_3: 'gatherCards3', SELECT_STACK: 'selectStack' }, 
    },
    gatherCards3: {
      entry: ['logContext'], // we should receive the selected column and reshuffle cards...
      after: {
        3000: "reveal" // transition after 3 seconds
      }
    },
    reveal: {
      entry: ['logContext'], // reveal animation 
      on: { DONE: 'done' }, 
    },
    done: {
      entry: ['logContext'],
      type: 'final',
    }
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