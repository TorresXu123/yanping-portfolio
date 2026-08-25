import { useEffect, useRef } from "react";

/** Distance from the element center within which the cursor attracts it (px). */
const RADIUS = 110;
/** Max displacement toward the cursor (px). */
const PULL = 12;

/**
 * Magnetic attraction effect: the element is gently pulled toward the
 * cursor while it is within `RADIUS`, then springs back to place (via the
 * CSS transition defined on `.magnetic`) once the cursor moves away.
 *
 * Disabled on touch devices and for reduced-motion users.
 *
 * @returns A ref to attach to the magnetic element.
 */
function useMagnetic<T extends HTMLElement>(): React.RefObject<T> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return undefined;
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || prefersReducedMotion) {
      return undefined;
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS && dist > 0.01) {
        const f = (1 - dist / RADIUS) * PULL;
        element.style.transform = `translate(${((dx / dist) * f).toFixed(2)}px, ${((dy / dist) * f).toFixed(2)}px)`;
      } else {
        element.style.transform = "";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      element.style.transform = "";
    };
    // Refs are stable across renders — empty deps are intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return elementRef;
}

export default useMagnetic;
