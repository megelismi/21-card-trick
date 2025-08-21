import { ROWS_PER_STACK } from "../constants/cards";

export const Anim = {
  // --- layout ---
  cornerPadding: 24, // px; distance from viewport top/left for the corner pile

  // --- deal ---
  deal: {
    perCardDelay: 0.10,    // seconds
    duration: 0.50,        // seconds
    ease: "easeOut" as const,
  },

  // --- gather (fold inside a stack) ---
  fold: {
    duration: 0.25,        // seconds for each card's fold to y:0
    staggerPerCard: 0.05,  // seconds; bottom -> top
    ease: "easeInOut" as const,
  },

  // --- move whole stack wrapper to corner ---
  move: {
    duration: 0.40,        // seconds
    betweenStacksGap: 0.10,// seconds pause between stacks (if using time orchestration)
    ease: "easeInOut" as const,
  },

  // --- reveal ---
  reveal: {
    pileToCenter: { duration: 0.45, ease: "easeInOut" as const, staggerPerCard: 0.01 },
    dimOthers:    { duration: 0.22, ease: "easeOut" as const, yBump: 6, scale: 0.96, opacity: 0.3 },
    lift:         { duration: 0.30, ease: "easeOut" as const, lift: 24, scale: 1.08 },
    bounce:       { duration: 0.50, ease: "easeOut" as const, scaleKey: [1.08, 1.12, 1.02], yKey: -6},
  },

  // --- easing aliases (if you prefer named) ---
  ease: {
    inOut: "easeInOut" as const,
    out: "easeOut" as const,
    in: "easeIn" as const,
  },

  // --- z-ordering base values ---
  z: {
    gatherBase: 100,   // wrapper z-index = gatherBase + orderIndex
    chosenCard: 999,   // z for chosen card during reveal
    overlayTop: 9000,  // emergency top (e.g., for middle stack during reveal)
  },

  // --- helpers to compute times ---
  util: {
    foldDelayForRow(row: number) {
      // bottom -> top: row 6 first, row 0 last
      return (ROWS_PER_STACK - 1 - row) * Anim.fold.staggerPerCard;
    },
    foldDelayForThisCard({ stackStartTime, row } : { stackStartTime: number, row: number }) {
    return ( stackStartTime + (ROWS_PER_STACK- 1 - row) * Anim.fold.staggerPerCard );
    },
    foldTotal() {
      return Anim.fold.duration + Anim.fold.staggerPerCard * (ROWS_PER_STACK - 1);
    },
    stackStartTime(orderIndex: number) {
      // if you do time-based orchestration
      return orderIndex * (Anim.util.foldTotal() + Anim.move.duration + Anim.move.betweenStacksGap);
    },
  },
};