import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({ failOnError: false }),
    VitePWA({
      registerType: 'autoUpdate',
      name: 'Poll Us',
      short_name: 'Pollus',
      description: 'Polling platform',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/poll-apple.webp',
          sizes: '192x192',
          type: 'image/webp',
        },
        {
          src: 'poll.png',
          sizes: '512x512',
          type: '/image/png',
        },
      ],
    }),
  ],
});
