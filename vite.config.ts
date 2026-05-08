import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      sourcemap: false,

      chunkSizeWarningLimit: 3000,

      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            animations: ["framer-motion", "gsap"],
            three: ["three"],
          },
        },
      },
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