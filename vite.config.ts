import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
    proxy: {
      "/graphql": {
        target: "https://api.navelle.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    host: true,
    port: 3000,
    allowedHosts: true,
  },
});
