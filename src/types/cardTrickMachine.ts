import type { Cards } from './cards';

export interface Context {
  selectedColumn?: number; // 0,1,2
  cards: Cards;
}

export type CardTrickEvents =
  | { type: "INTRO" }
  | { type: "DEAL_CARDS_1" }
  | { type: "ASK_COLUMN_1" }
  | { type: "GATHER_CARDS_1"; selectedColumn: number }
  | { type: "DEAL_CARDS_2" }
  | { type: "ASK_COLUMN_2" }
  | { type: "GATHER_CARDS_2"; selectedColumn: number }
  | { type: "DEAL_CARDS_3" }
  | { type: "ASK_COLUMN_3" }
  | { type: "GATHER_CARDS_3"; selectedColumn: number }
  | { type: "REVEAL" }
  | { type: "DONE" };