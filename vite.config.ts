import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import globalStyle from '@originjs/vite-plugin-global-style'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    globalStyle()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
