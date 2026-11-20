# demo-astro — Astro 5 + React islands + nanostores

The reference feature built the Astro way: static HTML pages with small interactive
**islands**, and cross-island state in nanostores.

Run it: `pnpm dev:astro` (from repo root) → http://localhost:4321

## Look here for…

| Concept                         | File                         | What to notice                                                        |
| ------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| **Islands / partial hydration** | `src/pages/[filter].astro`   | `Counter client:visible`, `TodoApp client:load` — only these hydrate. |
| **Zero-JS-by-default**          | `src/pages/users.astro`      | No island → the page ships no JavaScript at all.                      |
| **Local state**                 | `src/islands/Counter.tsx`    | A React island with `useState`.                                       |
| **Global state**                | `src/stores/todos.ts`        | `persistentAtom` from nanostores, shared across islands.              |
| **Routing**                     | file-based `src/pages/`      | `[filter].astro` + `getStaticPaths()` → SSG per route.                |
| **Rendering**                   | `src/pages/users.astro`      | Frontmatter fetch runs at **build** (SSG).                            |
| **Props**                       | `[filter].astro` → `TodoApp` | Route param passed as an island prop.                                 |

## The Astro difference

Astro inverts the default: everything is static HTML unless you opt a component into
interactivity with a `client:*` directive. Because the store (nanostores) is framework-
agnostic, you could write islands in React, Vue, or Svelte and share the same state. Great
for content-heavy sites; add an adapter for SSR/ISR.
