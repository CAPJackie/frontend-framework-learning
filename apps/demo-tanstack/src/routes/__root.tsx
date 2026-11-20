import { useState } from "react";
import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import appCss from "../styles.css?url";
import { Counter } from "../components/Counter";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start demo · Frontend Lab" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  // One QueryClient per render tree (safe for SSR).
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="lab-shell">
            <div className="lab-container">
              <header style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{ color: "var(--fw-tanstack)", fontWeight: 600, letterSpacing: "0.02em" }}
                >
                  TanStack Start demo
                </p>
                <h1 style={{ fontSize: "1.75rem", margin: "0.25rem 0" }}>
                  Counter + Todo (Router + Query)
                </h1>
                <p style={{ color: "var(--lab-muted)" }}>
                  Same reference feature as the other four apps. Notice typed routes, a route loader
                  + <code>createServerFn</code>, and TanStack Query for server state.
                </p>
                <nav className="lab-nav" style={{ marginTop: "0.75rem" }}>
                  <Link to="/$filter" params={{ filter: "all" }}>
                    Todos
                  </Link>
                  <Link to="/users">Users (SSR + Query)</Link>
                </nav>
              </header>

              <section className="lab-card" style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "0.9rem", color: "var(--lab-muted)", marginTop: 0 }}>
                  Local state · Counter
                </h2>
                <Counter />
              </section>

              {children}
            </div>
          </div>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
