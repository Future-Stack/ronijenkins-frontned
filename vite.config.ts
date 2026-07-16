import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  server: {
    host: true,  
    port: 3000,
    allowedHosts: ["navelle.app"],
    proxy: {
      '/graphql': {
        target: 'https://api.navelle.app',
        changeOrigin: true,
        secure: false,
      }
    }
  },

  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'navelle.app',
      'www.navelle.app'
    ]
  }
});