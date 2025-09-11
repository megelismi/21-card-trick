import '@testing-library/jest-dom';

// Many UI libs (and your code) check matchMedia:
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},        // deprecated, included only for old libraries
    removeListener: () => {},     // deprecated, included only for old libraries
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});