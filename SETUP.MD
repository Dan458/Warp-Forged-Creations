🚀 Astro + tsParticles Setup Guide

This guide walks through setting up tsParticles in Astro, ensuring a smooth installation and avoiding common issues.

📌 Step 1: Install the Correct Packages

The astro-particles component isn’t fully compatible with tsparticles v3 yet, so we need to force install an older version.

📜 Update package.json

Edit your package.json file and replace the dependencies section with:

"dependencies": {
  "astro-particles": "^latest",
  "tsparticles": "2.12",
  "tsparticles-engine": "^2.12.0"
}

🛠 Install Dependencies

Run the following command:

npm install

📌 Step 2: Create TypeScript Declarations

To fix TypeScript errors related to window.particlesInit, we need to declare them globally.

📄 Create src/index.d.ts

Create a file in your src/ folder named index.d.ts and add this:

export {};

declare global {
  interface Window {
    particlesInit: any;
    particlesLoaded: any;
  }
}

📌 Step 3: Configure TypeScript to Use index.d.ts

We must tell TypeScript to include our new file.

📄 Edit tsconfig.json (Project Root)

If you don’t have a tsconfig.json, create one in the root of your Astro project (same place as package.json):

{
  "compilerOptions": {
    "types": ["./src/index.d.ts"]
  },
  "include": ["src"]
}

📌 Step 4: Restart & Reinstall Dependencies

After making these changes, restart your project:

rm -rf node_modules package-lock.json  # Clean old dependencies
npm install  # Reinstall everything
npm run dev  # Start Astro dev server

📌 Step 5: Create a Reusable Particles.astro Component

Now, let’s separate concerns and make an exportable component.

📄 Create src/components/Particles.astro

---
import Particles from "astro-particles";
import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
    background: {
        color: "#000"
    },
    fullScreen: {
        zIndex: -1
    },
    particles: {
        number: {
            value: 100
        },
        move: {
            enable: true
        }
    }
};
---

<script>
    import { type Container, type Engine, tsParticles } from "tsparticles-engine";
    import { loadFull } from "tsparticles";

    // Expose global functions for Astro compatibility
    window.particlesInit = async function (engine: Engine) {
        await loadFull(engine);
    };

    window.particlesLoaded = function (container: Container) {
        console.log("Particles loaded successfully!");
    };
</script>

<!-- Render particles -->
<Particles id="tsparticles" options={options} init="particlesInit" />

📌 Step 6: Use the Particles Component in index.astro

Now, simply import and use the component in your page.

📄 Edit src/pages/index.astro

---
import Particles from "../components/Particles.astro"; // Import the reusable component
layout: "../layouts/Layout.astro"; // Ensure a layout exists
---

<Particles />

<h1 style="color: white; text-align: center; margin-top: 50px;">
  Welcome to My Astro Site!
</h1>

📌 Final Check: Expected Behavior
	1.	Particles should appear and move smoothly 🎉
	2.	No TypeScript or import errors
	3.	The black background should be visible with white particles

💡 Troubleshooting

🚨 Particles Don’t Appear?

✔ Check Console Errors → Open DevTools (F12 in Chrome)
✔ Ensure tsparticles installed correctly → Run npm list tsparticles
✔ Make sure Particles.astro is imported correctly in index.astro

🚨 Blank Screen?

Try adding a height fix:

<div id="tsparticles" style="height: 100vh;"></div>

Then, restart:

npm run dev

✅ Summary of Fixes
	1.	Forced tsparticles to v2.12 in package.json
	2.	Created src/index.d.ts to fix TypeScript issues
	3.	Updated tsconfig.json to include TypeScript declarations
	4.	Restarted & reinstalled dependencies (npm install)
	5.	Made a reusable Particles.astro component
	6.	Imported Particles.astro in index.astro

🚀 Now everything is modular and working perfectly! 😃


Help
Particles example https://vincentgarreau.com/particles.js/#nasa
astro implementation https://github.com/tsparticles/astro/#readme


---

Astro-icons

✅ How We Installed and Configured Astro Icons with FontAwesome 6 Brands

This guide covers how we installed Astro Icons and included the FontAwesome “fa6-brands” set for social media icons.

1️⃣ Install Astro Icons

Run the following command to install the astro-icon integration:

npm install astro-icon

2️⃣ Install FontAwesome 6 Brands Icon Set

Since Astro doesn’t include icon sets by default, we manually installed the FontAwesome brands package:

npm install @iconify-json/fa6-brands

	Why? This ensures Astro has access to the FontAwesome 6 brand icons (e.g., Facebook, Instagram, YouTube).

3️⃣ Update astro.config.mjs to Load the Icon Set

Open astro.config.mjs and add the following configuration:

import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    icon({
      sets: ["fa6-brands"], // Load the FontAwesome 6 Brands set
    }),
  ],
});

	Why? This tells Astro to use the fa6-brands icons from the installed package.

4️⃣ Restart Astro

After saving your config, restart Astro to apply the changes:

npm run dev

	Important: Restarting is required for Astro to recognize new integrations and icon sets.

5️⃣ Add Icons to a Component (SocialLinks.astro)

Create a new component called src/components/SocialLinks.astro and add this code:

---
import { Icon } from "astro-icon/components";
---

<div class="social-links">
  <a href="https://facebook.com" target="_blank" aria-label="Facebook">
    <Icon name="fa6-brands:facebook" width="32" height="32" />
  </a>
  <a href="https://instagram.com" target="_blank" aria-label="Instagram">
    <Icon name="fa6-brands:instagram" width="32" height="32" />
  </a>
  <a href="https://youtube.com" target="_blank" aria-label="YouTube">
    <Icon name="fa6-brands:youtube" width="32" height="32" />
  </a>
</div>

<style>
  .social-links {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
  }

  .social-links a {
    color: white;
    text-decoration: none;
    font-size: 32px;
  }
</style>

	Why? This adds social media icons at the bottom center of the page using FontAwesome icons.

6️⃣ Include SocialLinks.astro in Your Page

Now, import the SocialLinks.astro component into src/pages/index.astro:

---
import Particles from "../components/Particles.astro";
import SocialLinks from "../components/SocialLinks.astro";
layout: "../layouts/Layout.astro";
---

<Particles />

<h1 style="color: white; text-align: center; margin-top: 50px;">Welcome to My Astro Site!</h1>

<SocialLinks />

🚀 Final Result

✅ Social icons now appear at the bottom center of the page.
✅ Icons are locally loaded (no need for FontAwesome CDN).
✅ Fully functional in Astro without extra dependencies.

🎉 Success! You’ve Integrated Astro Icons Properly! 🚀🔥

Now you can easily add more icons from Iconify by following the same steps! 🎨🔗