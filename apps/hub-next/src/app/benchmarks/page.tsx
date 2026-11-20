import type { Metadata } from "next";
import { FRAMEWORKS } from "@lab/ui-tokens";
import {
  ENTERPRISE_READ,
  GITHUB_STARS_K,
  NPM_DOWNLOADS_M,
  SO_PRO_USAGE_PCT,
  STATE_OF_JS_RETENTION_PCT,
  toChartRows,
} from "@/lib/content/benchmarks";
import { LineTrend, StarsBar } from "@/components/benchmark-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Benchmarks · Frontend Lab",
  description: "Enterprise adoption and usage trends for five frameworks over ~5 years.",
};

const starData = (["next", "vue", "angular", "astro", "tanstack"] as const).map((id) => ({
  name: FRAMEWORKS[id].name,
  stars: GITHUB_STARS_K[id],
  fill: id === "next" ? "#60a5fa" : FRAMEWORKS[id].accent,
}));

export default function BenchmarksPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Adoption &amp; usage benchmarks</h1>
        <p className="max-w-3xl text-muted-foreground">
          A curated, cited snapshot of how these frameworks trended over roughly five years
          (2021–2025). Numbers are rounded from public sources — read the{" "}
          <em>shape of the curves</em>, not the exact values. Provenance lives in{" "}
          <code className="text-foreground">content/benchmarks/sources.md</code>.
        </p>
      </header>

      <ChartCard
        title="npm weekly downloads"
        subtitle="Millions of weekly downloads (representative package per framework). Best proxy for real usage."
      >
        <LineTrend rows={toChartRows(NPM_DOWNLOADS_M)} unit="M" />
      </ChartCard>

      <ChartCard
        title="Professional developer usage"
        subtitle="Stack Overflow Developer Survey — % of professional developers using each framework."
      >
        <LineTrend rows={toChartRows(SO_PRO_USAGE_PCT)} unit="%" />
      </ChartCard>

      <ChartCard
        title="Retention — 'would use again'"
        subtitle="State of JS — of developers who used it, the % who would use it again. A leading indicator of momentum."
      >
        <LineTrend rows={toChartRows(STATE_OF_JS_RETENTION_PCT)} unit="%" />
      </ChartCard>

      <ChartCard
        title="GitHub stars"
        subtitle="Thousands of stars — a mindshare/interest signal (lagging, not a usage number)."
      >
        <StarsBar data={starData} />
      </ChartCard>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">The enterprise read</h2>
        <p className="max-w-3xl text-muted-foreground">
          No single number proves &ldquo;enterprise adoption.&rdquo; Triangulating downloads,
          professional usage, retention and stars gives the honest picture:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {ENTERPRISE_READ.map((r) => (
            <Card key={r.title}>
              <CardHeader>
                <CardTitle className="text-base">{r.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{r.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
        <strong className="text-foreground">How to read it, in one line:</strong> Angular is the
        shrinking incumbent, Next is the high-growth enterprise default for React, Vue is the steady
        beloved third, and Astro + TanStack are the fast-rising newcomers where the slope matters
        more than the current size.
      </section>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="max-w-3xl text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">{children}</div>
    </section>
  );
}
