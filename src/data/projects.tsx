import type { ReactNode } from "react";
import type { TagVariant } from "./projects-types";

/**
 * Simple geometric icon for the "智行 AI 助手" project — a pair of
 * code brackets inside a rounded square. Clean and tech-neutral.
 */
function IconAIAssistant(): JSX.Element {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 14l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 14l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10l-4 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Simple icon for the "生活一站通" project — a 2x2 grid of rounded
 * squares, evoking a dashboard of mini services without literal devices.
 */
function IconLifeHub(): JSX.Element {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect
        x="22"
        y="6"
        width="12"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect
        x="6"
        y="22"
        width="12"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect
        x="22"
        y="22"
        width="12"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/**
 * Simple icon for the "极速车神" project — a lightning bolt with a
 * trailing line, suggesting speed without a literal car render.
 */
function IconVelocityDriver(): JSX.Element {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 6l-9 18h8l-2 10 12-20h-8l4-8H19z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 10l5-2M32 16l5-2M30 22l5-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export interface ProjectTag {
  label: string;
  variant: TagVariant;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  /** Inline SVG component, rendered inside the icon tile. */
  icon: ReactNode;
  tags: ProjectTag[];
  /** Accent gradient used on hover glow. */
  accent: string;
}

/**
 * Featured works — three concise project cards with minimal geometric
 * icons. No external assets.
 */
export const projectsData: Project[] = [
  {
    id: "ai-assistant",
    title: "智行 AI 助手",
    description:
      "基于大语言模型的智能对话系统，融合 RAG 检索与多轮上下文理解，支持私有知识库问答与多端接入。",
    url: "https://github.com/TorresXu123/ai-assistant",
    icon: <IconAIAssistant />,
    tags: [
      { label: "Python", variant: "backend" },
      { label: "LLM", variant: "ai" },
      { label: "FastAPI", variant: "backend" },
    ],
    accent:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(72, 219, 251, 0.35))",
  },
  {
    id: "life-hub",
    title: "生活一站通",
    description:
      "整合餐饮外卖、出行查询、生活缴费等多元场景的轻量应用，Web · 小程序 · App 三端无缝触达。",
    url: "https://github.com/TorresXu123/life-hub",
    icon: <IconLifeHub />,
    tags: [
      { label: "微信小程序", variant: "frontend" },
      { label: "云开发", variant: "tools" },
    ],
    accent:
      "linear-gradient(135deg, rgba(72, 219, 251, 0.35), rgba(16, 185, 129, 0.35))",
  },
  {
    id: "velocity-driver",
    title: "极速车神",
    description:
      "基于 Three.js 与 WebGL 打造的浏览器 3D 赛车游戏，借助手势识别实现沉浸式操控与真实漂移手感。",
    url: "https://github.com/TorresXu123/velocity-driver",
    icon: <IconVelocityDriver />,
    tags: [
      { label: "Three.js", variant: "frontend" },
      { label: "WebGL", variant: "frontend" },
    ],
    accent:
      "linear-gradient(135deg, rgba(255, 107, 107, 0.35), rgba(254, 202, 87, 0.35))",
  },
];
