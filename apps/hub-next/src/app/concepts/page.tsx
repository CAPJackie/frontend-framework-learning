import Link from "next/link";
import type { Metadata } from "next";
import { CONCEPTS } from "@/lib/content/concepts";
import { ConceptMatrix } from "@/components/concept-matrix";

export const metadata: Metadata = {
  title: "Core concepts · Frontend Lab",
  description: "How each framework handles binding, state, routing, rendering and more.",
};

export default function ConceptsIndex() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Core concepts</h1>
        <p className="text-muted-foreground">
          Pick a concept to see a side-by-side explanation with real code from the demo apps.
        </p>
      </header>

      <ConceptMatrix />

      <div className="grid gap-3 sm:grid-cols-2">
        {CONCEPTS.map((c) => (
          <Link
            key={c.slug}
            href={`/concepts/${c.slug}`}
            className="rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/40"
          >
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-muted-foreground">{c.summary}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
