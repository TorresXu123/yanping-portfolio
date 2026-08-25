import { useEffect, useRef, useState } from "react";
import useConstellation from "../hooks/useConstellation";
import useMagnetic from "../hooks/useMagnetic";
import useScramble from "../hooks/useScramble";

/** Decoding glyphs shown while the subtitle resolves. */
const SUBTITLE_TEXT = "Specializing in full-stack engineering.";
const SUBTITLE_GLYPHS = "!<>-_\\/[]{}=+*^?#$%&@";
/** Delay before the subtitle starts decoding (matches the entrance score). */
const SUBTITLE_DELAY_MS = 1050;

/** Entrance delay per word of the headline (ms). */
const WORD_DELAYS = ["420ms", "520ms", "640ms"] as const;

/** Interval between RGB glitch bursts on the name, and burst length. */
const GLITCH_INTERVAL_MS = 4200;
const GLITCH_BURST_MS = 340;

/** Typing helper: CSS custom properties need a cast for React styles. */
const cssVars = (vars: Record<string, string>): React.CSSProperties =>
  vars as React.CSSProperties;

/**
 * Hero section — first screen of the portfolio (Option B "Constellation").
 *
 * Layers, back to front:
 * 1. Canvas constellation network (drifting stars, cursor repulsion +
 *    purple gravity lines) — see `useConstellation`.
 * 2. Viewfinder corners framing the screen.
 * 3. Content: eyebrow with blinking caret, word-by-word masked headline,
 *    rainbow-gradient name with periodic RGB glitch ghosts, decoding
 *    subtitle, magnetic CTA.
 * 4. Scroll hint + availability status bar along the bottom edge.
 *
 * The entrance choreography is driven by the `is-ready` class (see
 * `.hero .enter` / `.hero.is-ready` in index.css) and the subtitle
 * decode animation starts on its own timer.
 */
function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const subtitleChars = useScramble(
    SUBTITLE_TEXT,
    SUBTITLE_GLYPHS,
    SUBTITLE_DELAY_MS,
  );

  useConstellation(canvasRef, sectionRef);

  // Kick off the entrance sequence shortly after mount.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  // Periodic RGB glitch burst on the name.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    let burstTimer = 0;
    const interval = window.setInterval(() => {
      setIsGlitching(true);
      burstTimer = window.setTimeout(
        () => setIsGlitching(false),
        GLITCH_BURST_MS,
      );
    }, GLITCH_INTERVAL_MS);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(burstTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero${isReady ? " is-ready" : ""}`}
      id="home"
      aria-label="Introduction"
    >
      <canvas ref={canvasRef} className="hero__stars" aria-hidden="true" />

      <div className="hero__corner hero__corner--tl" aria-hidden="true" />
      <div className="hero__corner hero__corner--tr" aria-hidden="true" />
      <div className="hero__corner hero__corner--bl" aria-hidden="true" />
      <div className="hero__corner hero__corner--br" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow enter" style={cssVars({ "--d": "320ms" })}>
          {"// Full-Stack Engineer"}
        </p>

        <h1 className={`hero__title${isGlitching ? " is-glitching" : ""}`}>
          <span className="word">
            <span
              className="word__inner"
              style={cssVars({ "--wd": WORD_DELAYS[0] })}
            >
              Hey,
            </span>
          </span>{" "}
          <span className="word">
            <span
              className="word__inner"
              style={cssVars({ "--wd": WORD_DELAYS[1] })}
            >
              I&apos;m
            </span>
          </span>{" "}
          <span className="word">
            <span
              className="word__inner"
              style={cssVars({ "--wd": WORD_DELAYS[2] })}
            >
              <span className="hero__name" data-text="Yan Ping.">
                Yan&nbsp;Ping.
              </span>
            </span>
          </span>
        </h1>

        <p
          className="hero__subtitle enter"
          style={cssVars({ "--d": "980ms" })}
          aria-label={SUBTITLE_TEXT}
        >
          <span aria-hidden="true">
            {subtitleChars.map((slot, index) =>
              slot.isGlyph ? (
                <span key={index} className="glyph">
                  {slot.char}
                </span>
              ) : (
                <span key={index}>
                  {slot.char === " " ? "\u00A0" : slot.char}
                </span>
              ),
            )}
          </span>
        </p>
      </div>
    </section>
  );
}

export default Hero;
