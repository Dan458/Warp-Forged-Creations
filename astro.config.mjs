import { defineConfig } from "astro/config";
import icon from "astro-icon"; // Import astro-icon

export default defineConfig({
  output: "static", // Required for GitHub Pages
  site: "https://www.warpforgedcreations.co.uk", // ⚠️ Replace with your actual GitHub Pages URL
  base: "/",
  build: {
    assets: 'app_assets',
  },
  integrations: [
    icon({
      sets: ["fa6-brands"], // Add FontAwesome 6 brands set
    }),
  ],
});