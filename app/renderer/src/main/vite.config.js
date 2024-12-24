import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electronRenderer from 'vite-plugin-electron-renderer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), electronRenderer()],
  server: {
    port: 3000
  },
})
