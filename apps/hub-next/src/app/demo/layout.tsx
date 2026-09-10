import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live demo (Next.js) · Frontend Lab",
  description:
    "The reference feature implemented in Next.js — counter, todo store, filter routes, users fetch.",
};

export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Live demo — Next.js</h1>
        <p className="max-w-3xl text-muted-foreground">
          This is the reference feature built in Next.js (App Router + Zustand). The other four
          frameworks implement the exact same thing — run them from the root{" "}
          <code className="text-foreground">README.md</code> and compare.
        </p>
        <nav className="flex flex-wrap gap-3 pt-1 text-sm">
          <Link href="/demo/all" className="text-muted-foreground hover:text-foreground">
            Todos
          </Link>
          <Link href="/demo/users" className="text-muted-foreground hover:text-foreground">
            Users (SSR fetch)
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
