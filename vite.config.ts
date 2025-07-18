import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwind from "tailwindcss";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: '/', // Important pour le routage
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // Désactiver pour la production
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['framer-motion', 'lucide-react']
          }
        }
      }
    },
    preview: {
      port: 4173,
      host: true
    },
    server: {
      port: 5173,
      host: true
    },
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  }
})
