import { create } from "zustand";
import { persist } from "zustand/middleware";
import { makeTodo, SEED_TODOS, TODO_STORAGE_KEY } from "@lab/reference-spec";
import type { Todo } from "@lab/reference-spec";

/**
 * TanStack's stack separates concerns: server state lives in TanStack Query (see
 * the /users route), while UI/client state uses a small store — here Zustand,
 * the same idea as the Next hub. Implements the shared TodoStoreContract.
 */
interface TodoState {
  todos: Todo[];
  add: (title: string) => void;
  toggle: (id: string) => void;
  edit: (id: string, title: string) => void;
  remove: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodos = create<TodoState>()(
  persist(
    (set) => ({
      todos: SEED_TODOS,
      add: (title) => set((s) => (title.trim() ? { todos: [...s.todos, makeTodo(title)] } : s)),
      toggle: (id) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      edit: (id, title) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, title } : t)),
        })),
      remove: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
      clearCompleted: () => set((s) => ({ todos: s.todos.filter((t) => !t.done) })),
    }),
    { name: TODO_STORAGE_KEY },
  ),
);
