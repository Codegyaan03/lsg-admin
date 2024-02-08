import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: "/src/components",
      utils: "/src/utils",
      pages: "/src/pages",
      hooks: "/src/hooks",
      types: "/src/types",
      reduxStore: "/src/reduxStore",
    },
  },
  plugins: [react()],
});
