export interface TechStat {
  dimension: string;
  label: string;
  value: number;
  color: string;
}

/**
 * Tech stack proficiency for the animated radar chart.
 * Values are 0–100 representing relative depth across five axes.
 */
export const techStackData: TechStat[] = [
  { dimension: "frontend", label: "Frontend", value: 92, color: "#48dbfb" },
  { dimension: "backend", label: "Backend", value: 84, color: "#a855f7" },
  { dimension: "ai", label: "AI / LLM", value: 78, color: "#ff6b6b" },
  { dimension: "mobile", label: "Mobile", value: 72, color: "#feca57" },
  { dimension: "devops", label: "DevOps", value: 76, color: "#10b981" },
];
