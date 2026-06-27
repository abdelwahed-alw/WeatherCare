import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Bypass system http_proxy for localhost connections
if (!process.env.NO_PROXY) {
  process.env.NO_PROXY = 'localhost,127.0.0.1'
} else if (!process.env.NO_PROXY.includes('localhost')) {
  process.env.NO_PROXY += ',localhost,127.0.0.1'
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
