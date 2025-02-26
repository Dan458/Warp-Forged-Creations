import { defineConfig } from "astro/config";
import icon from "astro-icon"; // Import astro-icon

export default defineConfig({
  output: "static", // Required for GitHub Pages
  base: "/Warp-Forged-Creations/", // ⚠️ Replace with your GitHub repo name
  site: "https://Dan458.github.io/Warp-Forged-Creations/", // ⚠️ Replace with your actual GitHub Pages URL
  integrations: [
    icon({
      sets: ["fa6-brands"], // Add FontAwesome 6 brands set
    }),
  ],
});