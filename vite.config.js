import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  },
  server: {
    cors: {
      origin: '*',
      methods: 'GET,OPTION,HEAD'
    },
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycbwFKVhBBWQHUOWHD0rX04CawhBzuzXMo2uibJlj1ZnC4DjDChLC/exec',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})