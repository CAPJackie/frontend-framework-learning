# Benchmark data — sources & method

The numbers in this project's `/benchmarks` dashboard are a **curated, cited snapshot**,
not a live feed. They are hand-compiled from public sources and rounded to keep the
_trends and relative shape_ honest while staying easy to update. Treat exact values as
approximate; treat the **direction of the curves** as the real lesson.

Data lives in `apps/hub-next/src/lib/content/benchmarks.ts` (typed) and mirrors the intent
of these public sources. Update it there and refresh the citations below.

## Sources

1. **npm downloads over time** — <https://npmtrends.com> and the npm registry API
   (`api.npmjs.org/downloads`). Representative package per framework:
   - Next.js → `next`
   - Vue → `vue`
   - Angular → `@angular/core`
   - Astro → `astro`
   - TanStack → `@tanstack/react-router` (proxy for the TanStack Start ecosystem)

2. **Developer usage & sentiment** — **State of JS** annual survey
   (<https://stateofjs.com>): "would use again" (retention) and awareness/interest.

3. **Broad professional usage** — **Stack Overflow Developer Survey**
   (<https://survey.stackoverflow.co>) "Web frameworks and technologies" section,
   % of professional developers using each.

4. **GitHub stars** — each project's repository star count
   (a popularity/mindshare signal, not a usage number).

## Reading the enterprise angle

No single number proves "enterprise adoption". We triangulate:

- **npm downloads** ≈ how much real project tooling pulls each framework (best usage proxy).
- **Stack Overflow professional usage** ≈ what working developers actually ship with.
- **State of JS retention** ≈ whether people who used it want to keep using it (leading indicator).
- **GitHub stars** ≈ mindshare / interest (lagging, vanity-ish).

Where these agree, the signal is strong. Angular and Next dominate the _enterprise_ usage
proxies; Vue is a strong steady third; Astro and TanStack are fast-growing newer entrants
whose _rate of change_ matters more than absolute size.

_Last curated: 2026-09 (values reflect ~2021–2025 year-end snapshots)._
