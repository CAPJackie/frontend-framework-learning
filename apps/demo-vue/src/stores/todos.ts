import { defineStore } from "pinia";
import { makeTodo, SEED_TODOS, TODO_STORAGE_KEY, type Todo } from "@lab/reference-spec";

/**
 * Vue's global store: Pinia. Compare with the Zustand store in hub-next and the
 * Angular signals service — same TodoStoreContract, three idioms.
 *
 * Note how mutating `this.todos` directly is fine — Pinia state is reactive, so
 * the UI updates automatically. That's Vue's reactivity doing the work.
 */
export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [...SEED_TODOS] as Todo[],
  }),
  actions: {
    add(title: string) {
      if (title.trim()) this.todos.push(makeTodo(title));
    },
    toggle(id: string) {
      const t = this.todos.find((t) => t.id === id);
      if (t) t.done = !t.done;
    },
    edit(id: string, title: string) {
      const t = this.todos.find((t) => t.id === id);
      if (t) t.title = title;
    },
    remove(id: string) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    clearCompleted() {
      this.todos = this.todos.filter((t) => !t.done);
    },
  },
  // pinia-plugin-persistedstate mirrors the localStorage behaviour of the others.
  persist: { key: TODO_STORAGE_KEY },
});
