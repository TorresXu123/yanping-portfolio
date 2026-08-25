import { useEffect, useState } from "react";

export type ScrambleChar = {
  char: string;
  isGlyph: boolean;
};

/**
 * Text decoding animation: characters materialize one by one while
 * unresolved positions flash random "code" glyphs before settling.
 *
 * Returns a per-character array to render; render `char` (or a no-break
 * space for " ") and tag glyphs with `isGlyph` for accent styling.
 * Initially every position is blank. Reduced-motion users get the final
 * text immediately.
 *
 * @param text Target text to decode into.
 * @param glyphs Pool of random characters used while decoding.
 * @param startDelayMs Delay before the animation starts.
 * @returns Per-character render state.
 */
function useScramble(
  text: string,
  glyphs: string,
  startDelayMs: number,
): ScrambleChar[] {
  const [chars, setChars] = useState<ScrambleChar[]>(() =>
    text.split("").map(() => ({ char: " ", isGlyph: false })),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(text.split("").map((char) => ({ char, isGlyph: false })));
      return undefined;
    }

    let rafId = 0;

    const timer = window.setTimeout(() => {
      const queue = text.split("").map((ch, i) => ({
        ch,
        start: Math.round(i * 1.6 + Math.random() * 6),
        end: Math.round(i * 1.6 + 14 + Math.random() * 10),
      }));

      let frame = 0;

      const update = () => {
        let done = 0;
        const next: ScrambleChar[] = queue.map((q) => {
          if (frame >= q.end) {
            done += 1;
            return { char: q.ch, isGlyph: false };
          }
          if (frame >= q.start) {
            return {
              char: glyphs[(Math.random() * glyphs.length) | 0],
              isGlyph: true,
            };
          }
          return { char: " ", isGlyph: false };
        });

        setChars(next);

        if (done < queue.length) {
          frame += 1.4;
          rafId = requestAnimationFrame(update);
        }
      };

      update();
    }, startDelayMs);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [text, glyphs, startDelayMs]);

  return chars;
}

export default useScramble;
