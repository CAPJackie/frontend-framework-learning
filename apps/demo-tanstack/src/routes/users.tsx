import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { USERS_API_URL } from "@lab/reference-spec";
import type { User } from "@lab/reference-spec";

/**
 * A server function — runs ONLY on the server (like Next's Server Actions). The
 * client calls it with full type safety. Here it fetches the users endpoint.
 */
const getUsers = createServerFn({ method: "GET" }).handler(async (): Promise<User[]> => {
  const res = await fetch(USERS_API_URL);
  return res.json();
});

/**
 * The route loader runs the server function during SSR, so the first paint has
 * data (no client waterfall). We seed TanStack Query with that data via
 * initialData, then Query owns caching/refetching from there.
 */
export const Route = createFileRoute("/users")({
  loader: () => getUsers(),
  component: UsersRoute,
});

function UsersRoute() {
  const initialData = Route.useLoaderData();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    initialData,
  });

  return (
    <section className="lab-card">
      <h2 style={{ marginTop: 0 }}>Users — SSR loader + TanStack Query</h2>
      <p style={{ color: "var(--lab-muted)", fontSize: "0.9rem" }}>
        Fetched on the server via <code>createServerFn</code> in the route loader, then handed to
        TanStack Query (<code>initialData</code>) which manages caching and refetching. This is the
        TanStack take on the same data the Vue/Angular demos fetch in the browser.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--lab-muted)" }}>
            <th style={{ padding: "0.4rem 0" }}>Name</th>
            <th>Username</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderTop: "1px solid var(--lab-border)" }}>
              <td style={{ padding: "0.4rem 0" }}>{u.name}</td>
              <td style={{ color: "var(--lab-muted)" }}>@{u.username}</td>
              <td style={{ color: "var(--lab-muted)" }}>{u.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
