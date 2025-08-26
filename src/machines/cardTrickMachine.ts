import { assign, setup } from 'xstate';
import generateRandomUniqueCards from "../utils/generateRandomCards";
import shuffleCardDeck from "../utils/shuffleCardDeck";
import cardTrickDialogue from './cardTrickDialogue';
import type { CardTrickContext, CardTrickEvents } from '../types/cardTrickMachine'

const cardTrickMachine = setup({
  types: {
    context: {} as CardTrickContext,
    events: {} as CardTrickEvents
  },
  actions: {
    setIntroDialogue: assign({ 
      dialogue: () => cardTrickDialogue.intro 
    }),

    setAskDialogue: assign({ 
      dialogue: ({ context }: { context: CardTrickContext }) => {
        return cardTrickDialogue.ask(context.round) 
    }}),

    setDoneDialogue: assign({ 
      dialogue: () => cardTrickDialogue.done 
    }),

    clearDialogue: assign({ 
      dialogue: () => null 
    }),

    setRandomCards: assign({
      cards: () => generateRandomUniqueCards()
    }),

    shuffleCards: assign({
      cards: ({ context }: { context: CardTrickContext }) => {
        return shuffleCardDeck({ cards: context.cards, selectedStack: context.selectedStack })
    }}),

    setSelectedStack: assign({ 
      selectedStack: ({ event }: { event: CardTrickEvents }) => {
        return event.type === 'SELECT_STACK' ? event.selectedStack : 0; 
      } 
    }),

    incrementRound: assign({
    round: ({ context }: { context: CardTrickContext }) => {
      return context.round < 3 ? ((context.round + 1) as 2 | 3) : context.round; 
    }}),

    resetContext: assign({ round: 1 as const, selectedStack: 0, dialogue: '' }),

    logContext: ({ context, event }: { context: CardTrickContext, event: CardTrickEvents }): void => {
      console.log("Current context:", context);
      console.log("Current event", event.type);
    },
  },
  guards: {
    isLastRound: ({ context }: { context: CardTrickContext }) => context.round === 3,
    notLastRound: ({ context }: { context: CardTrickContext }) => context.round < 3,
  }
}).createMachine({
  id: 'cardTrick',
  initial: 'intro',
  context: {
    cards: [],
    selectedStack: 0,
    round: 1,
    dialogue: null,
  },
  entry: ['logContext'],
  states: {
    intro: { 
      entry: ['setIntroDialogue', 'logContext'],
      exit: ['clearDialogue', 'setRandomCards', 'logContext'],
      on: { DEAL: 'deal' } 
    },
    deal: {
      on: {
        DEAL_DONE: { target: 'ask' } // when deal animation finishes
      },
    },
    ask: {
      on: { SELECT_STACK: { actions: 'setSelectedStack', target: 'gather'} }, 
      after: {
        300: {
          actions: ['setAskDialogue', 'logContext'],
        },
      },
      exit: 'clearDialogue'
    },
    gather: {
      on: { 
        GATHER_DONE: { actions: 'shuffleCards', target: 'pauseBeforeDeal' },
        FINAL_GATHER_DONE: { actions: 'shuffleCards', target: 'pauseBeforeReveal' }
      }
    },
    pauseBeforeDeal: {
      after: {
        300: {
          // wait 300ms before starting deal again
          target: 'deal',
          actions: 'incrementRound',
        },
      },
    },
    pauseBeforeReveal: {
      after: {
        1000: {
          // wait 1000ms before starting reveal again
          target: 'reveal',
        },
      },
    },
    reveal: {
      on: { REVEAL_DONE: { target: 'done' } }, 
    },
    done: {
      entry: ['setDoneDialogue', 'logContext'],
       on: {
        RESET: { actions: 'resetContext', target: 'intro' },
      },
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