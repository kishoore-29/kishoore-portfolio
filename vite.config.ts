import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "src/server",
    },
  },
  vite: {
    build: {
      sourcemap: false,

      chunkSizeWarningLimit: 3000,
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "framer-motion",
        "gsap",
      ],
    },
  },
});