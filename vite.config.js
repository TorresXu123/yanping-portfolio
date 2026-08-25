import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
/**
 * Vite configuration for Yan Ping portfolio.
 *
 * The site is deployed to GitHub Pages under the repository path
 * /yanping-portfolio/. base must match so that asset URLs resolve
 * correctly in production.
 */
export default defineConfig({
    base: '/yanping-portfolio/',
    plugins: [react(), tailwindcss()],
    build: {
        outDir: 'dist',
        sourcemap: true,
        minify: 'esbuild',
    },
});
