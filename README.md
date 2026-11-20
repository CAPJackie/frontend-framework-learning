# Frontend Frameworks Learning Lab

A hands-on monorepo for learning how the most-used 2026 frontend frameworks differ.
**Five apps build the exact same reference feature** — a counter + a persisted todo list with
filter routes and a users-fetch page — so you can diff how each framework handles two-way
binding, state, routing, rendering and tooling. A **Next.js hub** ties it together with written
comparisons, a concept matrix, per-framework deep dives, and a benchmark dashboard of
enterprise adoption trends over ~5 years.

```
apps/
  hub-next/       Next.js 16 + Tailwind 4 + shadcn — the learning hub  (:3000)
  demo-vue/       Vue 3 + Vite + Pinia + Vue Router                     (:5173)
  demo-angular/   Angular 20 standalone + Signals + Router              (:4200)
  demo-astro/     Astro 5 + React islands + nanostores                  (:4321)
  demo-tanstack/  TanStack Start (Router + Query + server fns)          (:3001)
packages/
  reference-spec/ Shared TS contract + seed data every demo imports
  ui-tokens/      Shared design tokens so the demos look like one family
content/
  benchmarks/     Curated dataset provenance (sources.md)
```

## Prerequisites

- **Node ≥ 20** (tested on Node 24). Angular 20 needs Node ≥ 24.0.
- **pnpm** — enable via Corepack: `corepack enable && corepack prepare pnpm@latest --activate`

## Setup

```bash
pnpm install        # installs all workspaces + links the shared packages
```

## Run the apps

Each app runs on its own port. Start any one:

```bash
pnpm dev:hub        # Next.js hub        → http://localhost:3000
pnpm dev:vue        # Vue demo           → http://localhost:5173
pnpm dev:angular    # Angular demo       → http://localhost:4200
pnpm dev:astro      # Astro demo         → http://localhost:4321
pnpm dev:tanstack   # TanStack Start     → http://localhost:3001
```

Or build everything at once (via Turborepo):

```bash
pnpm build          # builds all five apps
```

## The shared reference feature

Every demo implements the same contract from [`packages/reference-spec`](packages/reference-spec/README.md):

1. **Counter** — local component state.
2. **Todo list** — a global store with add/edit/delete/clear, persisted to `localStorage`.
3. **Filter routes** — `/all`, `/active`, `/done` filter the same list via the router.
4. **Users page** — fetches the same endpoint, each in the framework's idiomatic way
   (server component, `onMounted`, `ngOnInit`, build-time frontmatter, loader + Query).

## Learning index — where to look for each concept

| Concept                     | Read in the hub             | Compare the code                                                  |
| --------------------------- | --------------------------- | ----------------------------------------------------------------- |
| Two-way binding             | `/concepts/two-way-binding` | Vue `v-model`, Angular `[(ngModel)]`, React `value/onChange`      |
| Local vs global state       | `/concepts/state`           | Pinia · Angular signals service · Zustand · nanostores            |
| Routing                     | `/concepts/routing`         | file-system · Vue Router · Angular Router · TanStack typed routes |
| Rendering (CSR/SSR/SSG/ISR) | `/concepts/rendering`       | Next ISR · Astro SSG islands · Vue/Angular CSR · TanStack SSR     |
| Passing props               | `/concepts/props`           | `defineProps` · `input()/output()` · function args                |
| Design patterns             | `/concepts/patterns`        | good vs bad per framework                                         |
| Tooling & testing           | `/concepts/tooling`         | what's built in vs installed                                      |
| Enterprise adoption         | `/benchmarks`               | npm · Stack Overflow · State of JS · GitHub, 2021–2025            |

Per-framework deep dives live at `/frameworks/<next|vue|angular|astro|tanstack>` in the hub,
and each demo has its own `README.md` with a "look here for X" table.

## Notes

- **Benchmark data** is a curated, cited snapshot (see
  [`content/benchmarks/sources.md`](content/benchmarks/sources.md)) — read the _shape of the
  curves_, not exact values.
- **TanStack Start** pins its `@tanstack/*` deps to `latest` (the scaffolder's choice). If a
  future release breaks the build, pin them to a known-good set.
- The hub authors its comparison content as typed TSX data modules (in
  `apps/hub-next/src/lib/content/`) rather than MDX, to keep the Next 16 + Turbopack build simple.
