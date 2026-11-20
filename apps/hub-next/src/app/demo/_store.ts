"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { makeTodo, SEED_TODOS, TODO_STORAGE_KEY, type Todo } from "@lab/reference-spec";

/**
 * The Next.js implementation of the shared TodoStoreContract, using Zustand +
 * persist middleware. Compare with:
 *   - demo-vue/src/stores/todos.ts       (Pinia)
 *   - demo-angular/src/app/todos.store.ts (Signals service)
 *   - demo-astro/src/stores/todos.ts     (nanostores)
 *   - demo-tanstack/src/stores/todos.ts  (Zustand — same idea, different app)
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
