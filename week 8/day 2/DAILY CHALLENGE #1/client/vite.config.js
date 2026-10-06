import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: resolve(dirname(fileURLToPath(import.meta.url))),
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3001",
    },
  },
  preview: {
    proxy: {
      "/api": "http://127.0.0.1:3001",
    },
  },
});
