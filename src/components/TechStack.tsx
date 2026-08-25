import useScrollReveal from "../hooks/useScrollReveal";
import { techStackData } from "../data/tech-stack";

/**
 * Inline SVG icons for each tech dimension. Kept in the component so the
 * data file can remain a plain TypeScript module.
 */
const statIcons: Record<string, JSX.Element> = {
  frontend: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M6 21h12M12 17v4" />
      <path d="M6 8l3 3-3 3M18 8l-3 3 3 3" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 18h4" />
    </svg>
  ),
  devops: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

/**
 * Tech-stack section — animated radar chart.
 *
 * Five-axis radar visualising proficiency across Frontend / Backend /
 * AI / Mobile / DevOps. Includes staggered grid/axis fade-in, polygon
 * scale entrance, and pulsing vertex dots.
 */
function TechStack(): JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>();

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 120;
  const axes = techStackData.length;
  const startAngle = -Math.PI / 2;

  const point = (axisIndex: number, value: number) => {
    const angle = startAngle + (axisIndex * 2 * Math.PI) / axes;
    const r = radius * value;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const shapePoints = techStackData
    .map((stat, i) => {
      const p = point(i, stat.value / 100);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");

  const gridRings = [0.2, 0.4, 0.6, 0.8, 1].map((scale, idx) => {
    const ringPoints = Array.from({ length: axes }, (_, i) => {
      const p = point(i, scale);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(" ");
    return (
      <polygon
        key={scale}
        className="radar-grid"
        points={ringPoints}
        style={{ animationDelay: `${idx * 120}ms` }}
      />
    );
  });

  const axisLines = techStackData.map((stat, i) => {
    const end = point(i, 1);
    const labelPoint = point(i, 1.2);
    return (
      <g key={stat.dimension}>
        <line className="radar-axis" x1={cx} y1={cy} x2={end.x} y2={end.y} />
        <text className="radar-label" x={labelPoint.x} y={labelPoint.y}>
          {stat.label}
        </text>
        <text
          className="radar-label-value"
          x={labelPoint.x}
          y={labelPoint.y + 16}
        >
          {stat.value}
        </text>
      </g>
    );
  });

  const dataPoints = techStackData.map((stat, i) => {
    const p = point(i, stat.value / 100);
    return (
      <circle
        key={stat.dimension}
        className="radar-point"
        cx={p.x}
        cy={p.y}
        r={3.5}
        style={{
          ["--dot-color" as string]: stat.color,
          animationDelay: `${500 + i * 120}ms`,
        }}
      />
    );
  });

  return (
    <section
      ref={sectionRef}
      id="works"
      className="tech-radar reveal"
      aria-label="Tech stack proficiency"
    >
      <div className="tech-radar__intro">
        <h2 className="section-title">
          <span aria-hidden="true">⚡</span>
          <span>
            <span className="section-title__accent">Tech</span> Stack
          </span>
        </h2>
        <p>
          五年沉淀 · 全栈 + AI 实战派。从前端交互到后端架构，从 LLM
          应用到移动端交付——一张雷达图说清能力分布。
        </p>
        <div className="tech-radar__stats">
          {techStackData.map((stat) => (
            <div className="tech-radar__stat" key={stat.dimension}>
              <span className="tech-radar__stat-name">
                <span
                  className="tech-radar__stat-icon"
                  aria-hidden="true"
                  style={{ color: stat.color }}
                >
                  {statIcons[stat.dimension]}
                </span>
                <span
                  className="tech-radar__stat-dot"
                  style={{ ["--c" as string]: stat.color }}
                />
                {stat.label}
              </span>
              <span className="tech-radar__stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-radar__chart">
        <svg
          className="radar-svg"
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Tech stack radar chart"
        >
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#48dbfb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient
              id="radarStroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#48dbfb" />
            </linearGradient>
          </defs>
          {gridRings}
          {axisLines}
          <polygon className="radar-shape" points={shapePoints} />
          {dataPoints}
        </svg>
      </div>
    </section>
  );
}

export default TechStack;
