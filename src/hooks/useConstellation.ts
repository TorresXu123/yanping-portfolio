import { useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: string | null;
  tw: number;
};

/** Link distance between two particles (px). */
const LINK_DISTANCE = 130;
/** Radius in which particles connect to the cursor with gravity lines (px). */
const MOUSE_LINK_RADIUS = 180;
/** Radius in which the cursor repels particles (px). */
const MOUSE_REPEL_RADIUS = 95;
/** Max particle count — keeps the O(n²) link pass cheap. */
const MAX_PARTICLES = 130;
/** Share of particles rendered in a random accent color. */
const ACCENT_CHANCE = 0.24;

const ACCENTS = [
  "rgba(255,107,107,",
  "rgba(72,219,251,",
  "rgba(168,85,247,",
  "rgba(254,202,87,",
];

/**
 * Constellation particle network for the hero background (Option B).
 *
 * Renders drifting star particles, links nearby ones with faint lines,
 * repels particles around the cursor and draws purple gravity lines from
 * the cursor to nearby particles. The animation loop pauses while the
 * container is outside the viewport; reduced-motion users get a single
 * static frame.
 *
 * @param canvasRef Ref of the canvas element to render into.
 * @param containerRef Ref of the section that sizes the canvas.
 */
function useConstellation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = false;

    const mouse = { x: -10000, y: -10000 };

    const initParticles = () => {
      const count = Math.min(
        MAX_PARTICLES,
        Math.round((width * height) / 15000),
      );
      particles = [];
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.6 + 0.6,
          accent:
            Math.random() < ACCENT_CHANCE
              ? ACCENTS[(Math.random() * ACCENTS.length) | 0]
              : null,
          tw: Math.random() * Math.PI * 2,
        });
      }
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Drift + cursor repulsion.
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_REPEL_RADIUS * MOUSE_REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((MOUSE_REPEL_RADIUS - d) / MOUSE_REPEL_RADIUS) * 0.7;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }

      // Particle-to-particle links + cursor gravity lines.
      ctx.lineWidth = 1;
      for (let a = 0; a < particles.length; a += 1) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b += 1) {
          const pb = particles[b];
          const ddx = pa.x - pb.x;
          const ddy = pa.y - pb.y;
          const dd2 = ddx * ddx + ddy * ddy;
          if (dd2 < LINK_DISTANCE * LINK_DISTANCE) {
            const alpha = (1 - Math.sqrt(dd2) / LINK_DISTANCE) * 0.26;
            ctx.strokeStyle = `rgba(148,163,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }

        const mdx = pa.x - mouse.x;
        const mdy = pa.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < MOUSE_LINK_RADIUS * MOUSE_LINK_RADIUS) {
          const mAlpha = (1 - Math.sqrt(md2) / MOUSE_LINK_RADIUS) * 0.5;
          ctx.strokeStyle = `rgba(168,85,247,${mAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Star dots with breathing twinkle.
      for (const q of particles) {
        const tw = 0.55 + 0.45 * Math.sin(time * 0.002 + q.tw);
        ctx.fillStyle = q.accent
          ? `${q.accent}${(0.9 * tw).toFixed(3)})`
          : `rgba(255,255,255,${(0.72 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) {
        rafId = requestAnimationFrame(render);
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      if (prefersReducedMotion) {
        // Static frame only — no animation loop for reduced-motion users.
        render(0);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -10000;
      mouse.y = -10000;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    let intersectionObserver: IntersectionObserver | null = null;

    if (prefersReducedMotion) {
      render(0);
    } else {
      // Pause the loop while the hero is scrolled out of view.
      intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true;
            rafId = requestAnimationFrame(render);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(rafId);
          }
        }
      });
      intersectionObserver.observe(container);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
    // Refs are stable across renders — empty deps are intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useConstellation;
