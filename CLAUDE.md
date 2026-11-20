# CLAUDE.md

Guidance for working in this repo. Keep it accurate — update it when conventions change.

## What this is

A **learning monorepo** comparing five frontend frameworks. Each app implements the **same
reference feature** so they can be diffed side by side; a Next.js hub documents the comparisons.

It is a **polyglot monorepo, not a microfrontend architecture** — the apps share source and
build tooling but are never composed at runtime; each is visited on its own port.

## Layout

```
apps/
  hub-next/       Next.js 16 + Tailwind 4 + shadcn + Recharts — the learning hub  (:3000)
  demo-vue/       Vue 3 + Vite + Pinia + Vue Router                                (:5173)
  demo-angular/   Angular 20 standalone + Signals + Router                         (:4200)
  demo-astro/     Astro 5 + React islands + nanostores                             (:4321)
  demo-tanstack/  TanStack Start (Router + Query + server functions)               (:3001)
packages/
  reference-spec/ Shared TS contract + seed data every demo imports
  ui-tokens/      Shared design tokens / per-framework accent colors
content/
  benchmarks/     Benchmark dataset provenance (sources.md)
```

## Commands

```bash
corepack enable && corepack prepare pnpm@latest --activate   # pnpm is NOT globally installed
pnpm install
pnpm dev:hub      # or dev:vue / dev:angular / dev:astro / dev:tanstack
pnpm build        # all five via Turborepo
pnpm --filter <app> <script>   # target one app
pnpm validate     # turbo lint + build for all apps — final check
pnpm format       # prettier at the root (hub-next gets the tailwind plugin; *.astro is ignored)
```

## The reference-feature contract (most important convention)

Every demo implements the identical feature set defined in `packages/reference-spec`:
**counter (local state) + todo store (global, persisted to `localStorage`) + `/all` `/active`
`/done` filter routes + a users-fetch page.** All demos import `Todo`, `TodoFilter`, `User`,
`filterTodos`, `SEED_TODOS`, `TODO_STORAGE_KEY`, `USERS_API_URL` from `@lab/reference-spec`.

**Changing the contract ripples to all five apps** — that's intentional (it keeps the
comparison honest). If you edit `packages/reference-spec/src/index.ts`, update every demo.

The point of each app is to show its framework's _idiom_, so match the existing style:

| App           | Global state         | Router                 | Users fetch (rendering)                 |
| ------------- | -------------------- | ---------------------- | --------------------------------------- |
| hub-next      | Zustand + persist    | file-system App Router | Server Component + ISR (`revalidate`)   |
| demo-vue      | Pinia                | Vue Router (config)    | `onMounted` (CSR)                       |
| demo-angular  | signals service (DI) | Angular Router         | `ngOnInit` (CSR)                        |
| demo-astro    | nanostores           | file-based             | frontmatter fetch (SSG)                 |
| demo-tanstack | Zustand              | typed TanStack Router  | loader + `createServerFn` + Query (SSR) |

## Conventions

- **Hub content is typed TSX data modules**, not MDX — see `apps/hub-next/src/lib/content/`
  (`frameworks.ts`, `concepts.ts`, `benchmarks.ts`). Add comparisons there, not as markdown.
- **shadcn** components live in `apps/hub-next/src/components/ui/`; `cn` is in `src/lib/utils.ts`.
- The hub is **dark by default** (`className="dark"` on `<html>`); theme tokens are in
  `src/app/globals.css`.
- Demos that don't use Tailwind style with the shared classes from
  `@lab/ui-tokens/tokens.css` (`.lab-shell`, `.lab-card`, `.lab-btn`, `.lab-input`, `.lab-nav`).
- Benchmark numbers are a **curated, cited snapshot** — update `content/benchmarks/sources.md`
  alongside `apps/hub-next/src/lib/content/benchmarks.ts`.

## Toolchain gotchas (these will bite — read before installing/scaffolding)

- **`pnpm-workspace.yaml` carries policy fields this environment enforces**: `allowBuilds`
  (per-dep `true`/`false` for native build scripts), `onlyBuiltDependencies`,
  `minimumReleaseAgeExclude`, and `verifyDepsBeforeRun: false`. Keep `verifyDepsBeforeRun: false`
  or `pnpm run <script>` fails a pre-run dep check. When a new native-binary dep appears, set it
  `true` in `allowBuilds`.
- **Scaffolders** (`create-next-app`, Angular CLI, `tanstack create`) need the Bash sandbox
  disabled to write files. They also default to npm/git — clean up `node_modules`,
  `package-lock.json`, and `.git` inside a freshly scaffolded app.
- **`tanstack create` drops a nested `pnpm-workspace.yaml`** inside the app — delete it so the
  app joins the root workspace.
- **Angular is pinned to v20** on purpose: the current Node here (24.2) is below what the latest
  Angular CLI requires. Use `@angular/cli@20`.
- **TanStack `@tanstack/*` deps are `latest`** (scaffolder's choice). If a release breaks the
  build, pin them to a known-good set.
- Shared `@lab/*` packages ship **raw TS** (`main: src/index.ts`); every toolchain here
  transpiles them, so no prebuild step is needed.
- **No `curl` / `tail` / `timeout` on the Bash PATH** — probe dev servers and read logs with
  `node -e`.
