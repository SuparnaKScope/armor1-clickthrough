import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project-page base for GitHub Pages (https://<user>.github.io/armor1-clickthrough/).
// Kept at '/' for local dev so `npm run dev` serves from the root.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/armor1-clickthrough/' : '/',
  server: { port: 5180, open: false },
}))
