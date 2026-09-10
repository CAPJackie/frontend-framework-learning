import type { FrameworkId } from "@lab/ui-tokens";

/**
 * Curated benchmark dataset (see /content/benchmarks/sources.md for provenance).
 *
 * These are ROUNDED, hand-compiled snapshots from public sources (npmtrends,
 * State of JS, Stack Overflow survey, GitHub). They are meant to convey the
 * SHAPE of adoption over ~5 years, not exact figures. Update alongside sources.md.
 */

export const BENCHMARK_YEARS = [2021, 2022, 2023, 2024, 2025] as const;
export type BenchmarkYear = (typeof BENCHMARK_YEARS)[number];

/** npm weekly downloads at each year-end, in MILLIONS (representative package). */
export const NPM_DOWNLOADS_M: Record<FrameworkId, Record<BenchmarkYear, number>> = {
  next: { 2021: 2.6, 2022: 4.1, 2023: 5.6, 2024: 7.1, 2025: 8.7 },
  vue: { 2021: 3.0, 2022: 3.5, 2023: 4.1, 2024: 4.8, 2025: 5.6 },
  angular: { 2021: 2.5, 2022: 2.8, 2023: 3.0, 2024: 3.3, 2025: 3.6 },
  astro: { 2021: 0.02, 2022: 0.15, 2023: 0.42, 2024: 0.82, 2025: 1.25 },
  tanstack: { 2021: 0.05, 2022: 0.22, 2023: 0.55, 2024: 1.05, 2025: 1.85 },
};

/** Stack Overflow survey: % of PROFESSIONAL developers using the framework. */
export const SO_PRO_USAGE_PCT: Record<FrameworkId, Record<BenchmarkYear, number>> = {
  // Next.js reported within React ecosystem; these are Next-specific survey lines.
  next: { 2021: 11, 2022: 13, 2023: 16, 2024: 18, 2025: 20 },
  vue: { 2021: 19, 2022: 19, 2023: 17, 2024: 16, 2025: 16 },
  angular: { 2021: 26, 2022: 23, 2023: 20, 2024: 18, 2025: 17 },
  astro: { 2021: 0, 2022: 1, 2023: 3, 2024: 5, 2025: 7 },
  tanstack: { 2021: 0, 2022: 0, 2023: 1, 2024: 2, 2025: 4 },
};

/** State of JS "would use again" (retention) %, latest available per year. */
export const STATE_OF_JS_RETENTION_PCT: Record<FrameworkId, Record<BenchmarkYear, number>> = {
  next: { 2021: 90, 2022: 89, 2023: 88, 2024: 68, 2025: 70 },
  vue: { 2021: 84, 2022: 86, 2023: 87, 2024: 88, 2025: 88 },
  angular: { 2021: 45, 2022: 44, 2023: 48, 2024: 55, 2025: 58 },
  astro: { 2021: 0, 2022: 93, 2023: 94, 2024: 92, 2025: 91 },
  tanstack: { 2021: 0, 2022: 0, 2023: 89, 2024: 90, 2025: 90 },
};

/** GitHub stars in THOUSANDS (mindshare snapshot, ~2025). */
export const GITHUB_STARS_K: Record<FrameworkId, number> = {
  next: 132,
  vue: 208, // vuejs/core + vuejs/vue combined legacy mindshare
  angular: 98,
  astro: 50,
  tanstack: 9, // @tanstack/router repo (Start is newer)
};

export interface BenchmarkRow {
  year: BenchmarkYear;
  next: number;
  vue: number;
  angular: number;
  astro: number;
  tanstack: number;
}

/** Reshape a per-framework/per-year map into Recharts-friendly rows. */
export function toChartRows(
  source: Record<FrameworkId, Record<BenchmarkYear, number>>,
): BenchmarkRow[] {
  return BENCHMARK_YEARS.map((year) => ({
    year,
    next: source.next[year],
    vue: source.vue[year],
    angular: source.angular[year],
    astro: source.astro[year],
    tanstack: source.tanstack[year],
  }));
}

/** Written interpretation shown under the charts. */
export const ENTERPRISE_READ = [
  {
    title: "Angular: the shrinking incumbent",
    body: "Angular still has the largest install base in many large enterprises, but its Stack Overflow professional usage has slid from ~26% (2021) to ~17% (2025). Its retention is recovering thanks to signals + standalone components. Verdict: safe, structured, no longer the growth story.",
  },
  {
    title: "Next.js: the enterprise default for React",
    body: "Next's npm downloads and professional usage climb every year — it's become the default way enterprises ship React. The 2024 retention dip reflects developer friction with the App Router/RSC shift, not adoption slowing. Verdict: the safest high-growth bet.",
  },
  {
    title: "Vue: steady, beloved, quietly enterprise",
    body: "Vue's numbers are remarkably flat-but-high with top-tier retention. It's huge in Asia and in companies that value approachability. Verdict: a stable, low-risk third that people who adopt it keep.",
  },
  {
    title: "Astro: the fastest-rising newcomer",
    body: "From ~0 in 2021 to well over a million weekly downloads, Astro owns the content/marketing/docs niche and posts elite retention. Enterprises adopt it alongside a main app, not as a replacement. Verdict: rising fast in its lane.",
  },
  {
    title: "TanStack: small but sticky",
    body: "TanStack Query is already everywhere; TanStack Start is new and small in absolute terms but has excellent retention among those who try it. Verdict: watch the slope, not the size — highest-risk, highest type-safety.",
  },
];
