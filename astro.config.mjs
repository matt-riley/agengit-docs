// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://agengit.mattriley.tools",
  output: "server",
  adapter: cloudflare(),
  integrations: [
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      llmsTxt: {
        title: "agengit",
        siteUrl: "https://agengit.mattriley.tools",
      },
      markdownAlternate: true,
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
