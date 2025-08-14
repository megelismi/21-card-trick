import type { Cards } from "../types/cards";
import type { SelectedStack } from '../types/cardTrickMachine';

interface Args {
    cards: Cards; 
    selectedStack: SelectedStack;
}

// shuffle order => 
    // 0 [1, 0, 2]
    // 1 [0, 1, 2]
    // 2 [1, 2, 0]

function shuffleCardDeck({ cards, selectedStack }: Args): Cards {
    const firstStack = [
        cards[0], 
        cards[3], 
        cards[6], 
        cards[9], 
        cards[12], 
        cards[15], 
        cards[18]
    ];

    const secondStack = [
        cards[1],
        cards[4], 
        cards[7], 
        cards[10], 
        cards[13],
        cards[16],
        cards[19]
    ]; 

    const thirdStack = [
        cards[2],
        cards[5], 
        cards[8],
        cards[11], 
        cards[14], 
        cards[17], 
        cards[20]
    ]; 

   if (selectedStack === 0) {
    return [...secondStack, ...firstStack, ...thirdStack];
   } else if (selectedStack === 1) {
    return [...firstStack, ...secondStack, ...thirdStack];
   }

    return [...secondStack, ...thirdStack, ...firstStack]; 
}

export default shuffleCardDeck