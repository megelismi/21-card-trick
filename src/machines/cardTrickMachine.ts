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
          // wait 1000ms before starting reveal 
          target: 'reveal',
        },
      },
    },
    reveal: {
      on: { REVEAL_DONE: { target: 'done' } }, 
    },
    done: {
      after: {
        750: {
          // wait 750ms before showing done dialogue
          actions: ['setDoneDialogue', 'logContext'],
        }
      },
      on: {
        RESET: { actions: 'resetContext', target: 'intro' },
      },
    }
  }
});

export default cardTrickMachine;