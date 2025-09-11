import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { createActor } from 'xstate';


// --- Mocks (must come before importing the machine) ---
vi.mock('../utils/generateRandomCards', () => ({
  default: vi.fn(() => Array.from({ length: 21 }, (_, i) => `C${i + 1}`)),
}));

vi.mock('../utils/shuffleCardDeck', () => ({
  // return the same cards to keep tests simple & deterministic
  default: vi.fn(({ cards }: { cards: string[]; selectedStack: number }) => cards),
}));

import cardTrickMachine from './cardTrickMachine';
import genCards from '../utils/generateRandomCards';
import shuffleDeck from '../utils/shuffleCardDeck';
import cardTrickDialogue from './cardTrickDialogue';

describe('cardTrickMachine', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('starts in intro with intro dialogue', () => {
    const actor = createActor(cardTrickMachine);
    actor.start();

    const snap = actor.getSnapshot();
    expect(snap.value).toBe('intro');
    expect(actor.getSnapshot().context.dialogue).toBe(cardTrickDialogue.intro);
    expect(snap.context.round).toBe(1);
    expect(snap.context.selectedStack).toBe(0);
  });

  test('full flow through three rounds to reveal and done (with timed actions)', () => {
    const actor = createActor(cardTrickMachine);
    actor.start();

    // INTRO -> DEAL
    actor.send({ type: 'DEAL' });
    expect(actor.getSnapshot().value).toBe('deal');
    // exiting intro sets random cards
    expect(genCards).toHaveBeenCalledTimes(1);
    expect(actor.getSnapshot().context.cards).toHaveLength(21);

    // Round 1: DEAL_DONE -> ASK
    actor.send({ type: 'DEAL_DONE' });
    expect(actor.getSnapshot().value).toBe('ask');

    // ask.after[300] sets ask dialogue
    vi.advanceTimersByTime(300);
    expect(actor.getSnapshot().context.dialogue).toBe(cardTrickDialogue.ask(1));

    // SELECT_STACK -> GATHER (sets selectedStack, clears dialogue on exit)
    actor.send({ type: 'SELECT_STACK', selectedStack: 1 });
    expect(actor.getSnapshot().value).toBe('gather');
    expect(actor.getSnapshot().context.selectedStack).toBe(1);
    expect(actor.getSnapshot().context.dialogue).toBeNull();

    // GATHER_DONE -> pauseBeforeDeal (shuffles)
    actor.send({ type: 'GATHER_DONE' });
    expect(actor.getSnapshot().value).toBe('pauseBeforeDeal');
    expect(shuffleDeck).toHaveBeenCalledTimes(1);

    // pauseBeforeDeal.after[300] -> deal & round++
    vi.advanceTimersByTime(300);
    expect(actor.getSnapshot().value).toBe('deal');
    expect(actor.getSnapshot().context.round).toBe(2);

    // Round 2: DEAL_DONE -> ASK
    actor.send({ type: 'DEAL_DONE' });
    expect(actor.getSnapshot().value).toBe('ask');
    vi.advanceTimersByTime(300);
    expect(actor.getSnapshot().context.dialogue).toBe(cardTrickDialogue.ask(2));

    actor.send({ type: 'SELECT_STACK', selectedStack: 2 });
    expect(actor.getSnapshot().value).toBe('gather');
    expect(actor.getSnapshot().context.selectedStack).toBe(2);

    actor.send({ type: 'GATHER_DONE' });
    expect(actor.getSnapshot().value).toBe('pauseBeforeDeal');
    expect(shuffleDeck).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(300);
    expect(actor.getSnapshot().value).toBe('deal');
    expect(actor.getSnapshot().context.round).toBe(3);

    // Round 3: DEAL_DONE -> ASK
    actor.send({ type: 'DEAL_DONE' });
    expect(actor.getSnapshot().value).toBe('ask');
    vi.advanceTimersByTime(300);
    expect(actor.getSnapshot().context.dialogue).toBe(cardTrickDialogue.ask(3));

    actor.send({ type: 'SELECT_STACK', selectedStack: 0 });
    expect(actor.getSnapshot().value).toBe('gather');
    expect(actor.getSnapshot().context.selectedStack).toBe(0);

    // FINAL_GATHER_DONE (last round) -> pauseBeforeReveal (shuffles)
    actor.send({ type: 'FINAL_GATHER_DONE' });
    expect(actor.getSnapshot().value).toBe('pauseBeforeReveal');
    expect(shuffleDeck).toHaveBeenCalledTimes(3);

    // pauseBeforeReveal.after[1000] -> reveal
    vi.advanceTimersByTime(1000);
    expect(actor.getSnapshot().value).toBe('reveal');

    // REVEAL_DONE -> done; done.after[750] sets done dialogue
    actor.send({ type: 'REVEAL_DONE' });
    expect(actor.getSnapshot().value).toBe('done');

    // done.after -> set done dialogue
    vi.advanceTimersByTime(750);
    expect(actor.getSnapshot().context.dialogue).toBe(cardTrickDialogue.done);

    // RESET -> intro (and intro entry sets intro dialogue again)
    actor.send({ type: 'RESET' });
    expect(actor.getSnapshot().value).toBe('intro');
    expect(actor.getSnapshot().context.round).toBe(1);
    expect(actor.getSnapshot().context.selectedStack).toBe(0);
    expect(actor.getSnapshot().context.dialogue).toBe(cardTrickDialogue.intro);
  });
});
