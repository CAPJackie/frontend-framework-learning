# demo-vue — Vue 3 + Vite + Pinia + Vue Router

The reference feature (counter + todo + filter routes + users fetch) built the Vue way.

Run it: `pnpm dev:vue` (from repo root) → http://localhost:5173

## Look here for…

| Concept | File | What to notice |
|---|---|---|
| **Two-way binding** | `src/views/TodosView.vue` | `v-model="newTitle"` — one directive, both directions. |
| **Local state** | `src/components/Counter.vue` | `ref(0)` and `@click="count++"`. |
| **Global state** | `src/stores/todos.ts` | Pinia store; you mutate `this.todos` directly and the UI reacts. |
| **Derived state** | `src/views/TodosView.vue` | `computed()` for the filtered list — cached. |
| **Routing** | `src/router.ts` | `createRouter` with config objects + `<RouterLink>`. |
| **Rendering** | `src/views/UsersView.vue` | CSR: fetch runs in `onMounted` (browser). |
| **Props** | `src/views/TodosView.vue` | `defineProps<{ filter }>()` from the route param. |

## The Vue difference

Reactivity is automatic and fine-grained; `v-model` removes the onChange boilerplate React
needs. Router and store are first-party but installed separately. For SSR/SSG/ISR you'd reach
for **Nuxt** — this app is a pure CSR SPA to isolate Vue itself.
