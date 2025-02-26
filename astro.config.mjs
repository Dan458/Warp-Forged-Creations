import { defineConfig } from "astro/config";
import icon from "astro-icon"; // Import astro-icon

export default defineConfig({
  output: "static", // Required for GitHub Pages
  site: "https://Dan458.github.io/", // ⚠️ Replace with your actual GitHub Pages URL
  base: "/Warp-Forged-Creations/", // ⚠️ Replace with your GitHub repo name
  build: {
    assets: 'app_assets',
  },
  integrations: [
    icon({
      sets: ["fa6-brands"], // Add FontAwesome 6 brands set
    }),
  ],
});