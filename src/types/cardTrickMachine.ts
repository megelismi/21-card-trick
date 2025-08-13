import type { Cards } from './cards';

export type SelectedStack = 0 | 1 | 2 | null; 

export interface Context {
  selectedStack: SelectedStack; 
  cards: Cards;
}

export type CardTrickEvents =
  | { type: "INTRO" }
  | { type: "DEAL_CARDS_1" }
  | { type: "ASK_COLUMN_1" }
  | { type: "SELECT_STACK"; selectedStack: SelectedStack }
  | { type: "GATHER_CARDS_1" }
  | { type: "DEAL_CARDS_2" }
  | { type: "ASK_COLUMN_2" }
  | { type: "GATHER_CARDS_2" }
  | { type: "DEAL_CARDS_3" }
  | { type: "ASK_COLUMN_3" }
  | { type: "GATHER_CARDS_3" }
  | { type: "REVEAL" }
  | { type: "DONE" };