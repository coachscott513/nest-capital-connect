import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Exclude node_modules and other unnecessary directories from being watched
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/coverage/**',
        '**/.nyc_output/**',
        '**/tmp/**',
        '**/temp/**'
      ]
    },
    fs: {
      // Limit the files Vite can serve
      strict: false
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
