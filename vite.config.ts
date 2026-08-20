import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Split long-lived vendor code out of the app chunk so a copy change
        // does not invalidate the React runtime in visitors' caches.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            /[\\/]node_modules[\\/](react|react-dom|scheduler|wouter)[\\/]/.test(
              id
            )
          ) {
            return "vendor-react";
          }
          if (/[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/.test(id)) {
            return "vendor-ui";
          }
          if (
            /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/.test(
              id
            )
          ) {
            return "vendor-forms";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
