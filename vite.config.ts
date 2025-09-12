import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'; // Import the plugin

// https://vite.dev/config/
export default defineConfig({
   // Add the plugin here
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,          // so Tailwind/classes don't crash tests
    restoreMocks: true,
  },
})
