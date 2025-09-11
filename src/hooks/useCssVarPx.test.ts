import { describe, test, expect } from 'vitest';
import { readCssVarPx } from './useCssVarPx';

describe('readCssVarPx', () => {
  test('reads px value and parses number', () => {
    document.documentElement.style.setProperty('--overlap', '75px');
    expect(readCssVarPx('--overlap', 0)).toBe(75);
  });

  test('returns fallback on invalid value', () => {
    document.documentElement.style.setProperty('--overlap', 'not-a-px');
    expect(readCssVarPx('--overlap', 42)).toBe(42);
  });
});