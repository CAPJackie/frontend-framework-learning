import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static output (SSG) by default — the signature Astro mode. Interactivity is
// added only via React islands (client:* directives). A Vercel/Node adapter would
// enable SSR + ISR.
export default defineConfig({
  integrations: [react()],
  redirects: {
    "/": "/all",
  },
});
