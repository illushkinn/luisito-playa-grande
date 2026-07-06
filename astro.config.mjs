import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import astroIcon from "astro-icon";

export default defineConfig({
  site: "https://luisito-playa-grande.vercel.app",
  output: "static",
  adapter: vercel(),
  integrations: [sitemap(), astroIcon()],

});
