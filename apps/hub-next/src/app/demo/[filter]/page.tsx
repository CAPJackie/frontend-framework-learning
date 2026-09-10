import { notFound } from "next/navigation";
import { TODO_FILTERS, type TodoFilter } from "@lab/reference-spec";
import { Counter } from "@/components/demo/counter";
import { AddTodo, FilterTabs, TodoList } from "@/components/demo/todo-app";

// Pre-render /demo/all, /demo/active, /demo/done at build.
export function generateStaticParams() {
  return TODO_FILTERS.map((filter) => ({ filter }));
}

export default async function DemoFilterPage({ params }: PageProps<"/demo/[filter]">) {
  const { filter } = await params;
  if (!TODO_FILTERS.includes(filter as TodoFilter)) notFound();
  const current = filter as TodoFilter;

  return (
    <div className="space-y-8">
      <section className="space-y-3 rounded-lg border border-border p-4">
        <h2 className="text-sm font-medium text-muted-foreground">Local state · Counter</h2>
        <Counter />
      </section>

      <section className="space-y-4 rounded-lg border border-border p-4">
        <h2 className="text-sm font-medium text-muted-foreground">
          Global state · Todo (persisted to localStorage, filtered by route)
        </h2>
        <AddTodo />
        <FilterTabs current={current} />
        <TodoList filter={current} />
      </section>
    </div>
  );
}
