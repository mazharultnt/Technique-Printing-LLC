import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    assetsDir: "build", // JS/CSS go to /build (cached for a year). Photos and videos stay in /assets.
    cssCodeSplit: true,
    rollupOptions: { output: { manualChunks: { vendor: ["react", "react-dom", "react-router-dom"] } } },
  },
});
