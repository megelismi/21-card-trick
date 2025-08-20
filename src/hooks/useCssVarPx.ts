import { useEffect, useState } from "react";

function readCssVarPx(name: string, fallback = 0): number {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();                  // important: remove leading/trailing whitespace
  const n = Number.parseFloat(v); // "70px" -> 70
  return Number.isFinite(n) ? n : fallback;
}

function useCssVarPx(name: string, fallback = 0) {
  const [val, setVal] = useState(() => readCssVarPx(name, fallback));

  useEffect(() => {
    const update = () => setVal(readCssVarPx(name, fallback));
    update(); // initial

    // Update on viewport changes (covers your @media rules)
    window.addEventListener("resize", update);

    // Also listen to the specific media queries you used (optional but snappy)
    const mqMd = window.matchMedia("(max-width: 768px)");
    const mqSm = window.matchMedia("(max-width: 640px)");
    mqMd.addEventListener?.("change", update);
    mqSm.addEventListener?.("change", update);

    return () => {
      window.removeEventListener("resize", update);
      mqMd.removeEventListener?.("change", update);
      mqSm.removeEventListener?.("change", update);
    };
  }, [name, fallback]);

  return val;
}

export default useCssVarPx;