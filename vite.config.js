import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the same build works on GitHub Pages (/thinkit/) and Netlify (/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
