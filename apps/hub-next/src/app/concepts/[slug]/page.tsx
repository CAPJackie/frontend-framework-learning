import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CONCEPTS, getConcept } from "@/lib/content/concepts";
import { FRAMEWORK_LIST } from "@lab/ui-tokens";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

// Pre-render every concept at build time (SSG).
export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/concepts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  return {
    title: concept ? `${concept.title} · Frontend Lab` : "Concept · Frontend Lab",
    description: concept?.summary,
  };
}

export default async function ConceptPage({ params }: PageProps<"/concepts/[slug]">) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <Link href="/concepts" className="text-sm text-muted-foreground hover:underline">
          ← All concepts
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{concept.title}</h1>
        <p className="text-lg text-muted-foreground">{concept.summary}</p>
      </header>

      <p className="max-w-3xl leading-relaxed">{concept.explanation}</p>

      {/* Per-framework one-liner grid */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">At a glance</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FRAMEWORK_LIST.map((f) => (
            <div key={f.id} className="rounded-lg border border-border p-4">
              <div className="mb-1 flex items-center gap-2 font-medium">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: f.accent }}
                  aria-hidden
                />
                {f.name}
              </div>
              <p className="text-sm text-muted-foreground">{concept.matrix[f.id]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code snippets */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">In code</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {concept.snippets.map((s, i) => (
            <CodeBlock
              key={i}
              framework={s.framework}
              filename={s.filename}
              code={s.code}
              note={s.note}
            />
          ))}
        </div>
      </section>

      {/* Takeaways */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Takeaways</h2>
        <ul className="space-y-2">
          {concept.takeaways.map((t, i) => (
            <li key={i} className="flex gap-2">
              <Badge variant="outline" className="mt-0.5 shrink-0">
                {i + 1}
              </Badge>
              <span className="text-muted-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prev/next */}
      <nav className="flex flex-wrap gap-3 border-t border-border pt-6">
        {CONCEPTS.filter((c) => c.slug !== concept.slug).map((c) => (
          <Link
            key={c.slug}
            href={`/concepts/${c.slug}`}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            {c.title}
          </Link>
        ))}
      </nav>
    </article>
  );
}
