import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Fail if the port is already in use
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
})