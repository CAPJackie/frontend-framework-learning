import Link from "next/link";
import { FRAMEWORK_LIST } from "@lab/ui-tokens";
import { CONCEPTS } from "@/lib/content/concepts";
import { ConceptMatrix } from "@/components/concept-matrix";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-5">
        <Badge variant="secondary">Frontend Frameworks Learning Lab · 2026</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Five frameworks, one feature, side by side.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Next.js, Vue, Angular, TanStack Start and Astro — each builds the{" "}
          <em>same</em> counter + todo app, so you can compare how each handles two-way
          binding, state, routing, rendering and tooling. Then read the enterprise
          adoption trends over the last five years.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/concepts">Explore the concepts</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/frameworks">Compare frameworks</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/benchmarks">See the benchmarks</Link>
          </Button>
        </div>
      </section>

      {/* Framework cards */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">The five frameworks</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMEWORK_LIST.map((f) => (
            <Card key={f.id} className="transition-colors hover:border-muted-foreground/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: f.accent }}
                    aria-hidden
                  />
                  {f.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{f.tagline}</p>
                <Link
                  href={`/frameworks/${f.id}`}
                  className="text-sm font-medium hover:underline"
                >
                  Deep dive →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* The matrix */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">The comparison matrix</h2>
          <p className="text-muted-foreground">
            Every core concept, every framework, in one grid. Click a concept for the deep
            dive with runnable code from the demo apps.
          </p>
        </div>
        <ConceptMatrix />
      </section>

      {/* Concept quick links */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">Core concepts</h2>
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
      </section>
    </div>
  );
}
