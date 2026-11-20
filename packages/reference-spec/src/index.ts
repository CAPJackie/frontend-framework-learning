/**
 * @lab/reference-spec
 * ---------------------------------------------------------------------------
 * The single source of truth for the "same feature, five frameworks" idea.
 *
 * Every demo app (Next, Vue, Angular, Astro, TanStack) imports these types and
 * seed data so that the ONLY differences between the apps are how each framework
 * expresses the SAME contract — state, binding, routing and data fetching.
 *
 * If you change the shape of a Todo here, every demo must adapt. That's the point:
 * it keeps the comparison honest.
 */

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
}

/** The three filter states, also used as the /all /active /done route params. */
export type TodoFilter = "all" | "active" | "done";

export const TODO_FILTERS: readonly TodoFilter[] = ["all", "active", "done"] as const;

/** Shape returned by the users API (a subset of jsonplaceholder's payload). */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: { name: string };
}

// ---------------------------------------------------------------------------
// Shared behaviour every store must implement (documented, not enforced)
// ---------------------------------------------------------------------------

/**
 * The global todo store contract. Each framework implements this with its own
 * idiom (Pinia, Angular signals, nanostores, Zustand, React reducer) but the
 * surface is identical so the demos stay comparable.
 */
export interface TodoStoreContract {
  todos: Todo[];
  add(title: string): void;
  toggle(id: string): void;
  edit(id: string, title: string): void;
  remove(id: string): void;
  clearCompleted(): void;
}

// ---------------------------------------------------------------------------
// Constants shared across apps
// ---------------------------------------------------------------------------

/** localStorage key each demo uses so persistence behaves identically. */
export const TODO_STORAGE_KEY = "lab.todos.v1";

/** Public users endpoint used for the SSR-vs-CSR fetch demo. */
export const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

export const SEED_TODOS: Todo[] = [
  { id: "seed-1", title: "Understand two-way binding", done: true, createdAt: 1_700_000_000_000 },
  {
    id: "seed-2",
    title: "Compare local vs global state",
    done: false,
    createdAt: 1_700_000_100_000,
  },
  {
    id: "seed-3",
    title: "See how each framework routes",
    done: false,
    createdAt: 1_700_000_200_000,
  },
];

// ---------------------------------------------------------------------------
// Pure helpers (framework-agnostic) so filtering logic is identical everywhere
// ---------------------------------------------------------------------------

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.done);
    case "done":
      return todos.filter((t) => t.done);
    default:
      return todos;
  }
}

export function makeTodo(title: string): Todo {
  return {
    // crypto.randomUUID is available in every target runtime (Node 20+, modern browsers).
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now() + Math.random()),
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
  };
}

export function remainingCount(todos: Todo[]): number {
  return todos.filter((t) => !t.done).length;
}
