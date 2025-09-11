import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-expect-error: includePaths is supported by Sass but not in Vite's type
        includePaths: [path.resolve(__dirname, "src")],
      },
    },
  },
  base: "/",
});
