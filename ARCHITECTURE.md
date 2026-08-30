# 架构说明

## 概览

`TorresXu123` 是一个由 Vite 生成的静态单页网站。它使用 React 18 函数组件与 TypeScript 渲染三个区块（首页 Hero、技术栈 + 作品、联系方式）。所有样式都集中放在 `src/index.css` 中，便于对照设计稿统一审核设计令牌与组件样式。

## 设计令牌

所有颜色、字体、间距、阴影、缓动与动画时长均以 CSS 自定义属性的形式定义在 `src/index.css` 的 `:root` 选择器中，严格对应设计稿：

- 背景色：`#0a0a0a`、`#fafafa`、`#ffffff`
- 姓名光晕与联系下划线的彩虹渐变
- 标签颜色：前端（蓝）、后端（绿）、工具（紫）
- 从 Google Fonts 加载的 Inter 字体族

## 组件结构

| 组件        | 职责                               |
| ----------- | ---------------------------------- |
| `Hero`      | 全屏首页、导航、标题、主要行动按钮 |
| `TechStack` | 带表情标题与胶囊标签的技术栈区块   |
| `Projects`  | 三列响应式网格的项目卡片           |
| `Articles`  | 跳转到外部博客的单一卡片           |
| `Contact`   | 暗色联系行与页脚                   |

## 自定义 Hooks

- `useScrollReveal` —— 通过 `IntersectionObserver` 在区块进入视口时触发淡入动画。
- `useSmoothScroll` —— 拦截内部锚点链接点击，平滑滚动到目标位置。

## 无障碍

- 页面顶部提供跳过链接
- 使用语义化 HTML（`<main>`、`<nav>`、`<section>`、`<footer>`）
- 聚焦轮廓使用强调紫色 `#a855f7`
- 外部链接与纯图标元素均添加 `aria-label`
- `prefers-reduced-motion` 媒体查询会禁用动画并立即显示内容

## 构建产物

Vite 将应用打包到 `dist/` 目录，生成带哈希的资源文件，可直接部署到 GitHub Pages。`vite.config.ts` 中的 `base` 设置为 `/TorresXu123/`，确保在仓库路径下资源链接解析正确。
