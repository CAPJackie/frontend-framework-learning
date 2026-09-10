"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/concepts", label: "Concepts" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/demo", label: "Live demo" },
  { href: "/benchmarks", label: "Benchmarks" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3">
        <Link href="/" className="mr-4 font-semibold tracking-tight">
          Frontend<span className="text-muted-foreground">Lab</span>
        </Link>
        <div className="flex flex-wrap gap-1">
          {LINKS.slice(1).map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
