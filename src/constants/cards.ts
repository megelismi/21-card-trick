export const SUITS = ["hearts", "diamonds", "clubs", "spades"]; 
export const RANK = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]; 

// the keys are the selected stack
// the selected stack determines the shuffle order
// the selected stack should always get shuffled to the middle
// the value is the shuffled stack order
export const SHUFFLE_ORDER = {
    0: [1, 0, 2],
    1: [0, 1, 2],
    2: [1, 2, 0],
}