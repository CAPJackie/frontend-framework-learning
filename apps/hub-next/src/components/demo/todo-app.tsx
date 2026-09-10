"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { filterTodos, remainingCount, TODO_FILTERS, type TodoFilter } from "@lab/reference-spec";
import { useTodos } from "@/app/demo/_store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Add form — React one-way binding (value + onChange), the contrast to v-model. */
export function AddTodo() {
  const add = useTodos((s) => s.add);
  const [title, setTitle] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        add(title);
        setTitle("");
      }}
      className="flex gap-2"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}

/** Filter tabs, driven by the URL route (/demo/all | active | done). */
export function FilterTabs({ current }: { current: TodoFilter }) {
  return (
    <div className="flex gap-1 rounded-md border border-border p-1">
      {TODO_FILTERS.map((f) => (
        <Link
          key={f}
          href={`/demo/${f}`}
          className={cn(
            "rounded px-3 py-1 text-sm capitalize transition-colors",
            current === f
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {f}
        </Link>
      ))}
    </div>
  );
}

/**
 * The list. Reads the global Zustand store. We guard on `mounted` so the
 * localStorage-persisted state doesn't cause an SSR/client hydration mismatch.
 */
export function TodoList({ filter }: { filter: TodoFilter }) {
  // Select each slice individually — Zustand v5 has no default shallow equality,
  // so returning a fresh object from one selector would loop re-renders.
  const todos = useTodos((s) => s.todos);
  const toggle = useTodos((s) => s.toggle);
  const remove = useTodos((s) => s.remove);
  const edit = useTodos((s) => s.edit);
  const clearCompleted = useTodos((s) => s.clearCompleted);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  if (!mounted) {
    return <p className="py-6 text-sm text-muted-foreground">Loading todos…</p>;
  }

  const visible = filterTodos(todos, filter);

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-border rounded-md border border-border">
        {visible.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-muted-foreground">
            Nothing here.
          </li>
        )}
        {visible.map((t) => (
          <li key={t.id} className="flex items-center gap-3 px-4 py-2.5">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
              className="size-4 accent-foreground"
            />
            {editingId === t.id ? (
              <input
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
                className="flex-1 rounded border border-border bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            ) : (
              <button
                type="button"
                onDoubleClick={() => {
                  setEditingId(t.id);
                  setDraft(t.title);
                }}
                className={cn(
                  "flex-1 text-left text-sm",
                  t.done && "text-muted-foreground line-through",
                )}
                title="Double-click to edit"
              >
                {t.title}
              </button>
            )}
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{remainingCount(todos)} remaining</span>
        <button type="button" onClick={clearCompleted} className="hover:text-foreground">
          clear completed
        </button>
      </div>
    </div>
  );
}
