import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { filterTodos, remainingCount, TODO_FILTERS } from "@lab/reference-spec";
import type { TodoFilter } from "@lab/reference-spec";
import { useTodos } from "../stores/todos";

/**
 * The todo UI. Client UI state comes from the Zustand store; the filter is the
 * typed route param. We guard on `mounted` so the localStorage-persisted store
 * doesn't cause an SSR/client hydration mismatch.
 */
export function TodoApp({ filter }: { filter: TodoFilter }) {
  const todos = useTodos((s) => s.todos);
  const add = useTodos((s) => s.add);
  const toggle = useTodos((s) => s.toggle);
  const remove = useTodos((s) => s.remove);
  const edit = useTodos((s) => s.edit);
  const clearCompleted = useTodos((s) => s.clearCompleted);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const visible = filterTodos(todos, filter);

  return (
    <section className="lab-card">
      <h2 style={{ fontSize: "0.9rem", color: "var(--lab-muted)", marginTop: 0 }}>
        Client state · Todo (Zustand, persisted, filtered by typed route)
      </h2>

      <form
        style={{ display: "flex", gap: "0.5rem", margin: "0.75rem 0" }}
        onSubmit={(e) => {
          e.preventDefault();
          add(title);
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
          <Link
            key={f}
            to="/$filter"
            params={{ filter: f }}
            style={{ textTransform: "capitalize" }}
          >
            {f}
          </Link>
        ))}
      </nav>

      {!mounted ? (
        <p style={{ color: "var(--lab-muted)", fontSize: "0.9rem" }}>Loading todos…</p>
      ) : (
        <>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              border: "1px solid var(--lab-border)",
              borderRadius: 8,
            }}
          >
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
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                {editingId === t.id ? (
                  <input
                    className="lab-input"
                    style={{ flex: 1 }}
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => {
                      edit(t.id, draft.trim() || t.title);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        edit(t.id, draft.trim() || t.title);
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
                <button
                  className="lab-btn"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => remove(t.id)}
                >
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
            <button
              className="lab-btn"
              style={{ fontSize: "0.75rem" }}
              onClick={() => clearCompleted()}
            >
              clear completed
            </button>
          </div>
        </>
      )}
    </section>
  );
}
