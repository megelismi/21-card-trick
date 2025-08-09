import { createMachine } from "xstate";

interface Context {
  selectedColumn?: number; // 0,1,2
}

type Event =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SELECT_COLUMN"; columnIndex: number };

const cardTrickMachine = createMachine<Context, Event>({
  id: "cardTrick",
  initial: "intro",
  context: {},
  states: {
    intro: {
      on: { NEXT: "dealRound1" },
    },

    dealRound1: {
      // invoke a service (we wire this up in React) that resolves when the deal animation finishes
      invoke: { id: "deal1", src: "dealAnimation" },
      on: { NEXT: "askColumn1" },
    },
    askColumn1: {
      on: {
        SELECT_COLUMN: { target: "gatherRound1", actions: "storeSelectedColumn" },
        PREV: "dealRound1",
      },
    },

    gatherRound1: {
      invoke: { id: "gather1", src: "gatherAnimation" },
      on: { NEXT: "dealRound2" },
    },

    dealRound2: {
      invoke: { id: "deal2", src: "dealAnimation" },
      on: { NEXT: "askColumn2" },
    },
    askColumn2: {
      on: {
        SELECT_COLUMN: { target: "gatherRound2", actions: "storeSelectedColumn" },
        PREV: "dealRound2",
      },
    },

    gatherRound2: {
      invoke: { id: "gather2", src: "gatherAnimation" },
      on: { NEXT: "dealRound3" },
    },

    dealRound3: {
      invoke: { id: "deal3", src: "dealAnimation" },
      on: { NEXT: "askColumn3" },
    },
    askColumn3: {
      on: {
        SELECT_COLUMN: { target: "reveal", actions: "storeSelectedColumn" },
        PREV: "dealRound3",
      },
    },

    reveal: {
      // show reveal for some time, then allow restart with NEXT
      after: { 3500: "done" },
      on: { NEXT: "intro", PREV: "askColumn3" },
    },

    done: {
      type: "final",
    },
  },
},
{
  actions: {
    storeSelectedColumn: (ctx, evt) => {
      if (evt.type === "SELECT_COLUMN") ctx.selectedColumn = evt.columnIndex;
    },
  },
});

export default cardTrickMachine;