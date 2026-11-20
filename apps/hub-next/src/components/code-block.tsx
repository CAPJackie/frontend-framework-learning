import { FRAMEWORKS, type FrameworkId } from "@lab/ui-tokens";

/**
 * A lightweight, dependency-free code block. We deliberately skip a syntax
 * highlighter to keep the bundle tiny — the value here is the annotated code and
 * the side-by-side comparison, not token coloring.
 */
export function CodeBlock({
  framework,
  filename,
  code,
  note,
}: {
  framework?: FrameworkId;
  filename?: string;
  code: string;
  note?: string;
}) {
  const meta = framework ? FRAMEWORKS[framework] : undefined;
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card">
      {(filename || meta) && (
        <figcaption className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs">
          {meta && (
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: meta.accent }}
              aria-hidden
            />
          )}
          {meta && <span className="font-medium">{meta.name}</span>}
          {filename && <span className="font-mono text-muted-foreground">{filename}</span>}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
      {note && (
        <p className="border-t border-border bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
          {note}
        </p>
      )}
    </figure>
  );
}
