import { useState } from "react";
import { useStore } from "@nanostores/react";
import {
  filterTodos,
  remainingCount,
  TODO_FILTERS,
  type TodoFilter,
} from "@lab/reference-spec";
import {
  $todos,
  addTodo,
  clearCompleted,
  editTodo,
  removeTodo,
  toggleTodo,
} from "../stores/todos";

/**
 * The interactive todo island. Reads the shared nanostore via useStore(). Because
 * the store is a standalone atom (not tied to any framework), a Vue or Svelte
 * island could share the exact same state.
 *
 * `filter` is passed in from the .astro page (the route), so filtering is driven
 * by the URL — same behaviour as the other demos.
 */
export default function TodoApp({ filter }: { filter: TodoFilter }) {
  const todos = useStore($todos);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const visible = filterTodos(todos, filter);

  return (
    <section className="lab-card">
      <h2 style={{ fontSize: "0.9rem", color: "var(--lab-muted)", marginTop: 0 }}>
        Global state · Todo (nanostores, persisted, filtered by route)
      </h2>

      <form
        style={{ display: "flex", gap: "0.5rem", margin: "0.75rem 0" }}
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(title);
          setTitle("");
        }}
      >
        <input
          className="lab-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
        />
        <button className="lab-btn" type="submit">
          Add
        </button>
      </form>

      <nav className="lab-nav" style={{ marginBottom: "0.75rem" }}>
        {TODO_FILTERS.map((f) => (
          <a key={f} href={`/${f}`} style={{ textTransform: "capitalize" }} className={f === filter ? "active" : ""}>
            {f}
          </a>
        ))}
      </nav>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, border: "1px solid var(--lab-border)", borderRadius: 8 }}>
        {visible.length === 0 && (
          <li style={{ padding: "1.25rem", textAlign: "center", color: "var(--lab-muted)" }}>
            Nothing here.
          </li>
        )}
        {visible.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.5rem 0.75rem",
              borderTop: "1px solid var(--lab-border)",
            }}
          >
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            {editingId === t.id ? (
              <input
                className="lab-input"
                style={{ flex: 1 }}
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={() => {
                  editTodo(t.id, draft.trim() || t.title);
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editTodo(t.id, draft.trim() || t.title);
                    setEditingId(null);
                  }
                }}
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  cursor: "pointer",
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? "var(--lab-muted)" : "inherit",
                }}
                onDoubleClick={() => {
                  setEditingId(t.id);
                  setDraft(t.title);
                }}
              >
                {t.title}
              </span>
            )}
            <button className="lab-btn" style={{ fontSize: "0.75rem" }} onClick={() => removeTodo(t.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.6rem",
          fontSize: "0.75rem",
          color: "var(--lab-muted)",
        }}
      >
        <span>{remainingCount(todos)} remaining</span>
        <button className="lab-btn" style={{ fontSize: "0.75rem" }} onClick={() => clearCompleted()}>
          clear completed
        </button>
      </div>
    </section>
  );
}
