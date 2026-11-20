import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FRAMEWORK_DOCS, FRAMEWORK_DOC_LIST } from "@/lib/content/frameworks";
import { FRAMEWORKS, type FrameworkId } from "@lab/ui-tokens";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function generateStaticParams() {
  return FRAMEWORK_DOC_LIST.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/frameworks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = FRAMEWORK_DOCS[slug as FrameworkId];
  return {
    title: doc ? `${doc.name} · Frontend Lab` : "Framework · Frontend Lab",
    description: doc?.philosophy?.slice(0, 150),
  };
}

const RENDER_KEYS = [
  ["csr", "CSR"],
  ["ssr", "SSR"],
  ["ssg", "SSG"],
  ["isr", "ISR"],
  ["streaming", "Streaming"],
  ["islands", "Islands"],
] as const;

export default async function FrameworkPage({ params }: PageProps<"/frameworks/[slug]">) {
  const { slug } = await params;
  const doc = FRAMEWORK_DOCS[slug as FrameworkId];
  if (!doc) notFound();
  const accent = FRAMEWORKS[doc.id].accent;

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <Link href="/frameworks" className="text-sm text-muted-foreground hover:underline">
          ← All frameworks
        </Link>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <span
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
          {doc.name}
        </h1>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded border border-border px-2 py-0.5">{doc.language}</span>
          <span className="rounded border border-border px-2 py-0.5">by {doc.maintainer}</span>
          <span className="rounded border border-border px-2 py-0.5">
            since {doc.firstReleased}
          </span>
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Philosophy</h2>
        <p className="max-w-3xl leading-relaxed">{doc.philosophy}</p>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Mental model:</strong> {doc.mentalModel}
        </p>
      </section>

      {/* Rendering support */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Rendering support</h2>
        <div className="flex flex-wrap gap-2">
          {RENDER_KEYS.map(([key, label]) => {
            const on = doc.rendering[key];
            return (
              <span
                key={key}
                className={
                  "rounded-md border px-3 py-1 text-sm " +
                  (on
                    ? "border-border bg-secondary text-secondary-foreground"
                    : "border-dashed border-border text-muted-foreground line-through")
                }
              >
                {label}
              </span>
            );
          })}
        </div>
        <p className="max-w-3xl text-sm text-muted-foreground">{doc.rendering.note}</p>
      </section>

      {/* Core concepts */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Info title="Routing" body={doc.router} />
        <Info title="State management" body={doc.stateBuiltIn} />
        <Info title="Two-way binding" body={doc.twoWayBinding} />
        <Info title="Run the demo" body={`Command: ${doc.devCommand}`} link={doc.demoPath} />
      </section>

      {/* Tooling */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">External tooling usually reached for</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Need</TableHead>
              <TableHead>Common solution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doc.tooling.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{t.need}</TableCell>
                <TableCell className="text-muted-foreground">{t.solution}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Practices */}
      <section className="grid gap-6 sm:grid-cols-2">
        <PracticeList title="Good practices" tone="good" items={doc.goodPractices} />
        <PracticeList title="Anti-patterns" tone="bad" items={doc.badPractices} />
      </section>

      {/* When */}
      <section className="grid gap-6 sm:grid-cols-2">
        <PracticeList title="Reach for it when…" tone="good" items={doc.whenToUse} />
        <PracticeList title="Look elsewhere when…" tone="bad" items={doc.whenToAvoid} />
      </section>

      <nav className="flex flex-wrap gap-3 border-t border-border pt-6">
        {FRAMEWORK_DOC_LIST.filter((f) => f.slug !== doc.slug).map((f) => (
          <Link
            key={f.slug}
            href={`/frameworks/${f.slug}`}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            {f.name}
          </Link>
        ))}
      </nav>
    </article>
  );
}

function Info({ title, body, link }: { title: string; body: string; link?: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
      {link && (
        <p className="mt-2 text-sm">
          {link.startsWith("http") ? (
            <a href={link} className="font-medium hover:underline" target="_blank" rel="noreferrer">
              Open demo ({link}) ↗
            </a>
          ) : (
            <Link href={link} className="font-medium hover:underline">
              Open demo ({link}) →
            </Link>
          )}
        </p>
      )}
    </div>
  );
}

function PracticeList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "bad";
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span aria-hidden className={tone === "good" ? "text-emerald-500" : "text-destructive"}>
              {tone === "good" ? "✓" : "✕"}
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
