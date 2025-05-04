import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";

// Vite configuration with React, Cloudflare plugin, and TailwindCSS
export default defineConfig({
  plugins: [
    cloudflare(),
    react(),
    tailwind(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
