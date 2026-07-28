import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("react-icons") || id.includes("lucide-react")) {
            return "icons";
          }

          if (id.includes("@radix-ui")) {
            return "radix";
          }

          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (id.includes("/react/") || id.includes("\\react\\") || id.includes("/react-dom/") || id.includes("\\react-dom\\") || id.includes("/scheduler/") || id.includes("\\scheduler\\")) {
            return "react-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
