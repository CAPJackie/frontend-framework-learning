import type { FrameworkId } from "@lab/ui-tokens";

/**
 * Concept comparison data (/concepts/[slug]).
 * Each concept has a one-liner per framework (for the matrix) plus a deeper
 * explanation and a short annotated code snippet per framework.
 */

export interface CodeSnippet {
  framework: FrameworkId;
  filename: string;
  language: string;
  code: string;
  note: string;
}

export interface Concept {
  slug: string;
  title: string;
  summary: string;
  /** Longer explanation shown at the top of the concept page. */
  explanation: string;
  /** Short cell text per framework for the comparison matrix. */
  matrix: Record<FrameworkId, string>;
  snippets: CodeSnippet[];
  /** Practical guidance. */
  takeaways: string[];
}

export const CONCEPTS: Concept[] = [
  {
    slug: "two-way-binding",
    title: "Two-way binding",
    summary: "How a form input stays in sync with state — automatically, or manually.",
    explanation:
      "Two-way binding means an input's value and a piece of state update each other. Some frameworks give you a single directive that wires both directions (Vue's v-model, Angular's [(ngModel)]). React-based frameworks (Next, TanStack) are deliberately one-way: you set value from state and update state in onChange yourself. Neither is 'better' — automatic binding is convenient; explicit binding is predictable and easy to intercept.",
    matrix: {
      next: "Manual: value + onChange (one-way by design)",
      vue: "Automatic: v-model directive",
      angular: "Automatic: [(ngModel)] banana-in-a-box",
      astro: "Depends on the island's framework",
      tanstack: "Manual: value + onChange (React)",
    },
    snippets: [
      {
        framework: "vue",
        filename: "AddTodo.vue",
        language: "html",
        code: `<script setup>\nimport { ref } from 'vue'\nconst title = ref('')\n</script>\n\n<template>\n  <!-- one directive keeps state <-> input in sync -->\n  <input v-model="title" />\n  <p>Typing: {{ title }}</p>\n</template>`,
        note: "v-model is sugar for :value + @input. One line, both directions.",
      },
      {
        framework: "angular",
        filename: "add-todo.component.ts",
        language: "typescript",
        code: `@Component({\n  selector: 'add-todo',\n  imports: [FormsModule],\n  template: \`\n    <input [(ngModel)]="title" />\n    <p>Typing: {{ title }}</p>\n  \`,\n})\nexport class AddTodo {\n  title = '';\n}`,
        note: "[(ngModel)] = property binding [x] + event binding (xChange) combined.",
      },
      {
        framework: "next",
        filename: "add-todo.tsx",
        language: "tsx",
        code: `'use client'\nimport { useState } from 'react'\n\nexport function AddTodo() {\n  const [title, setTitle] = useState('')\n  return (\n    <>\n      {/* explicit both directions */}\n      <input value={title} onChange={(e) => setTitle(e.target.value)} />\n      <p>Typing: {title}</p>\n    </>\n  )\n}`,
        note: "React is one-way. You wire the return path (onChange) yourself — verbose but explicit.",
      },
    ],
    takeaways: [
      "v-model / [(ngModel)] save boilerplate but hide the update path.",
      "React's explicit onChange makes it trivial to transform/validate on the way in.",
      "In Astro, binding behaves like whichever framework the island uses.",
    ],
  },
  {
    slug: "state",
    title: "Local vs global state",
    summary: "Component-local state versus app-wide stores, and what each framework ships.",
    explanation:
      "Local state lives inside one component (a counter, a form field). Global state is shared across the tree (the todo list, a cart, auth). Vue and Angular have reactivity built in and an official-ish global store (Pinia / services+Signals). React-based frameworks give you local hooks but push global state to an external library (Zustand/Redux/Jotai), and increasingly treat 'server state' separately with TanStack Query.",
    matrix: {
      next: "Local: hooks. Global: Context or Zustand/Redux (external)",
      vue: "Local: ref/reactive. Global: Pinia (official)",
      angular: "Local/shared: Signals + DI services. NgRx for large apps",
      astro: "Local: inside islands. Global: nanostores (external)",
      tanstack: "Local: hooks. Server-state: TanStack Query. UI: Zustand",
    },
    snippets: [
      {
        framework: "vue",
        filename: "todos.store.ts (Pinia)",
        language: "typescript",
        code: `import { defineStore } from 'pinia'\nimport { makeTodo, filterTodos } from '@lab/reference-spec'\n\nexport const useTodos = defineStore('todos', {\n  state: () => ({ todos: [] as Todo[] }),\n  actions: {\n    add(title: string) { this.todos.push(makeTodo(title)) },\n    toggle(id: string) {\n      const t = this.todos.find(t => t.id === id)\n      if (t) t.done = !t.done\n    },\n  },\n})`,
        note: "Pinia stores are reactive by default; mutate state directly in actions.",
      },
      {
        framework: "angular",
        filename: "todos.store.ts (Signals)",
        language: "typescript",
        code: `@Injectable({ providedIn: 'root' })\nexport class TodosStore {\n  private _todos = signal<Todo[]>([]);\n  todos = this._todos.asReadonly();\n\n  add(title: string) {\n    this._todos.update(list => [...list, makeTodo(title)]);\n  }\n  toggle(id: string) {\n    this._todos.update(list =>\n      list.map(t => t.id === id ? { ...t, done: !t.done } : t));\n  }\n}`,
        note: "A DI-provided service holding signals is the modern Angular global store.",
      },
      {
        framework: "next",
        filename: "todos.store.ts (Zustand)",
        language: "typescript",
        code: `import { create } from 'zustand'\nimport { persist } from 'zustand/middleware'\n\nexport const useTodos = create(persist((set) => ({\n  todos: [],\n  add: (title) => set((s) => ({ todos: [...s.todos, makeTodo(title)] })),\n  toggle: (id) => set((s) => ({\n    todos: s.todos.map(t => t.id === id ? { ...t, done: !t.done } : t),\n  })),\n}), { name: 'lab.todos.v1' }))`,
        note: "React has no built-in global store — Zustand (external) is a popular minimal choice.",
      },
    ],
    takeaways: [
      "Vue & Angular give you reactivity + an official global-state story out of the box.",
      "React frameworks separate 'server state' (TanStack Query/SWR) from 'UI state' (Zustand).",
      "For local state, all five are similar; the divergence is at the global layer.",
    ],
  },
  {
    slug: "routing",
    title: "Routing",
    summary: "How each framework maps URLs to views, and how navigation happens.",
    explanation:
      "A router maps URLs to components and handles navigation without full page reloads (in SPAs). Next and Astro use file-system routing. Angular and Vue use configured routers (code or file-based). TanStack Router is code-defined and the most type-safe — invalid links fail at compile time, and search params are validated. Astro is multi-page by default: each route is a real HTML document unless you add View Transitions.",
    matrix: {
      next: "File-system App Router (app/), nested layouts, RSC",
      vue: "Vue Router (official), config or file-based, guards",
      angular: "Angular Router (built in), guards, resolvers, lazy load",
      astro: "File-based src/pages, multi-page by default",
      tanstack: "TanStack Router — typed routes & validated search params",
    },
    snippets: [
      {
        framework: "next",
        filename: "app/[filter]/page.tsx",
        language: "tsx",
        code: `// /all, /active, /done are folders or a [filter] segment\nexport default async function Page({\n  params,\n}: { params: Promise<{ filter: TodoFilter }> }) {\n  const { filter } = await params // params is async in Next 15+\n  return <TodoList filter={filter} />\n}`,
        note: "File-system routing. In Next 15/16 params is a Promise you await.",
      },
      {
        framework: "vue",
        filename: "router.ts (Vue Router)",
        language: "typescript",
        code: `const routes = [\n  { path: '/:filter(all|active|done)', component: TodoView },\n]\nconst router = createRouter({ history: createWebHistory(), routes })\n// in template: <router-link to="/active">Active</router-link>`,
        note: "Routes are configured objects; <router-link> handles client navigation.",
      },
      {
        framework: "tanstack",
        filename: "routes/$filter.tsx",
        language: "tsx",
        code: `export const Route = createFileRoute('/$filter')({\n  parseParams: (p) => ({ filter: p.filter as TodoFilter }),\n  component: TodoView,\n})\n// <Link to="/$filter" params={{ filter: 'active' }} /> is fully typed`,
        note: "Params & search params are typed; a wrong link is a compile error.",
      },
    ],
    takeaways: [
      "File-system (Next/Astro) vs configured (Vue/Angular) vs typed-code (TanStack).",
      "Astro is multi-page (real navigations) unless you opt into View Transitions.",
      "TanStack's typed routing catches broken links before runtime.",
    ],
  },
  {
    slug: "rendering",
    title: "Rendering strategies (CSR / SSR / SSG / ISR)",
    summary: "Where and when HTML is produced — browser, request-time server, or build.",
    explanation:
      "CSR: the browser downloads JS and renders (SPA). SSR: the server renders HTML per request. SSG: HTML is built once at build time. ISR: statically built pages are re-generated in the background on an interval (Next's signature). Islands (Astro): mostly-static HTML with small hydrated interactive regions. Next supports all modes per-route; Astro defaults to SSG + islands; Vue/Angular are CSR unless you add Nuxt / Angular SSR.",
    matrix: {
      next: "CSR + SSR + SSG + ISR + streaming/PPR — all per-route",
      vue: "CSR core; SSR/SSG/ISR via Nuxt",
      angular: "CSR core; SSR + prerender (SSG) + incremental hydration",
      astro: "SSG by default + SSR + ISR (adapter) + islands",
      tanstack: "SSR + streaming + SPA mode + prerender (SSG)",
    },
    snippets: [
      {
        framework: "next",
        filename: "app/users/page.tsx (ISR)",
        language: "tsx",
        code: `// Server Component fetches at build/request; revalidate = ISR\nexport const revalidate = 3600 // rebuild at most hourly\n\nexport default async function Users() {\n  const res = await fetch(USERS_API_URL, { next: { revalidate: 3600 } })\n  const users = await res.json()\n  return <UserList users={users} />\n}`,
        note: "One export flips SSG→ISR. Data is fetched server-side, zero client JS to load it.",
      },
      {
        framework: "astro",
        filename: "src/pages/users.astro (SSG island)",
        language: "html",
        code: `---\n// runs at build (SSG) or request (SSR) — never ships to client\nconst users = await fetch(USERS_API_URL).then(r => r.json())\n---\n<UserList users={users} />\n<Counter client:visible /> <!-- only this island hydrates -->`,
        note: "Frontmatter runs server-side; only client:* components ship JS.",
      },
      {
        framework: "vue",
        filename: "UsersView.vue (CSR)",
        language: "html",
        code: `<script setup>\nimport { ref, onMounted } from 'vue'\nconst users = ref([])\nonMounted(async () => {\n  users.value = await fetch(USERS_API_URL).then(r => r.json())\n})\n</script>`,
        note: "Plain Vue SPA fetches in the browser after mount (CSR). Nuxt would move this server-side.",
      },
    ],
    takeaways: [
      "ISR is essentially a Next/Vercel-ecosystem idea (also Astro/Nuxt on adapters).",
      "Astro inverts the default: static first, hydrate only islands.",
      "Bare Vue/Angular are CSR; their meta-layers (Nuxt / Angular SSR) add server rendering.",
    ],
  },
  {
    slug: "props",
    title: "Passing props & component communication",
    summary: "How data flows down and events flow up in each framework.",
    explanation:
      "All five follow 'data down, events up', but the syntax differs. React/Next/TanStack pass props as function arguments and lift state via callbacks. Vue declares props + emits in SFCs. Angular uses @Input()/@Output() (or the new input()/output() signal APIs). The shared rule everywhere: don't mutate props; notify the parent instead.",
    matrix: {
      next: "props as function args; callbacks to lift state up",
      vue: "defineProps / defineEmits in <script setup>",
      angular: "@Input()/@Output() or input()/output() signals",
      astro: "Astro.props in frontmatter; islands use their framework's props",
      tanstack: "same as React (props + callbacks)",
    },
    snippets: [
      {
        framework: "vue",
        filename: "TodoItem.vue",
        language: "html",
        code: `<script setup>\nconst props = defineProps<{ todo: Todo }>()\nconst emit = defineEmits<{ toggle: [id: string] }>()\n</script>\n<template>\n  <li @click="emit('toggle', props.todo.id)">{{ todo.title }}</li>\n</template>`,
        note: "Props in, emits out — the parent owns the state change.",
      },
      {
        framework: "angular",
        filename: "todo-item.component.ts",
        language: "typescript",
        code: `@Component({ selector: 'todo-item', template: \`\n  <li (click)="toggle.emit(todo().id)">{{ todo().title }}</li>\` })\nexport class TodoItem {\n  todo = input.required<Todo>();       // signal input\n  toggle = output<string>();           // signal output\n}`,
        note: "Modern Angular uses input()/output() signals instead of decorators.",
      },
      {
        framework: "next",
        filename: "todo-item.tsx",
        language: "tsx",
        code: `function TodoItem({ todo, onToggle }: {\n  todo: Todo; onToggle: (id: string) => void\n}) {\n  return <li onClick={() => onToggle(todo.id)}>{todo.title}</li>\n}`,
        note: "Props are just function arguments; the callback lifts the event to the parent.",
      },
    ],
    takeaways: [
      "Same mental model everywhere: data down, events up, never mutate props.",
      "Vue/Angular declare props+events explicitly; React passes plain function args.",
      "Angular's newest APIs (input()/output()) mirror the signals model.",
    ],
  },
  {
    slug: "patterns",
    title: "Design patterns: good vs bad",
    summary: "Cross-framework habits that scale — and anti-patterns that bite.",
    explanation:
      "Beyond syntax, each ecosystem has patterns the community converged on. The good ones share themes: keep state as low as possible until it must be shared, separate server state from UI state, and keep side effects at the edges. The bad ones also rhyme: prop-drilling instead of a store, giant God components, and fetching in the wrong layer.",
    matrix: {
      next: "Good: server components fetch, thin client leaves. Bad: 'use client' everywhere",
      vue: "Good: <script setup> + computed + Pinia. Bad: prop-drilling, event buses",
      angular: "Good: standalone + signals + DI. Bad: leaking subscriptions, NgModules in new code",
      astro: "Good: few small islands. Bad: one giant client:load island",
      tanstack: "Good: loaders + Query cache. Bad: server data in Zustand",
    },
    snippets: [
      {
        framework: "next",
        filename: "good-vs-bad.tsx",
        language: "tsx",
        code: `// ✅ GOOD: fetch on the server, hydrate a small client leaf\nasync function Page() {\n  const users = await getUsers() // server\n  return <UserTable users={users} /> // 'use client' only if interactive\n}\n\n// ❌ BAD: whole tree is client, fetch in effect\n'use client'\nfunction Page() {\n  const [users, setUsers] = useState([])\n  useEffect(() => { getUsers().then(setUsers) }, [])\n}`,
        note: "Push the client boundary down; let the server do the initial fetch.",
      },
      {
        framework: "tanstack",
        filename: "good-vs-bad.tsx",
        language: "tsx",
        code: `// ✅ GOOD: server data lives in TanStack Query\nconst { data } = useQuery({ queryKey: ['users'], queryFn: getUsers })\n\n// ❌ BAD: caching server data by hand in a UI store\nconst users = useZustand((s) => s.users) // stale, no refetch, no dedupe`,
        note: "Don't reimplement caching/invalidation that TanStack Query already gives you.",
      },
    ],
    takeaways: [
      "Keep state as local as possible; promote to a store only when shared.",
      "Separate server state (cache/refetch) from UI state (toggles, inputs).",
      "Every framework punishes God components — compose small pieces.",
    ],
  },
  {
    slug: "tooling",
    title: "Tooling & testing needs",
    summary: "What's built in versus what you install for real apps.",
    explanation:
      "A big practical difference is how much you assemble yourself. Angular is batteries-included: router, forms, HTTP, DI and testing ship together. React-based frameworks are a core plus a curated set of external libraries you choose. Vue sits in between with first-party-but-separate packages (Router, Pinia). Astro brings content tooling but delegates interactivity to your chosen UI framework. Testing is external almost everywhere, converging on Vitest + Testing Library + Playwright.",
    matrix: {
      next: "Core + you pick: state, data, forms, tests (all external)",
      vue: "First-party but separate: Router, Pinia; tests external",
      angular: "Batteries-included: router/forms/http/test built in",
      astro: "Content built in; interactivity + tests external",
      tanstack: "Router+Query first-party; UI state + tests external",
    },
    snippets: [
      {
        framework: "next",
        filename: "example.test.tsx (Vitest + RTL)",
        language: "tsx",
        code: `import { render, screen } from '@testing-library/react'\nimport { Counter } from './counter'\n\ntest('increments', async () => {\n  render(<Counter />)\n  await userEvent.click(screen.getByText('+'))\n  expect(screen.getByText('1')).toBeVisible()\n})`,
        note: "React/Vue/Astro islands all test similarly with Testing Library + Vitest.",
      },
      {
        framework: "angular",
        filename: "counter.spec.ts (built-in TestBed)",
        language: "typescript",
        code: `TestBed.configureTestingModule({ imports: [Counter] });\nconst fixture = TestBed.createComponent(Counter);\nfixture.componentInstance.increment();\nfixture.detectChanges();\nexpect(fixture.nativeElement.textContent).toContain('1');`,
        note: "Angular ships TestBed + a test runner; less to assemble, more framework-specific.",
      },
    ],
    takeaways: [
      "Angular = fewest decisions (most built in). React frameworks = most flexibility.",
      "Global state & data-fetching libs are external for Next/TanStack/Astro.",
      "Testing is external and converging: Vitest + Testing Library + Playwright.",
    ],
  },
];

export const CONCEPT_LIST = CONCEPTS;
export function getConcept(slug: string): Concept | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}
