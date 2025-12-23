import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // позволяет доступ с других устройств в сети
    open: false // не открывать браузер автоматически
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})