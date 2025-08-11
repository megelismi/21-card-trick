export interface Context {
  selectedColumn?: number; // 0,1,2
  cards: Cards,
}

export type Events =
  | { type: "INTRO" }
  | { type: "DEAL_ROUND_1" }
  | { type: "GATHER_ROUND"; selectedColumn: number }
  | { type: "DEAL_ROUND_2" }
  | { type: "DEAL_ROUND_3" }
  | { type: "REVEAL" };