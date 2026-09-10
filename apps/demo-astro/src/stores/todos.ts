import { persistentAtom } from "@nanostores/persistent";
import { makeTodo, SEED_TODOS, TODO_STORAGE_KEY, type Todo } from "@lab/reference-spec";

/**
 * Astro's cross-island state: nanostores. Astro pages are mostly static HTML, so
 * there's no framework-wide store — nanostores is a tiny shared atom that any
 * island can subscribe to. `persistentAtom` mirrors the localStorage behaviour of
 * the other four demos.
 */
export const $todos = persistentAtom<Todo[]>(TODO_STORAGE_KEY, [...SEED_TODOS], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addTodo(title: string) {
  if (title.trim()) $todos.set([...$todos.get(), makeTodo(title)]);
}
export function toggleTodo(id: string) {
  $todos.set($todos.get().map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
}
export function editTodo(id: string, title: string) {
  $todos.set($todos.get().map((t) => (t.id === id ? { ...t, title } : t)));
}
export function removeTodo(id: string) {
  $todos.set($todos.get().filter((t) => t.id !== id));
}
export function clearCompleted() {
  $todos.set($todos.get().filter((t) => !t.done));
}
