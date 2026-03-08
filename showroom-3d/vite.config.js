import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Car-showroom/",
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      events: 'events',
      util: 'util'
    }
  }
})
