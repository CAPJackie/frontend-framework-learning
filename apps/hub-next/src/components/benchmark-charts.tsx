"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FRAMEWORKS } from "@lab/ui-tokens";
import type { BenchmarkRow } from "@/lib/content/benchmarks";

const SERIES = [
  { key: "next", name: "Next.js", color: "#60a5fa" }, // black reads badly on dark bg → use a visible blue
  { key: "vue", name: "Vue", color: FRAMEWORKS.vue.accent },
  { key: "angular", name: "Angular", color: FRAMEWORKS.angular.accent },
  { key: "astro", name: "Astro", color: FRAMEWORKS.astro.accent },
  { key: "tanstack", name: "TanStack", color: FRAMEWORKS.tanstack.accent },
] as const;

const axisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

function tooltipStyle() {
  return {
    contentStyle: {
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      color: "var(--popover-foreground)",
      fontSize: 12,
    },
    labelStyle: { color: "var(--popover-foreground)" },
  };
}

export function LineTrend({
  rows,
  unit,
}: {
  rows: BenchmarkRow[];
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" {...axisProps} />
        <YAxis {...axisProps} unit={unit} />
        <Tooltip {...tooltipStyle()} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {SERIES.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function StarsBar({
  data,
}: {
  data: { name: string; stars: number; fill: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" {...axisProps} />
        <YAxis {...axisProps} unit="k" />
        <Tooltip {...tooltipStyle()} cursor={{ fill: "var(--secondary)", opacity: 0.4 }} />
        <Bar dataKey="stars" name="GitHub stars (k)" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
