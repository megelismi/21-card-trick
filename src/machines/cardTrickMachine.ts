import { assign, setup, fromCallback } from 'xstate';
import generateRandomUniqueCards from "../utils/generateRandomCards";
import type { Cards } from "../types/cards";

interface Context {
  selectedColumn?: number; // 0,1,2
  cards: Cards,
}

const cardTrickMachine = setup({
  types: {
    context: {} as {
      cards: Cards;
    },
    events: {} as
      | { type: 'NEXT' }
      | { type: 'SELECT_COLUMN'; column: number }
      | { type: 'PREV' },
  },
  actions: {
    setRandomCards: assign({
      cards: (_ctx) => generateRandomUniqueCards() as Cards
    }),
    logCards: ({ context }: { context: Context }): void => {
      console.log("Current cards in context:", context.cards);
    },
  }
}).createMachine({
  id: 'cardTrick',
  initial: 'intro',
  context: {
    cards: [] // <-- must be initialized here
  },
  states: {
    intro: { 
      entry: ['setRandomCards', 'logCards'],
      on: { NEXT: 'dealRound1' } 
    },
    dealRound1: {
      on: { NEXT: 'askColumn1' },
    },
    askColumn1: {
      on: { SELECT_COLUMN: 'gatherRound1', PREV: 'dealRound1' },
    },
    gatherRound1: {
      invoke: { id: 'gather1', src: fromCallback(() => {}) },
      on: { NEXT: 'done' },
    },
    done: { type: 'final' }
  }
});

export default cardTrickMachine;