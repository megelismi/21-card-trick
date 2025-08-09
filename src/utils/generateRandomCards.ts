import type { Suit, Rank } from "../types/cards";

export default function generateRandomUniqueCards() {
    const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
    const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    
    const cards: { suit: string; rank: string; }[] = [];

    // Generate 21 unique cards
    while (cards.length < 21) { 
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        const card = { suit, rank };

        // Ensure the card is unique
        if (!cards.some(c => c.suit === suit && c.rank === rank)) {
            cards.push(card);
        }
    }   
            
    return cards; 
}