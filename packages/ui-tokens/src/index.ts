/**
 * Brand accent per framework, reused by the hub (for cards/badges) and by each
 * demo (for its header) so the whole lab reads as one design family.
 */
export type FrameworkId = "next" | "vue" | "angular" | "astro" | "tanstack";

export interface FrameworkMeta {
  id: FrameworkId;
  name: string;
  /** Primary accent, hex. Roughly each project's real brand color. */
  accent: string;
  tagline: string;
  /** Local dev port the demo runs on, for cross-links from the hub. */
  devPort: number;
}

export const FRAMEWORKS: Record<FrameworkId, FrameworkMeta> = {
  next: {
    id: "next",
    name: "Next.js",
    accent: "#000000",
    tagline: "The React meta-framework — App Router, RSC, and every rendering mode.",
    devPort: 3000,
  },
  vue: {
    id: "vue",
    name: "Vue",
    accent: "#42b883",
    tagline: "Approachable reactivity with a template compiler and first-party ecosystem.",
    devPort: 5173,
  },
  angular: {
    id: "angular",
    name: "Angular",
    accent: "#dd0031",
    tagline: "Batteries-included platform — DI, signals, and an opinionated structure.",
    devPort: 4200,
  },
  astro: {
    id: "astro",
    name: "Astro",
    accent: "#ff5d01",
    tagline: "Content-first, ship-zero-JS-by-default, with islands of interactivity.",
    devPort: 4321,
  },
  tanstack: {
    id: "tanstack",
    name: "TanStack Start",
    accent: "#ec4899",
    tagline: "Type-safe full-stack React on TanStack Router + Query + server functions.",
    devPort: 3001,
  },
};

export const FRAMEWORK_LIST: FrameworkMeta[] = Object.values(FRAMEWORKS);
