# @lab/reference-spec

The **contract** shared by all five demo apps. It exists so the comparison is
apples-to-apples: every demo implements the _same_ feature set, differing only in
_how_ each framework expresses it.

## The reference feature

Each demo (`hub-next`, `demo-vue`, `demo-angular`, `demo-astro`, `demo-tanstack`)
must implement **all** of the following:

1. **Counter** — a purely _local_ component state value with increment / decrement /
   reset. Demonstrates the framework's minimal reactivity + event binding.
2. **Todo list** — a _global_ store (`TodoStoreContract`) with `add`, `toggle`,
   `edit`, `remove`, `clearCompleted`, persisted to `localStorage` under
   `TODO_STORAGE_KEY`. Demonstrates global state management + two-way binding on the
   add/edit inputs.
3. **Filter routes** — three routes `/all`, `/active`, `/done` (or nested equivalents)
   that filter the same list via `filterTodos`. Demonstrates the router.
4. **Users page** — fetches `USERS_API_URL` and renders a list. Each app fetches using
   its idiomatic approach (Server Component, `onMounted`, resolver, island, loader) so
   you can compare CSR vs SSR data loading.

## Why a shared package

Because every app imports `Todo`, `TodoFilter`, `User`, `filterTodos`, `SEED_TODOS`,
etc. from here, you cannot accidentally let the demos drift apart. Change the todo
shape once and every framework has to react — which is itself a good lesson in how
each toolchain surfaces a type break.
