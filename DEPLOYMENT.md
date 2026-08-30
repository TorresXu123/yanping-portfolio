# 部署指南

本文档说明如何构建、预览并将 Yan Ping 作品集部署到 GitHub Pages。

## 环境要求

- **Node.js**：18 或更高版本（GitHub Actions 使用 Node.js 22 LTS）
- **npm**：9 或更高版本
- **操作系统**：Windows、macOS 或 Linux

## 本地开发

1. 在项目根目录打开终端：

   ```bash
   cd D:\WorkSpace\WorkBuddySpace\yanping-blogs\TorresXu123
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 启动开发服务器：

   ```bash
   npm run dev
   ```

   Vite 会在 `http://localhost:5173/TorresXu123/` 启动应用。

4. 在浏览器中打开终端输出的地址。

## 生产构建

```bash
npm run build
```

该命令会先执行 TypeScript 类型检查（`tsc -b`），再由 Vite 打包。输出目录为 `dist/`。

本地预览生产构建：

```bash
npm run preview
```

## GitHub Pages 设置

1. 将仓库推送到 GitHub，仓库名命名为 `TorresXu123`。
2. 进入 GitHub 仓库的 **Settings → Pages**。
3. 在 **Build and deployment** 中，选择 **GitHub Actions** 作为来源。
4. 确保 `master` 分支中存在工作流文件 `.github/workflows/deploy.yml`。
5. 下一次向 `master` 分支推送代码时，工作流会自动构建并部署 `dist/` 目录。

## CI/CD 工作流

`.github/workflows/deploy.yml` 定义了一个双任务流水线：

1. **build**
   - 检出代码（`actions/checkout@v5`）。
   - 设置 Node.js 22（`actions/setup-node@v5`，启用 npm 依赖缓存）。
   - 使用 `npm ci` 安装依赖。
   - 运行 `npm run build`（先 `tsc -b` 类型检查，再由 Vite 打包）。
   - 将 `dist/` 目录上传为 Pages 构建产物。

2. **deploy**
   - 等待 build 任务完成。
   - 将产物部署到 GitHub Pages。

工作流会在每次推送到 `master` 时触发，也可以从 **Actions** 标签页手动运行。

## 基础路径

`vite.config.ts` 中设置了 `base: '/TorresXu123/'`，确保站点托管在 `https://<username>.github.io/TorresXu123/` 时资源链接正确。

如果仓库名称变更，需要同步更新 `vite.config.ts` 中的 `base`：

```ts
export default defineConfig({
  base: "/<new-repo-name>/",
  // ...
});
```

## 常见问题排查

### 构建报错 "Cannot find module '@tailwindcss/vite'"

请确认 `npm install` 已成功完成。如果出现锁文件冲突，删除 `node_modules` 和 `package-lock.json` 后重新安装：

```bash
npm install
```

### 构建后 `dist/` 目录为空

请查看构建日志中的错误。常见原因包括 TypeScript 类型错误或依赖缺失。

### GitHub Pages 资源 404

请确认 `vite.config.ts` 中的 `base` 与 GitHub 仓库名称完全一致，包括首尾斜杠。

### 工作流未运行

- 确认 `master` 分支中存在 `.github/workflows/deploy.yml`。
- 在 **Actions** 标签页检查是否有被禁用的工作流。
- 确认仓库已在 **Settings → Pages** 中开启 GitHub Pages 权限。

### TypeScript 错误

直接运行类型检查查看完整错误列表：

```bash
npx tsc -b
```

## 手动部署（备用方案）

如果不想使用 GitHub Actions，可以手动部署：

1. 本地运行 `npm run build`。
2. 将 `dist/` 目录内容上传到任意静态托管服务。

对于不使用 Actions 的 GitHub Pages，可以启用 `gh-pages` 分支，并将 `dist/` 目录推送到该分支。
