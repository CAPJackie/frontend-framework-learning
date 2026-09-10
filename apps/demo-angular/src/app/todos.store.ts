import { Injectable, computed, effect, signal } from '@angular/core';
import {
  filterTodos,
  makeTodo,
  remainingCount,
  SEED_TODOS,
  TODO_STORAGE_KEY,
  type Todo,
  type TodoFilter,
} from '@lab/reference-spec';

/**
 * Angular's global store: a DI-provided service holding Signals.
 * `providedIn: 'root'` makes it an app-wide singleton — inject it anywhere.
 *
 * Compare with Pinia (Vue), Zustand (Next/TanStack) and nanostores (Astro):
 * same TodoStoreContract, expressed with Angular signals + dependency injection.
 */
@Injectable({ providedIn: 'root' })
export class TodosStore {
  private readonly _todos = signal<Todo[]>(this.load());

  /** Read-only view for components. */
  readonly todos = this._todos.asReadonly();
  readonly remaining = computed(() => remainingCount(this._todos()));

  constructor() {
    // Persist to localStorage whenever todos change (mirrors the other demos).
    effect(() => {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(this._todos()));
    });
  }

  /** A computed factory so a component can filter by its route param. */
  visible(filter: () => TodoFilter) {
    return computed(() => filterTodos(this._todos(), filter()));
  }

  add(title: string) {
    if (title.trim()) this._todos.update((list) => [...list, makeTodo(title)]);
  }
  toggle(id: string) {
    this._todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
  edit(id: string, title: string) {
    this._todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, title } : t)),
    );
  }
  remove(id: string) {
    this._todos.update((list) => list.filter((t) => t.id !== id));
  }
  clearCompleted() {
    this._todos.update((list) => list.filter((t) => !t.done));
  }

  private load(): Todo[] {
    try {
      const raw = localStorage.getItem(TODO_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [...SEED_TODOS];
    } catch {
      return [...SEED_TODOS];
    }
  }
}
