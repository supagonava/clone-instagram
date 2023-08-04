import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3030,
    // watch: {
    //   usePolling: true,
    // },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      // add this to cache all the imports
      workbox: {
        globPatterns: ['**/*'],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#f69435',
        background_color: '#f69435',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'ttm',
        description: 'TTM CRANE Signature Sign',
        name: 'TTM CRANE Signature Sign',
        icons: [
          {
            src: '/logo.png',
            sizes: '488x162',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
