# Yan Ping — 开发者作品集

一个基于 **Vite + React + TypeScript + Tailwind CSS v4** 构建的极简暗色主题单页开发者作品集。

## 功能特性

- 三大全屏区块：首页 Hero、技术栈 + 作品、联系方式
- 姓名彩虹渐变光晕动画
- 平滑锚点滚动与滚动渐显动画
- 响应式布局（手机 / 平板 / 桌面）
- 支持减少动态效果，提升无障碍体验
- SEO 元标签、Open Graph 图片与 Person 结构化数据
- GitHub Actions 工作流，自动部署到 GitHub Pages

## 技术栈

- **框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **样式**：Tailwind CSS v4 + 自定义设计令牌
- **图标**：Emoji + 内联 SVG 网站图标
- **部署**：GitHub Pages

## 环境要求

- Node.js 18 或更高版本
- npm 或 yarn

## 快速开始

```bash
cd yanping-portfolio
npm install
```

## 本地开发

```bash
npm run dev
```

开发服务器默认运行在 `http://localhost:5173/yanping-portfolio/`（已按 GitHub Pages 路径配置 base）。

## 构建

```bash
npm run build
```

静态站点将输出到 `dist/` 目录。如需本地预览生产构建：

```bash
npm run preview
```

## 项目结构

```
yanping-portfolio/
├── public/                 # 静态资源
│   ├── favicon.svg
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── components/         # React 页面区块组件
│   ├── data/               # 项目与技术栈数据
│   ├── hooks/              # 滚动渐显与平滑滚动 Hooks
│   ├── App.tsx
│   ├── index.css           # 设计令牌 + 组件样式
│   └── main.tsx
├── .github/workflows/       # CI/CD
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 授权

© 2025 Yan Ping. 保留所有权利。
