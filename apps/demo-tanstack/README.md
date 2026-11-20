# demo-tanstack — TanStack Start (Router + Query + server functions)

The reference feature built with TanStack Start: type-safe routing, a route loader calling a
server function, and TanStack Query for server state.

Run it: `pnpm dev:tanstack` (from repo root) → http://localhost:3001

## Look here for…

| Concept              | File                         | What to notice                                                     |
| -------------------- | ---------------------------- | ------------------------------------------------------------------ |
| **Typed routing**    | `src/routes/$filter.tsx`     | `Link to="/$filter" params={{ filter }}` — links are type-checked. |
| **Local state**      | `src/components/Counter.tsx` | Plain `useState` (React).                                          |
| **Client state**     | `src/stores/todos.ts`        | Zustand — UI state, separate from server state.                    |
| **Server state**     | `src/routes/users.tsx`       | `useQuery` seeded from a loader = caching + refetch.               |
| **Server functions** | `src/routes/users.tsx`       | `createServerFn` runs on the server, called with full types.       |
| **Rendering**        | `src/routes/users.tsx`       | SSR loader → first paint has data; Query owns it after.            |
| **Two-way binding**  | `src/components/TodoApp.tsx` | React one-way: `value` + `onChange`.                               |

## The TanStack difference

TanStack's philosophy is **end-to-end type safety**: routes, params, and loader data are all
typed, and invalid links fail at compile time. It cleanly separates _server state_ (TanStack
Query) from _client/UI state_ (Zustand here). Start adds SSR + server functions on top of the
router. It's the newest framework in this lab — powerful, but the smallest ecosystem.

> Note: TanStack packages are pinned to `latest` by the scaffolder. If a future release breaks
> the build, pin the `@tanstack/*` versions in `package.json` to a known-good set.
