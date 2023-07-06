import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({ failOnError: false, include: './src' }),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'networkFirst',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^(http|https):\/\/[a-z0-9:-_.]+\/api\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 60,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Poll Us',
        short_name: 'Pollus',
        description: 'Polling platform',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-48-48.png',
            sizes: '48x48',
            type: 'image/webp',
          },
          {
            src: 'pwa-144-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'pwa-192-192.png',
            sizes: '192x192',
            type: 'image/webp',
          },
          {
            src: 'pwa-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
