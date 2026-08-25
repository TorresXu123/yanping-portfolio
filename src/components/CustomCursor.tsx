import { useEffect, useRef, useState } from "react";

/** Lerp factor for the trailing ring — lower is snappier. */
const RING_LERP = 0.16;

const isHoverable = (target: EventTarget | null): boolean =>
  target instanceof Element && target.closest("a, button") !== null;

/**
 * Custom cursor (Option B): an instant white dot plus an elastic ring
 * that trails behind it. The ring expands and tints cyan over links and
 * buttons. Mounts nothing on touch devices or for reduced-motion users,
 * and hides the native cursor via a `has-custom-cursor` body class only
 * while active.
 */
function CustomCursor(): JSX.Element | null {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Feature-detect once — custom cursors only make sense with a precise pointer.
  const [enabled] = useState(
    () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return undefined;
    }

    document.body.classList.add("has-custom-cursor");

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;

    const onMouseMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      dot.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`;
    };

    const onMouseOver = (event: MouseEvent) => {
      if (isHoverable(event.target)) {
        ring.classList.add("is-hover");
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      // Only release when leaving the hoverable entirely, not its children.
      if (isHoverable(event.target) && !isHoverable(event.relatedTarget)) {
        ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    let rafId = 0;
    const loop = () => {
      rx += (tx - rx) * RING_LERP;
      ry += (ty - ry) * RING_LERP;
      const half = ring.classList.contains("is-hover") ? 29 : 17;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
