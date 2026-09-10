import { redirect } from "next/navigation";

// /demo → default to the "all" filter view.
export default function DemoIndex() {
  redirect("/demo/all");
}
