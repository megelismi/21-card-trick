import { ROWS_PER_STACK } from "../constants/cards";

export const Anim = {
  // --- layout ---
  cornerPadding: 18, // px; distance from viewport top/left for the corner pile
  offScreenGutter: 48, // px; if we need to deal the cards off screen, because there's no room, then move them far enough off screen that the user can't see them

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
    betweenStacksGap: 0.20,// seconds pause between stacks 
    ease: "easeInOut" as const,
  },

  // --- reveal ---
  reveal: {
    pileToCenter: { duration: 0.45, ease: "easeInOut" as const, staggerPerCard: 0.025 },
    dimOthers:    { duration: 0.22, ease: "easeOut" as const, yBump: 6, scale: 0.96, opacity: 0.3 },
    lift:         { duration: 0.30, ease: "easeOut" as const, lift: 10, scale: 1.20 },
    bounce:       { duration: 0.50, ease: "easeOut" as const, scaleKey: [1.08, 1.12, 1.02], yKey: -6},
  },

  // --- easing aliases ---
  ease: {
    inOut: "easeInOut" as const,
    out: "easeOut" as const,
    in: "easeIn" as const,
  },

  // --- z-ordering base values ---
  z: {
    gatherBase: 50,   // wrapper z-index = gatherBase + orderIndex
    gatherStackParked: 100,
    gatherStackMoved: 10_000,
    chosenCard: 999,   // z for chosen card during reveal
    overlayTop: 9000,  // emergency top (e.g., for middle stack during reveal)
  },

 
  util: {
     // --- animation helpers ---
    foldDelayForRow(row: number): number {
      // bottom -> top: row 6 first, row 0 last
      return (ROWS_PER_STACK - 1 - row) * Anim.fold.staggerPerCard;
    },
    foldDelayForThisCard({ stackStartTime, row } : { stackStartTime: number, row: number }): number {
    return ( stackStartTime + (ROWS_PER_STACK- 1 - row) * Anim.fold.staggerPerCard );
    },
    foldTotal(): number {
      return Anim.fold.duration + Anim.fold.staggerPerCard * (ROWS_PER_STACK - 1);
    },
    stackStartTime(orderIndex: number): number {
      return orderIndex * (Anim.util.foldTotal() + Anim.move.duration + Anim.move.betweenStacksGap);
    },
    getStackOrder(selected: 0 | 1| 2): [number, number, number] {
      if (selected === 0) return [1, 0, 2];
      if (selected === 1) return [0, 1, 2];
      return [1, 2, 0];
    },
    getViewportDelta(el: Element) {
      const rect = (el as HTMLElement).getBoundingClientRect();
      return { dx: Anim.cornerPadding - rect.left, dy: Anim.cornerPadding - rect.top };
    },
    getCurrentTranslate(el: Element | null) {
      if (!el) return { x: 0, y: 0 };
      const t = window.getComputedStyle(el).transform;
      if (!t || t === "none") return { x: 0, y: 0 };
      const m = new DOMMatrixReadOnly(t);
      return { x: m.m41, y: m.m42 }; // translateX, translateY
    },
    computeOriginOffsetX(
      scopeEl: HTMLElement | null,
      tableEl: HTMLDivElement | null,
      opts?: { offscreenGutter?: number; minGutterOnscreen?: number }
    ) {
        const offscreenGutter = opts?.offscreenGutter ?? Anim.offScreenGutter; // how far beyond the edge to hide
        const minGutterOnscreen = opts?.minGutterOnscreen ?? 0; 

        const tableRect = tableEl?.getBoundingClientRect();
        const cardRect = scopeEl?.getBoundingClientRect();

        const cardW = cardRect?.width ?? 0;

        // Distance from viewport’s left edge to table’s left edge.
        const availableLeft = Math.max(0, tableRect?.left ?? 0);

        const canShowOnscreen = availableLeft >= cardW + minGutterOnscreen;

        // If we can show it, don’t offset; otherwise shove it completely offscreen.
        return canShowOnscreen ? 0 : -(cardW + offscreenGutter);
    }
  },
};