import Link from "next/link";
import type { Metadata } from "next";
import { FRAMEWORK_DOC_LIST } from "@/lib/content/frameworks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FRAMEWORKS } from "@lab/ui-tokens";

export const metadata: Metadata = {
  title: "Frameworks · Frontend Lab",
  description: "Deep dives on Next.js, Vue, Angular, Astro and TanStack Start.",
};

export default function FrameworksIndex() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Frameworks</h1>
        <p className="text-muted-foreground">
          Philosophy, rendering support, routing, state, tooling and when to use each.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {FRAMEWORK_DOC_LIST.map((f) => {
          const accent = FRAMEWORKS[f.id].accent;
          return (
            <Card key={f.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  />
                  {f.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{f.philosophy.slice(0, 160)}…</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded border border-border px-2 py-0.5">
                    {f.maintainer}
                  </span>
                  <span className="rounded border border-border px-2 py-0.5">
                    since {f.firstReleased}
                  </span>
                </div>
                <Link
                  href={`/frameworks/${f.slug}`}
                  className="inline-block text-sm font-medium hover:underline"
                >
                  Read the deep dive →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
