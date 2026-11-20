import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirect the index to the default filter view. beforeLoad runs before render,
// so this happens on the server during SSR — no flash of the wrong page.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$filter", params: { filter: "all" } });
  },
});
