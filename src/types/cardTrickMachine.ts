import type { Cards } from './cards';

export type SelectedStack = 0 | 1 | 2; 
export type Round = 1 | 2 | 3; 
export type Phase = 'intro' | 'deal' | 'ask' | 'gather' | 'reveal' | 'done'; 

export interface CardTrickContext {
  selectedStack: SelectedStack; 
  cards: Cards;
  round: Round;
  dialogue: string; 
}

export type CardTrickEvents =
  | { type: "DEAL" }
  | { type: "DEAL_DONE" }
  | { type: "SELECT_STACK", selectedStack: SelectedStack }
  | { type: "GATHER_DONE" }
  | { type: "FINAL_GATHER_DONE" }
  | { type: "REVEAL" }
  | { type: "TRICK_DONE" }
  | { type: "RESET" }
  