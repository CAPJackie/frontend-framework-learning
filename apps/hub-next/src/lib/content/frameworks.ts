import type { FrameworkId } from "@lab/ui-tokens";

/**
 * Deep-dive data for each framework page (/frameworks/[slug]).
 * This is intentionally opinionated prose distilled into structured fields so
 * the UI can render consistent sections and comparison tables.
 */

export interface RenderingSupport {
  csr: boolean;
  ssr: boolean;
  ssg: boolean;
  isr: boolean;
  streaming: boolean;
  /** Islands / partial hydration as a first-class model. */
  islands: boolean;
  note: string;
}

export interface FrameworkDoc {
  id: FrameworkId;
  slug: string;
  name: string;
  language: string;
  firstReleased: string;
  maintainer: string;
  /** One-paragraph philosophy. */
  philosophy: string;
  mentalModel: string;
  rendering: RenderingSupport;
  router: string;
  stateBuiltIn: string;
  twoWayBinding: string;
  /** External tooling usually reached for. */
  tooling: { need: string; solution: string }[];
  goodPractices: string[];
  badPractices: string[];
  whenToUse: string[];
  whenToAvoid: string[];
  /** Local dev command for this app in the monorepo. */
  devCommand: string;
  demoPath: string;
}

export const FRAMEWORK_DOCS: Record<FrameworkId, FrameworkDoc> = {
  next: {
    id: "next",
    slug: "next",
    name: "Next.js",
    language: "TypeScript / JavaScript (React)",
    firstReleased: "2016",
    maintainer: "Vercel",
    philosophy:
      "Next.js is the reference React meta-framework. Its App Router is built on React Server Components: components render on the server by default and you opt into client interactivity with a 'use client' boundary. The goal is to let a single codebase mix rendering strategies per-route while keeping the default fast (little client JS).",
    mentalModel:
      "Think in a server/client tree. Server Components fetch data and render HTML with zero client JS; Client Components add interactivity. Data flows down as props; you never 'fetch in a useEffect' for initial data if a Server Component can do it.",
    rendering: {
      csr: true,
      ssr: true,
      ssg: true,
      isr: true,
      streaming: true,
      islands: false,
      note: "The only framework here that ships all of CSR, SSR, SSG, ISR and streaming as first-class, per-route choices. ISR (revalidate) and PPR (partial prerendering) are Next's signature features.",
    },
    router:
      "File-system App Router (app/ directory). Nested layouts, loading/error boundaries, route groups, parallel & intercepting routes. Navigation is client-side after first load.",
    stateBuiltIn:
      "No global store built in. Local state via React hooks (useState/useReducer). Server state is often 'just fetch in a Server Component'. Global client state uses Context or an external lib (Zustand/Redux/Jotai).",
    twoWayBinding:
      "React is one-way by design: value flows down via props, changes flow up via callbacks. 'Two-way' on an input is manual: value={x} + onChange={e => setX(e.target.value)}. This is explicit, not automatic.",
    tooling: [
      { need: "Global client state", solution: "Zustand / Redux Toolkit / Jotai (external)" },
      { need: "Server-state caching (SPA-style)", solution: "TanStack Query or SWR (external)" },
      { need: "Forms & validation", solution: "React Hook Form + Zod (external)" },
      {
        need: "Unit / component testing",
        solution: "Vitest / Jest + React Testing Library (external)",
      },
      { need: "E2E testing", solution: "Playwright / Cypress (external)" },
    ],
    goodPractices: [
      "Fetch initial data in Server Components; keep 'use client' as low in the tree as possible.",
      "Use the built-in <Link> and layouts instead of a client router library.",
      "Co-locate loading.tsx / error.tsx with routes for streaming + graceful errors.",
      "Prefer Server Actions or route handlers over ad-hoc API fetching for mutations.",
    ],
    badPractices: [
      "Marking the whole app 'use client' — you lose the server-rendering benefit.",
      "Fetching initial data in useEffect when a Server Component could do it.",
      "Putting secrets in Client Components (they ship to the browser).",
    ],
    whenToUse: [
      "You want SSR/ISR/SSG in one app with great DX and a huge ecosystem.",
      "SEO-critical content plus rich interactivity.",
      "You're already a React shop and want a batteries-included meta-framework.",
    ],
    whenToAvoid: [
      "A tiny static site where Astro would ship less JS.",
      "A pure internal SPA with no SEO/SSR need (a Vite SPA is lighter).",
      "Teams that dislike React's server/client mental split.",
    ],
    devCommand: "pnpm dev:hub",
    demoPath: "/demo",
  },
  vue: {
    id: "vue",
    slug: "vue",
    name: "Vue",
    language: "TypeScript / JavaScript (SFC templates)",
    firstReleased: "2014",
    maintainer: "Evan You & the Vue core team",
    philosophy:
      "Vue aims to be approachable and progressively adoptable. Single-File Components (.vue) bundle template, script and styles. Its reactivity system tracks dependencies automatically, so the UI updates when reactive state changes — no manual setState.",
    mentalModel:
      "Declare reactive state with ref()/reactive(); the template re-renders the parts that depend on it. The compiler turns your template into an optimized render function. Reactivity is fine-grained and automatic.",
    rendering: {
      csr: true,
      ssr: true,
      ssg: true,
      isr: true,
      streaming: true,
      islands: false,
      note: "Core Vue is CSR. SSR/SSG/ISR come from Nuxt (the Vue meta-framework). This demo is a Vite CSR SPA to isolate Vue itself.",
    },
    router:
      "Vue Router (official, external package but first-party). Dynamic route matching, nested routes, navigation guards. History or hash mode.",
    stateBuiltIn:
      "Reactivity (ref/reactive/computed) is built in for local & shared state. For app-wide stores, Pinia is the official (external) solution — tiny, typed, devtools-friendly.",
    twoWayBinding:
      'Vue has real two-way binding via v-model. <input v-model="title"> keeps state and the input in sync automatically — the headline convenience React deliberately omits.',
    tooling: [
      { need: "Global state", solution: "Pinia (official, external package)" },
      { need: "Routing", solution: "Vue Router (official, external package)" },
      { need: "SSR/SSG/ISR", solution: "Nuxt (meta-framework)" },
      { need: "Testing", solution: "Vitest + Vue Test Utils (first-party-ish)" },
      { need: "E2E", solution: "Playwright / Cypress" },
    ],
    goodPractices: [
      "Use <script setup> — it's the concise, well-typed SFC style.",
      "Prefer computed() over methods for derived state (cached).",
      "Reach for Pinia for cross-component state instead of prop-drilling or event buses.",
      "Keep components small; use props down / emits up.",
    ],
    badPractices: [
      "Mutating props directly (props are one-way; emit an event instead).",
      "Overusing reactive() for primitives where ref() is clearer.",
      "Rebuilding a global event bus instead of using Pinia.",
    ],
    whenToUse: [
      "You want automatic reactivity and v-model ergonomics.",
      "Progressive adoption — sprinkle Vue into an existing page, or go full SPA/Nuxt.",
      "Teams that prefer templates over JSX.",
    ],
    whenToAvoid: [
      "You need the very largest hiring pool / ecosystem (React is bigger).",
      "You want a single vendor to own routing+state+SSR out of the box (that's Angular/Next).",
    ],
    devCommand: "pnpm dev:vue",
    demoPath: "http://localhost:5173",
  },
  angular: {
    id: "angular",
    slug: "angular",
    name: "Angular",
    language: "TypeScript (first-class)",
    firstReleased: "2016 (Angular 2+; AngularJS 2010)",
    maintainer: "Google",
    philosophy:
      "Angular is a batteries-included platform, not just a view library. It ships routing, forms, HTTP, dependency injection, and testing out of the box, with strong conventions. Modern Angular adds Signals for fine-grained reactivity and standalone components that drop the old NgModule boilerplate.",
    mentalModel:
      "Components + a powerful DI container. Templates bind to component fields; Signals (or the older Zone.js change detection) drive updates. You compose services via DI rather than importing singletons.",
    rendering: {
      csr: true,
      ssr: true,
      ssg: true,
      isr: false,
      streaming: true,
      islands: false,
      note: "Historically a CSR SPA. Angular SSR (formerly Angular Universal) adds server rendering, prerendering (SSG) and now incremental hydration. ISR isn't a first-class concept.",
    },
    router:
      "Angular Router (built into the platform). Rich guards, resolvers, lazy-loaded routes, and typed inputs from route params.",
    stateBuiltIn:
      "Dependency Injection + services is the built-in state pattern. Signals (built in) give reactive local/shared state. For large apps, NgRx (external, Redux-style) or the lighter Signals-based stores are common.",
    twoWayBinding:
      "Angular's signature [(ngModel)] 'banana in a box' is genuine two-way binding. It's syntactic sugar over property binding [x] + event binding (xChange).",
    tooling: [
      { need: "Global state", solution: "Built-in services/Signals; NgRx for large apps" },
      {
        need: "Routing / forms / HTTP",
        solution: "All built in (@angular/router, forms, common/http)",
      },
      { need: "SSR / prerender", solution: "@angular/ssr (built in)" },
      {
        need: "Testing",
        solution: "Karma/Jasmine historically; Vitest/Jest + Testing Library increasingly",
      },
      { need: "E2E", solution: "Playwright / Cypress" },
    ],
    goodPractices: [
      "Use standalone components + Signals — skip legacy NgModules in new code.",
      "Lean on DI to provide services instead of global singletons.",
      "Use the async pipe (or Signals) so subscriptions clean up automatically.",
      "Type your route params and use resolvers for pre-fetch.",
    ],
    badPractices: [
      "Manual subscribe() without unsubscribe (memory leaks) — prefer async pipe/signals.",
      "Reintroducing NgModules for greenfield code.",
      "Business logic inside components instead of services.",
    ],
    whenToUse: [
      "Large enterprise apps that benefit from strong conventions & one vendor.",
      "Teams that want routing/forms/HTTP/testing decided for them.",
      "TypeScript-first shops that value structure over flexibility.",
    ],
    whenToAvoid: [
      "Small projects where the framework's size/ceremony is overkill.",
      "You want minimal JS shipped (Astro) or maximum flexibility (React).",
    ],
    devCommand: "pnpm dev:angular",
    demoPath: "http://localhost:4200",
  },
  astro: {
    id: "astro",
    slug: "astro",
    name: "Astro",
    language: "Astro components + your UI framework of choice",
    firstReleased: "2021",
    maintainer: "The Astro team (astro.build)",
    philosophy:
      "Astro is content-first and ships zero JavaScript by default. Pages are server-rendered to HTML; interactivity is added as 'islands' — isolated components (React/Vue/Svelte/Solid) that hydrate independently. You pay JS cost only where you truly need it.",
    mentalModel:
      "Everything is static HTML unless you explicitly mark an island with a client:* directive. Islands are opt-in interactivity; the rest of the page is inert HTML, which is why Astro sites are so light.",
    rendering: {
      csr: false,
      ssr: true,
      ssg: true,
      isr: true,
      streaming: true,
      islands: true,
      note: "Astro's signature is islands architecture + partial hydration. SSG by default; SSR and ISR (on adapters like Vercel) available. 'CSR' only exists inside hydrated islands.",
    },
    router:
      "File-based routing (src/pages). Multi-page by default (each route is its own HTML document). No heavy client router unless you add a SPA framework or View Transitions.",
    stateBuiltIn:
      "No global client store — the page is mostly static. For cross-island shared state, nanostores is the recommended tiny library. Local state lives inside each island's framework.",
    twoWayBinding:
      "Astro itself has no reactive binding (it's static templating). Binding happens inside islands, using whatever framework the island is written in (React one-way, Vue v-model, etc.).",
    tooling: [
      { need: "Interactivity", solution: "Islands via React/Vue/Svelte/Solid integrations" },
      { need: "Shared island state", solution: "nanostores (external, tiny)" },
      { need: "SSR / ISR", solution: "Adapters (@astrojs/vercel, node, etc.)" },
      { need: "Content", solution: "Content Collections (built in, typed markdown/MDX)" },
      { need: "Testing", solution: "Vitest + framework testing libs; Playwright E2E" },
    ],
    goodPractices: [
      "Keep islands small and few; use client:load only when needed (prefer client:visible/idle).",
      "Use Content Collections for typed markdown content.",
      "Share state across islands with nanostores, not window globals.",
      "Choose the lightest island framework for the job.",
    ],
    badPractices: [
      "Turning the whole page into one big client:load React island (defeats the purpose).",
      "Reaching for Astro when you actually need a full app SPA.",
      "Duplicating state per island instead of a shared store.",
    ],
    whenToUse: [
      "Content-heavy sites: blogs, docs, marketing, e-commerce catalogs.",
      "You want top Lighthouse scores and minimal JS.",
      "You want to mix React + Vue + Svelte components in one project.",
    ],
    whenToAvoid: [
      "Highly interactive app-like dashboards (a full SPA/meta-framework fits better).",
      "You need a rich client router and lots of shared client state.",
    ],
    devCommand: "pnpm dev:astro",
    demoPath: "http://localhost:4321",
  },
  tanstack: {
    id: "tanstack",
    slug: "tanstack",
    name: "TanStack Start",
    language: "TypeScript (React)",
    firstReleased: "2024 (Start); TanStack Router/Query earlier",
    maintainer: "Tanner Linsley & the TanStack team",
    philosophy:
      "TanStack Start is a full-stack React framework built on TanStack Router, with type-safe routing, loaders, and server functions. It pairs with TanStack Query for server-state. The pitch is end-to-end type safety: your routes, params, search params and loader data are all typed.",
    mentalModel:
      "Routes are defined in code (file-based but strongly typed). Loaders fetch data before render; server functions ('use server') run on the server and are callable from the client with full types. TanStack Query manages caching/invalidation of server state.",
    rendering: {
      csr: true,
      ssr: true,
      ssg: true,
      isr: false,
      streaming: true,
      islands: false,
      note: "SSR + streaming with selective/progressive hydration, plus SPA mode and prerendering (SSG). ISR isn't a headline feature; caching is handled via TanStack Query + loaders.",
    },
    router:
      "TanStack Router — the most type-safe router here. Search params are first-class, validated and typed. Loaders + Query integration make data fetching part of routing.",
    stateBuiltIn:
      "TanStack Query is the server-state layer (caching, background refetch, invalidation). For client UI state you add Zustand/Jotai (external). Router search params double as URL-driven state.",
    twoWayBinding:
      "React one-way binding, same as Next: value + onChange. No automatic two-way. URL search params are a common 'source of truth' pattern here.",
    tooling: [
      { need: "Server-state", solution: "TanStack Query (first-party in this stack)" },
      { need: "Client UI state", solution: "Zustand / Jotai (external)" },
      { need: "Routing / server fns", solution: "TanStack Router + Start (built in)" },
      { need: "Testing", solution: "Vitest + React Testing Library; Playwright E2E" },
      { need: "Validation", solution: "Zod (pairs with typed search params)" },
    ],
    goodPractices: [
      "Let route loaders fetch data; hydrate TanStack Query cache from them.",
      "Model filter/sort/pagination as typed search params (shareable URLs).",
      "Use server functions for mutations instead of hand-rolled API routes.",
      "Lean on the type system — invalid links/params become compile errors.",
    ],
    badPractices: [
      "Fetching in useEffect and ignoring the loader/Query cache.",
      "Storing server data in Zustand instead of TanStack Query.",
      "Bypassing typed search params with manual string parsing.",
    ],
    whenToUse: [
      "React apps that want maximal end-to-end type safety.",
      "Data-heavy UIs where TanStack Query's caching shines.",
      "You love typed search-param-driven state.",
    ],
    whenToAvoid: [
      "You want the largest ecosystem/most Stack Overflow answers (Next is safer).",
      "You need maximum stability today — it's the newest framework here.",
    ],
    devCommand: "pnpm dev:tanstack",
    demoPath: "http://localhost:3001",
  },
};

export const FRAMEWORK_DOC_LIST: FrameworkDoc[] = Object.values(FRAMEWORK_DOCS);
