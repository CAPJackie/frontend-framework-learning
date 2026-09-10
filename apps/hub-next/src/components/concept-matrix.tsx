import Link from "next/link";
import { FRAMEWORK_LIST } from "@lab/ui-tokens";
import { CONCEPTS } from "@/lib/content/concepts";

/**
 * The signature cross-framework grid: concepts as rows, frameworks as columns.
 * Renders on the server (pure data → table).
 */
export function ConceptMatrix() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-secondary/50">
            <th className="sticky left-0 z-10 bg-secondary/50 px-4 py-3 text-left font-medium">
              Concept
            </th>
            {FRAMEWORK_LIST.map((f) => (
              <th key={f.id} className="min-w-[180px] px-4 py-3 text-left font-medium">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: f.accent }}
                    aria-hidden
                  />
                  {f.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CONCEPTS.map((c) => (
            <tr key={c.slug} className="border-t border-border align-top">
              <th className="sticky left-0 z-10 bg-background px-4 py-3 text-left font-medium">
                <Link href={`/concepts/${c.slug}`} className="hover:underline">
                  {c.title}
                </Link>
              </th>
              {FRAMEWORK_LIST.map((f) => (
                <td key={f.id} className="px-4 py-3 text-muted-foreground">
                  {c.matrix[f.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
